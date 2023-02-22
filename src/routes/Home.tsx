import { useEffect, useRef, useState } from "react";
import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import {
  useConnect,
  // useGetChannel,
  useGetChannels,
  useMarkRead,
  // useGetFriendships,
  useSubscribe,
  nc,
} from "../api";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { IChannel } from "../lib/interfaces/IChannel";
import { useQueryClient } from "@tanstack/react-query";

function Home() {
  // current channel
  const [channel, setChannel] = useState<any>(null);
  // subscribe when channel is selected
  const { data: subscription } = useSubscribe(!!channel, channel?.id);
  // 1. connect
  const { data: user, isLoading: isConnecting } = useConnect();
  const userId = user?.id;
  // 2. getChannels after connect
  const { data: channels, isLoading: isGettingChannels } = useGetChannels(
    !!userId
  );
  // 2. getFriendships after connect
  // const { data: friendships, isLoading: isGettingFriendships } =
  //   useGetFriendships(!!userId);

  const [messages, setMessages] = useState<any>([]);
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const hasMore = useRef(false);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [replyParentMessage, setReplyParentMessage] = useState<any>(null);
  const lastMessageRef = useRef(messages[messages.length - 1]);
  const queryClient = useQueryClient();
  const { mutate: markRead } = useMarkRead(
    channel?.id,
    lastMessageRef.current?.node.message_id,
    "guest",
    lastMessageRef.current?.node.sort_id
  );

  // getMessages: using state instead of react query for educational purpose
  const getMessages = async () => {
    setIsGettingMessages(true);
    try {
      const filter = { channel_id: channel.id };
      const sort = { sort_id: -1 };
      const option = { offset: messages.length, per_page: 25 };
      const response = await nc.getMessages(filter, sort, option);
      const newMessages = messages.concat(response.edges);
      setMessages(newMessages);
      hasMore.current =
        messages.length + response.edges.length < response.totalCount;
    } catch (error) {
      console.log(error);
    }
    setIsGettingMessages(false);
  };

  // message received
  nc.bind("onMessageReceived", (channelId: string, message: any) => {
    if (channel.id === channelId) {
      setArrivalMessage({ node: message });
    }
    console.log(channelId, message);
  });

  // message deleted
  nc.bind("onMessageDeleted", (channelId: string, data: any) => {
    if (channel.id === channelId) {
      // delete message
      const newMessages = messages.filter(
        (item: any) => item.node.message_id !== data.message_id
      );
      setMessages(newMessages);
    }
  });

  // receive message
  useEffect(() => {
    setMessages((prev: any) => [arrivalMessage, ...prev]);
  }, [arrivalMessage]);

  // clear messages when channel changed (and after subscribed)
  useEffect(() => {
    setMessages([]);
    hasMore.current = false;
  }, [subscription]);

  // getMessages if messages are cleared (channel changed)
  useEffect(() => {
    if (messages.length === 0 && subscription) {
      getMessages();
    }
    // keep track of the last message
    if (messages.length > 0 && messages[0]) {
      lastMessageRef.current = messages[0];
      markRead();
      // queryClient.invalidateQueries(["countUnread"]);
    }
  }, [messages]);

  // left side bar drawers
  const {
    isOpen: isLeftSideBarOpen,
    onOpen: onLeftSideBarOpen,
    onClose: onLeftSideBarClose,
  } = useDisclosure();

  // rigth side bar chat detail drawers
  const {
    isOpen: isChatDetailOpen,
    onOpen: onChatDetailOpen,
    onClose: onChatDetailClose,
  } = useDisclosure();

  return (
    <HStack w="full" h="-webkit-calc(100vh - 65px)" bg={"grey.100"} spacing={0}>
      <Flex
        as={"aside"}
        w={"full"}
        h={"full"}
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: !channel ? "flex" : "none", lg: "flex" }}
        borderRightWidth={1}
      >
        <LeftSideBar
          isConnecting={isConnecting}
          user={user}
          // isGettingFriendships={isGettingFriendships}
          isGettingChannels={isGettingChannels}
          // friendships={friendships}
          channels={channels}
          setChannel={setChannel}
          subscription={subscription}
        />
      </Flex>
      <Flex as="main" h={"full"} flex={1} borderRightWidth={1}>
        {channel && (
          <Chat
            onLeftSideBarOpen={onLeftSideBarOpen}
            onChatDetailOpen={onChatDetailOpen}
            channel={channel}
            subscription={subscription}
          />
        )}
        {/* <Chat
          onLeftSideBarOpen={onLeftSideBarOpen}
          onChatDetailOpen={onChatDetailOpen}
          channel={channel}
          subscription={subscription}
        /> */}
      </Flex>
      {channel && (
        <Flex
          as="aside"
          h="full"
          w="full"
          maxW={{ base: "xs", xl: "sm" }}
          display={{ base: "none", lg: "flex" }}
        >
          <ChatDetail channel={channel} subscription={subscription} />
        </Flex>
      )}
      <LeftSideBarDrawer
        isOpen={isLeftSideBarOpen}
        onClose={onLeftSideBarClose}
        isConnecting={isConnecting}
        user={user}
        // isGettingFriendships={isGettingFriendships}
        isGettingChannels={isGettingChannels}
        // friendships={friendships}
        channels={channels}
        setChannel={setChannel}
        subscription={subscription}
      />
      <ChatDetailDrawer
        isOpen={isChatDetailOpen}
        onClose={onChatDetailClose}
        channel={channel}
        subscription={subscription}
      />
    </HStack>
  );
}

export default Home;

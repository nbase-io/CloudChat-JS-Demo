import { useState, useEffect } from "react";
import {
  Flex,
  HStack,
  useDisclosure,
  useToast,
  Text,
  Center,
} from "@chakra-ui/react";
import {
  useConnect,
  // useGetChannel,
  useGetChannels,
  // useGetFriendships,
  useGetMessages,
} from "../api";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { IChannel } from "../lib/interfaces/IChannel";

function Home() {
  const toast = useToast();
  // current channel
  const [channel, setChannel] = useState<IChannel | null>(null);
  // 1. connect
  const { data: user, isLoading: isConnecting } = useConnect();
  const userId = user?.id;
  // 2. getFriendships after connect
  // const { data: friendships, isLoading: isGettingFriendships } =
  //   useGetFriendships(!!userId);
  // 2. getChannels after connect
  const { data: channels, isLoading: isGettingChannels } = useGetChannels(
    !!userId
  );
  // 3. getMessages after current channel is set
  const {
    data: messages,
    isFetching: isGettingMessages,
    refetch: reGetMessages,
    error: getMessagesError,
  } = useGetMessages(!!channel, channel?.id);
  // 3. getChannel after current channel is set
  // const { data: channelDetail, isLoading: isGettingChannelDetail } =
  //   useGetChannel(!!channel, channel?.id);

  // default channel is the 1st channel
  // useEffect(() => {
  //   if (!isGettingChannels && channels) {
  //     setChannel(channels[0]);
  //   }
  // }, [isGettingChannels]);

  // once current channel is set, fetch messages
  useEffect(() => {
    if (channel) {
      reGetMessages();
    }
  }, [channel]);

  // error handlings
  useEffect(() => {
    console.log(getMessagesError);
  }, [getMessagesError]);

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
    <HStack w="full" h="-webkit-calc(100vh - 81px)" bg={"grey.100"} spacing={0}>
      <Flex
        as={"aside"}
        w={"full"}
        h={"full"}
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
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
        />
      </Flex>
      <Flex as="main" h={"full"} flex={1} borderRightWidth={1}>
        {channel ? (
          <Chat
            onLeftSideBarOpen={onLeftSideBarOpen}
            onChatDetailOpen={onChatDetailOpen}
            channel={channel}
            isGettingMessages={isGettingMessages}
            messages={messages}
          />
        ) : (
          <Center w="full">
            <Text as="b">👈 Please select a channel</Text>
          </Center>
        )}
      </Flex>
      <Flex
        as="aside"
        h="full"
        w="full"
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
      >
        <ChatDetail channel={channel} />
      </Flex>
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
      />
      <ChatDetailDrawer
        isOpen={isChatDetailOpen}
        onClose={onChatDetailClose}
        channel={channel}
      />
    </HStack>
  );
}

export default Home;

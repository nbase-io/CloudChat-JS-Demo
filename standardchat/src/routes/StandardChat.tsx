import { useEffect, useState } from "react";
import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { useGetChannels, useMarkRead, useSubscribe, nc } from "../api";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { useGlobal } from "../components/Root";

function StandardChat() {
  const { user, setIsLoading } = useGlobal();
  // 2. getChannels after connect
  const {
    data: channels,
    isLoading: isGettingChannels,
    status: getChannelsStatus,
  } = useGetChannels(!!user?.id);
  // 2. getFriendships after connect
  // const { data: friendships, isLoading: isGettingFriendships } =
  //   useGetFriendships(!!user?.id);
  // current channel
  const [channel, setChannel] = useState<any>(null);
  // subscribe when channel is selected
  const { data: subscription, error: subscribeError } = useSubscribe(
    !!channel,
    channel?.id
  );

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

  useEffect(() => {
    if (getChannelsStatus === "error" || getChannelsStatus === "success") {
      setIsLoading(false);
    }
  }, [getChannelsStatus]);

  // private channel subscribe error
  useEffect(() => {
    if (subscribeError) {
      setChannel(null);
    }
  }, [subscribeError]);

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
            setChannel={setChannel}
            subscription={subscription}
          />
        )}
      </Flex>
      {channel && (
        <Flex
          as="aside"
          h="full"
          w="full"
          maxW={{ base: "xs", xl: "sm" }}
          display={{ base: "none", lg: "flex" }}
        >
          <ChatDetail
            channel={channel}
            subscription={subscription}
            setChannel={setChannel}
            isChatDetailDrawerOpen={isChatDetailOpen}
          />
        </Flex>
      )}
      <LeftSideBarDrawer
        isOpen={isLeftSideBarOpen}
        onClose={onLeftSideBarClose}
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
        setChannel={setChannel}
      />
    </HStack>
  );
}

export default StandardChat;

import { useState } from "react";
import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { useGetChannels, useMarkRead, useSubscribe, nc } from "../api";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { useUser } from "../components/Root";

function StandardChat() {
  const { user } = useUser();
  const userId = user?.id;
  // 2. getChannels after connect
  const { data: channels, isLoading: isGettingChannels } = useGetChannels(
    !!userId
  );
  // 2. getFriendships after connect
  // const { data: friendships, isLoading: isGettingFriendships } =
  //   useGetFriendships(!!userId);
  // current channel
  const [channel, setChannel] = useState<any>(null);
  // subscribe when channel is selected
  const { data: subscription } = useSubscribe(!!channel, channel?.id);

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

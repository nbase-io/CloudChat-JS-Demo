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
import Chat from "../components/StandardChat/Chat/Chat";
import ChatDetail from "../components/StandardChat/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/StandardChat/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/StandardChat/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/StandardChat/LeftSideBar/LeftSideBarDrawer";
import { IChannel } from "../lib/interfaces/IChannel";
import { useQueryClient } from "@tanstack/react-query";

function StandardChat() {
  // current channel
  const [channel, setChannel] = useState<any>(null);
  // subscribe when channel is selected
  const { data: subscription } = useSubscribe(!!channel, channel?.id);
  // 1. connect
  const { data: user, isLoading: isConnecting } = useConnect(
    false,
    "Guest",
    "guest",
    ""
  );
  const userId = user?.id;
  // 2. getChannels after connect
  const { data: channels, isLoading: isGettingChannels } = useGetChannels(
    !!userId
  );
  // 2. getFriendships after connect
  // const { data: friendships, isLoading: isGettingFriendships } =
  //   useGetFriendships(!!userId);

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
            setChannel={setChannel}
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

export default StandardChat;

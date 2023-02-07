import { useState, useEffect } from "react";
import { Center, Flex, HStack, Spinner, useDisclosure } from "@chakra-ui/react";
import { useConnect, useGetChannels, useGetFriendships } from "../api";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { IChannel } from "../lib/interfaces/IChannel";
import { useIsFetching } from "@tanstack/react-query";

function Home() {
  const isFetching = useIsFetching();
  // connect
  const { data: user, isLoading: isConnecting } = useConnect();
  const userId = user?.id;
  // getFriendships after connect
  const { data: friendships, isLoading: isGettingFriendships } =
    useGetFriendships(!!userId);
  // getChannels after connect
  const { data: channels, isLoading: isGettingChannels } = useGetChannels(
    !!userId
  );
  const [channel, setChannel] = useState<IChannel | null>(null);

  useEffect(() => {
    if (!isGettingChannels && channels) {
      setChannel(channels[0]);
    }
  }, [isGettingChannels]);

  // drawers
  const {
    isOpen: isLeftSideBarOpen,
    onOpen: onLeftSideBarOpen,
    onClose: onLeftSideBarClose,
  } = useDisclosure();

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
          isGettingFriendships={isGettingFriendships}
          isGettingChannels={isGettingChannels}
          friendships={friendships}
          channels={channels}
          setChannel={setChannel}
        />
      </Flex>
      <Flex as="main" h={"full"} flex={1} borderRightWidth={1}>
        <Chat
          onLeftSideBarOpen={onLeftSideBarOpen}
          onChatDetailOpen={onChatDetailOpen}
          channel={channel}
        />
      </Flex>
      <Flex
        as="aside"
        h="full"
        w="full"
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
      >
        <ChatDetail />
      </Flex>
      <LeftSideBarDrawer
        isOpen={isLeftSideBarOpen}
        onClose={onLeftSideBarClose}
        isConnecting={isConnecting}
        user={user}
        isGettingFriendships={isGettingFriendships}
        isGettingChannels={isGettingChannels}
        friendships={friendships}
        channels={channels}
        setChannel={setChannel}
      />
      <ChatDetailDrawer isOpen={isChatDetailOpen} onClose={onChatDetailClose} />
    </HStack>
  );
}

export default Home;

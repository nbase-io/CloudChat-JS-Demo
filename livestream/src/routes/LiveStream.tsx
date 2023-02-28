import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { nc, useGetSubscriptions, useSubscribe } from "../api";
import Chat from "../components/Chat/Chat";
import ChatDrawer from "../components/Chat/ChatDrawer";
import StreamView from "../components/StreamView/StreamView";
import { useUser } from "../components/Root";

function LiveStream() {
  const { user } = useUser();
  const [isSubscribable, setIsSubscribable] = useState(false);
  // subscribe after connect
  const { data: subscription, isLoading: isSubscribing } = useSubscribe(
    isSubscribable,
    "c80e0fb6-c07a-4a80-b4c0-1a483f477fea"
  );
  // get subscriptions after subscribe
  const { data: subscriptions, isLoading: isGettingSubscriptions } =
    useGetSubscriptions(!!subscription, "c80e0fb6-c07a-4a80-b4c0-1a483f477fea");

  // WARNING: subscribe AFTER socket connection
  nc.bind("onConnected", (payload: string) => {
    setIsSubscribable(true);
  });

  // drawer
  const {
    isOpen: isLiveStreamChatDrawerOpen,
    onOpen: onLiveStreamChatDrawerOpen,
    onClose: onLiveStreamChatDrawerClose,
  } = useDisclosure();

  return (
    <HStack w="full" h="-webkit-calc(100vh - 65px)" bg={"grey.100"} spacing={0}>
      <Flex as="main" h={"full"} flex={1}>
        <StreamView subscriptions={subscriptions} subscription={subscription} />
      </Flex>
      <Flex
        as="aside"
        h={"full"}
        w={"full"}
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
      >
        <Chat subscription={subscription} isDarkMode={true} />
      </Flex>
      <ChatDrawer
        isOpen={isLiveStreamChatDrawerOpen}
        onClose={onLiveStreamChatDrawerClose}
        subscription={subscription}
        isDarkMode={true}
      />
    </HStack>
  );
}

export default LiveStream;

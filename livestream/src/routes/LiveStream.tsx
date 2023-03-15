import { Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { nc, useGetSubscriptions, useSubscribe } from "../api";
import Chat from "../components/Chat/Chat";
import StreamView from "../components/StreamView/StreamView";
import { useGlobal } from "../components/Root";

function LiveStream() {
  const {
    isOpen: isChatOpen,
    onClose: onChatClose,
    onOpen: onChatOpen,
  } = useDisclosure({ defaultIsOpen: true });
  const { isOpen: isChatAlertOpen, onClose: onChatAlertClose } = useDisclosure({
    defaultIsOpen: true,
  });
  const { setIsLoading } = useGlobal();
  const [isSubscribable, setIsSubscribable] = useState(false);
  // subscribe after connect
  const { data: subscription, isLoading: isSubscribing } = useSubscribe(
    isSubscribable,
    "c80e0fb6-c07a-4a80-b4c0-1a483f477fea"
  );
  // get subscriptions after subscribe
  const { data: subscriptions, status: subscriptionStatus } =
    useGetSubscriptions(!!subscription, "c80e0fb6-c07a-4a80-b4c0-1a483f477fea");

  // WARNING: subscribe AFTER socket connection
  nc.bind("onConnected", (payload: string) => {
    setIsSubscribable(true);
  });

  useEffect(() => {
    if (subscriptionStatus === "error" || subscriptionStatus === "success") {
      setIsLoading(false);
    }
  }, [subscriptionStatus]);

  return (
    <Flex
      w="full"
      h="-webkit-calc(100vh - 65px)"
      bg={"grey.100"}
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Flex
        as="main"
        h={{ base: "-webkit-calc(50vh - 33px)", lg: "full" }}
        w={"full"}
      >
        <StreamView
          subscriptions={subscriptions}
          subscription={subscription}
          isChatOpen={isChatOpen}
          onChatOpen={onChatOpen}
        />
      </Flex>
      <Flex
        as="aside"
        h={{ base: "-webkit-calc(50vh - 33px)", lg: "full" }}
        w={"full"}
        maxW={{ base: "full", lg: "lg" }}
        hidden={!isChatOpen}
      >
        <Chat
          subscription={subscription}
          subscriptions={subscriptions}
          onChatClose={onChatClose}
        />
      </Flex>
    </Flex>
  );
}

export default LiveStream;

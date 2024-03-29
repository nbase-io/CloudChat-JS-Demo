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
  const { data: subscription } = useSubscribe(
    isSubscribable,
    "5f2d4142-6c0f-45e8-9899-3ab076e5c25b"
  );

  // getSubscriptions after subscribe
  const {
    data: subscriptions,
    fetchNextPage,
    hasNextPage,
    status: subscriptionsStatus,
  } = useGetSubscriptions(
    !!subscription,
    "5f2d4142-6c0f-45e8-9899-3ab076e5c25b"
  );

  // WARNING: subscribe AFTER socket connection
  nc.bind("onConnected", (payload: string) => {
    setIsSubscribable(true);
  });

  useEffect(() => {
    if (subscriptionsStatus === "error" || subscriptionsStatus === "success") {
      setIsLoading(false);
    }
  }, [subscriptionsStatus]);

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
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </Flex>
    </Flex>
  );
}

export default LiveStream;

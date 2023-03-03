import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  useDisclosure,
} from "@chakra-ui/react";
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

  const chatView = (
    <Popover isOpen={isChatAlertOpen}>
      <Chat
        subscription={subscription}
        subscriptions={subscriptions}
        onChatClose={onChatClose}
      />
      <PopoverContent bg="gray.900" borderColor="gray.600" color="white">
        <PopoverArrow bg="gray.900" />
        <PopoverHeader as="b" borderBottom={0}>
          Live Chat
        </PopoverHeader>
        <PopoverBody color="gray.300">
          Please have a good manner to each other to make the live broad casting
          the best experience possible, thank you!
        </PopoverBody>
        <PopoverFooter borderColor={"gray.600"}>
          <Button colorScheme="blue" w="full" onClick={onChatAlertClose}>
            Okay
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );

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
        flex={1}
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
        maxW={{ base: "full", lg: "sm" }}
        hidden={!isChatOpen}
      >
        {chatView}
      </Flex>
    </Flex>
  );
}

export default LiveStream;

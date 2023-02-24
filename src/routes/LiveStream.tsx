import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import Chat from "../components/LiveStream/Chat/Chat";
import ChatDrawer from "../components/LiveStream/Chat/ChatDrawer";
import StreamView from "../components/LiveStream/StreamView/StreamView";

function LiveStream() {
  // drawer
  const {
    isOpen: isLiveStreamChatDrawerOpen,
    onOpen: onLiveStreamChatDrawerOpen,
    onClose: onLiveStreamChatDrawerClose,
  } = useDisclosure();
  // chat
  const {
    isOpen: isLiveStreamChatOpen,
    onOpen: onLiveStreamChatOpen,
    onClose: onLiveStreamChatClose,
  } = useDisclosure({ defaultIsOpen: true });

  return (
    <HStack w="full" h="-webkit-calc(100vh - 65px)" bg={"grey.100"} spacing={0}>
      <Flex as="main" h={"full"} flex={1}>
        <StreamView />
      </Flex>
      <Flex
        as="aside"
        h={"full"}
        w={"full"}
        maxW={{ base: "xs", xl: "sm" }}
        display={{ base: "none", lg: "flex" }}
      >
        <Chat />
      </Flex>
      <ChatDrawer
        isOpen={isLiveStreamChatDrawerOpen}
        onClose={onLiveStreamChatDrawerClose}
      />
    </HStack>
  );
}

export default LiveStream;

import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import Chat from "../components/LiveStream/Chat/Chat";
import ChatDrawer from "../components/LiveStream/Chat/ChatDrawer";

function LiveStream() {
  // left side bar drawers
  const {
    isOpen: isLiveStreamChatOpen,
    onOpen: onLiveStreamChatOpen,
    onClose: onLiveStreamChatClose,
  } = useDisclosure();

  return (
    <HStack w="full" h="-webkit-calc(100vh - 65px)" bg={"grey.100"} spacing={0}>
      <Flex as="main" h={"full"} flex={1} bg="red.100"></Flex>
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
        isOpen={isLiveStreamChatOpen}
        onClose={onLiveStreamChatClose}
      />
    </HStack>
  );
}

export default LiveStream;

import { Flex, HStack, useDisclosure } from "@chakra-ui/react";
import Chat from "../components/Chat/Chat";
import ChatDetail from "../components/ChatDetail/ChatDetail";
import ChatDetailDrawer from "../components/ChatDetail/ChatDetailDrawer";
import LeftSideBarHeader from "../components/LeftSideBar/LeftSideBar";
import LeftSideBarDrawer from "../components/LeftSideBar/LeftSideBarDrawer";
import { useQuery } from "@tanstack/react-query";
import { connect } from "../api";
import { IUser } from "../lib/interfaces/IUser";

function Home() {
  const { data, status, isLoading } = useQuery<IUser>(["connect"], connect);

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
        <LeftSideBarHeader />
      </Flex>
      <Flex as="main" h={"full"} flex={1} borderRightWidth={1}>
        <Chat
          onLeftSideBarOpen={onLeftSideBarOpen}
          onChatDetailOpen={onChatDetailOpen}
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
      />
      <ChatDetailDrawer isOpen={isChatDetailOpen} onClose={onChatDetailClose} />
    </HStack>
  );
}

export default Home;

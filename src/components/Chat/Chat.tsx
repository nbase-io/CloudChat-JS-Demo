import { useRef } from "react";
import {
  Flex,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Input,
  IconButton,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import {
  IoMdSend,
  IoMdMenu,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { SlOptions, SlSettings } from "react-icons/sl";
import { RxExit } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { FaImage } from "react-icons/fa";

const messages = [
  { message: "you what's up", from: "me", dateSent: "20:23" },
  { message: "netflix", from: "Asher Hong", dateSent: "20:33" },
  { message: "what show?", from: "me", dateSent: "20:43" },
  {
    message: "white tiger, it's a bollywood movie!",
    from: "Asher Hong",
    dateSent: "20:53",
  },
  { message: "worth it?", from: "me", dateSent: "21:03" },
  { message: "of course man", from: "Asher Hong", dateSent: "21:13" },
  { message: "this is fantastic", from: "Asher Hong", dateSent: "22:23" },
];

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
};

function Chat({ onLeftSideBarOpen, onChatDetailOpen }: Props) {
  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  return (
    <Flex w="full" flexDirection={"column"}>
      <HStack px={4} py={4} borderBottomColor="gray.100">
        <IconButton
          rounded={"full"}
          onClick={onLeftSideBarOpen}
          display={{ base: "inherit", lg: "none" }}
          variant="ghost"
          icon={<IoMdMenu />}
          size="lg"
          aria-label="Toggle Left Side Bar Drawer"
        />
        <Stat mt={6}>
          <StatLabel>Chatting on</StatLabel>
          <StatNumber>nbase</StatNumber>
        </Stat>
        <IconButton
          rounded={"full"}
          onClick={onChatDetailOpen}
          display={{ base: "inherit", lg: "none" }}
          variant="ghost"
          icon={<IoMdInformationCircleOutline />}
          size="lg"
          aria-label="Toggle Chat Detail Drawer"
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<SlOptions />}
            variant="ghost"
            rounded={"full"}
          />
          <MenuList>
            <MenuGroup title="맴버">
              <MenuItem icon={<GrAdd />}>초대</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="채널">
              <MenuItem icon={<RxExit />}>나가기</MenuItem>
              <MenuItem icon={<SlSettings />}>설정</MenuItem>
              <MenuItem icon={<AiOutlineDelete />} color={"red"}>
                삭제
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Divider />
      <Flex
        px={6}
        overflowY="auto"
        flexDirection={"column"}
        flex={1}
        onScroll={() => onScroll()}
        ref={listInnerRef}
      >
        {messages.map(({ message, from, dateSent }, index) => (
          <ChatBubble
            key={index}
            message={message}
            dateSent={dateSent}
            from={from}
          />
        ))}
      </Flex>
      <Flex pl={4} py={2} borderTopColor="gray.100" borderTopWidth={1}>
        <Input variant={"outline"} placeholder="Type your message" />
        <IconButton
          colorScheme={"blue"}
          aria-label="Send Image"
          variant={"ghost"}
          icon={<FaImage />}
          ml={2}
        />
        <IconButton
          colorScheme={"blue"}
          aria-label="Send Message"
          variant={"ghost"}
          icon={<IoMdSend />}
          mr={2}
        />
      </Flex>
    </Flex>
  );
}

export default Chat;

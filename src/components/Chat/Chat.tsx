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
  Tooltip,
  InputGroup,
  InputLeftElement,
  Avatar,
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
import { HiOutlineEmojiHappy } from "react-icons/hi";

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
  const listInnerRef = useRef<HTMLDivElement>();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      } else {
        console.log("Left bottom");
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
          <HStack>
            <Avatar size="md" name="nbase" />
            <StatNumber>nbase</StatNumber>
          </HStack>
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
        <InputGroup>
          <InputLeftElement>
            <Tooltip label={"이모지"}>
              <IconButton
                colorScheme={"black"}
                aria-label="Send Image"
                variant={"ghost"}
                icon={<HiOutlineEmojiHappy />}
                ml={2}
              />
            </Tooltip>
          </InputLeftElement>
          <Input
            borderRadius={120}
            variant={"outline"}
            placeholder="입력 후 Enter 키를 누르세요"
          />
        </InputGroup>
        <Tooltip label={"이미지 및 영상 보내기"}>
          <IconButton
            colorScheme={"black"}
            aria-label="Send Image"
            variant={"ghost"}
            icon={<FaImage />}
            ml={2}
          />
        </Tooltip>
        <Tooltip label={"메세지 보내기"}>
          <IconButton
            colorScheme={"black"}
            aria-label="Send Message"
            variant={"ghost"}
            icon={<IoMdSend />}
            mr={2}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Chat;

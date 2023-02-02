import { useRef, useState } from "react";
import {
  Flex,
  HStack,
  Stat,
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
  Box,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import {
  IoIosSend,
  IoMdMenu,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { SlOptions, SlSettings } from "react-icons/sl";
import { RxExit } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa";
import { MdOutlinePersonRemove, MdOutlinePersonAdd } from "react-icons/md";

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
  { message: "ima watch it soon too!", from: "me", dateSent: "22:25" },
];

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
};

function Chat({ onLeftSideBarOpen, onChatDetailOpen }: Props) {
  const [isBottom, setIsBottom] = useState(false);
  const bottom = useRef<Box>(null);
  const scrollToBottom = () => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };
  const listInnerRef = useRef<Flex>();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // scoll bottom reached
        setIsBottom(true);
      } else {
        if (isBottom) {
          setIsBottom(false);
        }
      }
    }
  };

  return (
    <Flex w="full" flexDirection={"column"}>
      <HStack px={4} py={4} borderBottomColor="gray.100">
        <Tooltip label={"채널 리스트"}>
          <IconButton
            rounded={"full"}
            onClick={onLeftSideBarOpen}
            display={{ base: "inherit", lg: "none" }}
            variant="ghost"
            icon={<IoMdMenu />}
            size="lg"
            aria-label="Toggle Left Side Bar Drawer"
          />
        </Tooltip>
        <Stat mt={6}>
          <HStack>
            <Avatar size="md" name="nbase" />
            <StatNumber>nbase</StatNumber>
          </HStack>
        </Stat>
        <Tooltip label={"채널 정보"}>
          <IconButton
            rounded={"full"}
            onClick={onChatDetailOpen}
            display={{ base: "inherit", lg: "none" }}
            variant="ghost"
            icon={<IoMdInformationCircleOutline />}
            size="lg"
            aria-label="Toggle Chat Detail Drawer"
          />
        </Tooltip>
        <Menu>
          <Tooltip label={"채널 매뉴"}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<SlOptions />}
              variant="ghost"
              rounded={"full"}
            />
          </Tooltip>
          <MenuList>
            <MenuGroup title="맴버">
              <MenuItem icon={<MdOutlinePersonAdd />}>초대</MenuItem>
              <MenuItem icon={<MdOutlinePersonRemove />}>내보내기</MenuItem>
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
        <Box ref={bottom}></Box>
      </Flex>
      {!isBottom && (
        <Tooltip label="아래로 스크롤">
          <IconButton
            rounded={"full"}
            variant="ghost"
            icon={<FaArrowDown />}
            size="lg"
            aria-label="Scroll to Bottom"
            position={"absolute"}
            w={"50px"}
            margin={"0 auto"}
            left={0}
            right={0}
            bottom={"64px"}
            onClick={() => scrollToBottom()}
          />
        </Tooltip>
      )}
      <Flex
        pl={4}
        py={2}
        borderTopColor="gray.100"
        borderTopWidth={isBottom ? 0 : 1}
      >
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
            icon={<IoIosSend />}
            mr={2}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Chat;

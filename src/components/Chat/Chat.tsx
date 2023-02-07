import { useRef, useState } from "react";
import { Flex, IconButton, Divider, Tooltip, Box } from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { FaArrowDown } from "react-icons/fa";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

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
  channel: any;
};

function Chat({ onLeftSideBarOpen, onChatDetailOpen, channel }: Props) {
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
      <ChatHeader
        onLeftSideBarOpen={onLeftSideBarOpen}
        onChatDetailOpen={onChatDetailOpen}
        channel={channel}
      />
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
      <ChatInput isBottom={isBottom} />
    </Flex>
  );
}

export default Chat;

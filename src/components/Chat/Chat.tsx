import { useRef, useState } from "react";
import {
  Flex,
  IconButton,
  Divider,
  Tooltip,
  Box,
  Center,
  Spinner,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { IMessage } from "../../lib/interfaces/IMessage";
import { HiArrowDown } from "react-icons/hi";

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
  channel: any;
  isGettingMessages: boolean;
  messages: IMessage[] | undefined;
};

function Chat({
  onLeftSideBarOpen,
  onChatDetailOpen,
  channel,
  isGettingMessages,
  messages,
  displayChannelDetail,
  setDisplayChannelDetail,
}: Props) {
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
        displayChannelDetail={displayChannelDetail}
        setDisplayChannelDetail={setDisplayChannelDetail}
      />
      <Divider />
      {isGettingMessages ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <Flex
          px={6}
          overflowY="auto"
          flexDirection={"column"}
          flex={1}
          onScroll={() => onScroll()}
          ref={listInnerRef}
        >
          {messages?.map(({ content, sender, created_at }, index) => (
            <ChatBubble
              key={index}
              message={content}
              created_at={created_at}
              from={sender.id}
            />
          ))}
          <Box ref={bottom}></Box>
        </Flex>
      )}
      {!isBottom && (
        <Tooltip label="아래로 스크롤">
          <IconButton
            rounded={"full"}
            bg={"black"}
            color="white"
            icon={<HiArrowDown />}
            aria-label="Scroll to Bottom"
            position={"absolute"}
            w={"40px"}
            margin={"0 auto"}
            left={0}
            right={0}
            bottom={"64px"}
            onClick={() => scrollToBottom()}
            _hover={{ bg: "gray" }}
          />
        </Tooltip>
      )}
      <ChatInput isBottom={isBottom} />
    </Flex>
  );
}

export default Chat;

import { useEffect, useRef, useState } from "react";
import {
  Flex,
  IconButton,
  Divider,
  Tooltip,
  Box,
  Center,
  Text,
  Progress,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import { HiArrowDown } from "react-icons/hi";
import { useGetMessages } from "../../api";
import { IMessage } from "../../lib/interfaces/IMessage";

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
  channel: any;
  subscription: any;
};

function Chat({
  onLeftSideBarOpen,
  onChatDetailOpen,
  channel,
  subscription,
}: Props) {
  // getMessages after subscription
  const {
    data: messages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetMessages(!!subscription, channel?.id);

  // scroll to bottom
  const [isBottom, setIsBottom] = useState(false);
  const bottom = useRef<any>(null);
  const scrollToBottom = () => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };
  const listInnerRef = useRef<any>();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // handle bottom
      if (scrollTop + clientHeight === scrollHeight) {
        // scoll bottom reached
        setIsBottom(true);
      } else {
        if (isBottom) {
          setIsBottom(false);
        }
      }

      // handle top intinite scroll
      if (!isFetchingNextPage && scrollTop === 0) {
        // if (hasNextPage) {
        fetchNextPage();
        console.log("REFETCH");
        // }
      }
    }
  };

  // useEffect(() => {
  //   if (messages) {
  //     console.log(messages);
  //   }
  // }, [messages]);

  const messagesComponent =
    messages === undefined ? (
      <Flex flexDirection={"column"} flex={1}>
        <Progress size="xs" isIndeterminate />
      </Flex>
    ) : (
      <Flex
        px={6}
        overflowY="auto"
        flexDirection={"column"}
        flex={1}
        onScroll={() => onScroll()}
        ref={listInnerRef}
      >
        {messages.pages
          .map((page: any[]) =>
            page
              ?.map(({ content, sender, created_at }, index) => (
                <ChatBubble
                  key={index}
                  message={content}
                  created_at={created_at}
                  from={sender}
                />
              ))
              .reverse()
          )
          .reverse()}
        <Box ref={bottom}></Box>
      </Flex>
    );

  return (
    <Flex w="full" flexDirection={"column"}>
      <ChatHeader
        onLeftSideBarOpen={onLeftSideBarOpen}
        onChatDetailOpen={onChatDetailOpen}
        channel={channel}
      />
      <Divider />
      {channel && messagesComponent}
      {!channel && (
        <Center w="full" mt={"40%"}>
          <Text as="b">Please select a channel</Text>
        </Center>
      )}
      {!isBottom && messages && (
        <Tooltip label="Scroll to bottom">
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
      {channel && <ChatInput isBottom={isBottom} />}
    </Flex>
  );
}

export default Chat;

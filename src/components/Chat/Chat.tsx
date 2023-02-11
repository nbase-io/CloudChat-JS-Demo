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
  Spinner,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import { HiArrowDown } from "react-icons/hi";
import { useGetMessages } from "../../api";
import { IMessage } from "../../lib/interfaces/IMessage";
import Moment from "react-moment";

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
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    }
  };

  const messagesComponent = (
    <Flex
      px={6}
      overflowY="auto"
      flexDirection={"column"}
      flex={1}
      onScroll={() => onScroll()}
      ref={listInnerRef}
    >
      {messages?.pages
        .map((page: any[]) =>
          page
            ?.map(({ content, sender, created_at }, index, array) => {
              if (index > 0) {
                const currentMessageDate = new Date(created_at).getDate();
                const pastMessageDate = new Date(
                  array[index - 1].created_at
                ).getDate();
                return currentMessageDate != pastMessageDate ? (
                  <Box key={index}>
                    <Flex align="center" mt={6}>
                      <Divider />
                      <Text
                        my={4}
                        fontSize={10}
                        minW={"40"}
                        color={"gray"}
                        align="center"
                      >
                        <Moment calendar>{created_at}</Moment>
                      </Text>
                      <Divider />
                    </Flex>
                    <ChatBubble
                      key={index}
                      message={content}
                      created_at={created_at}
                      from={sender}
                    />
                  </Box>
                ) : (
                  <ChatBubble
                    key={index}
                    message={content}
                    created_at={created_at}
                    from={sender}
                  />
                );
              }
            })
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
      {channel && (messages === undefined || isFetchingNextPage) && (
        <Progress size="xs" isIndeterminate />
      )}
      {channel && messagesComponent}
      {!channel && (
        <Center w="full" mt={"20%"}>
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

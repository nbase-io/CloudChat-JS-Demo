import { useEffect, useRef, useState } from "react";
import {
  Flex,
  IconButton,
  Divider,
  Tooltip,
  Box,
  Text,
  Progress,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import { HiArrowDown } from "react-icons/hi";
// import { useGetMessages } from "../../api";
import Moment from "react-moment";
import { nc } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [messages, setMessages] = useState<any>([]);
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // getMessages: using state instead of react infinite query for educational purpose
  const getMessages = async () => {
    setIsGettingMessages(true);
    try {
      const filter = { channel_id: channel.id };
      const sort = { created_at: -1 };
      const option = { offset: messages.length, per_page: 25 };
      const response = await nc.getMessages(filter, sort, option);
      console.log(response);
      const newMessages = messages.concat(response.edges);
      setMessages(newMessages);
      console.log(messages);
      setHasMore(messages.length + response.edges.length < response.totalCount);
    } catch (error) {
      console.log(error);
    }
    setIsGettingMessages(false);
  };

  useEffect(() => {
    getMessages();
  }, [channel]);

  // scroll to bottom
  const [isBottom, setIsBottom] = useState(false);

  const messagesComponent = (
    <Flex
      px={6}
      overflowY="auto"
      flexDirection={"column-reverse"}
      flex={1}
      pb={4}
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={getMessages}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }}
        inverse
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={<h4>Loading...</h4>}
      >
        {messages.map(({ node }: any, index: number, array: any[]) => {
          // all messages except the most recent message
          if (index < 0) {
            const currentMessageDate = new Date(node.created_at).getDate();
            const pastMessageDate = new Date(
              array[index - 1].node.created_at
            ).getDate();
            // lsat message date
            var isLastMessageDate = false;
            if (index === array.length - 1) {
              isLastMessageDate = true;
            }
            return (
              <Box key={index}>
                {isLastMessageDate && (
                  <Flex align="center" mt={6}>
                    <Divider />
                    <Text
                      my={4}
                      fontSize={10}
                      minW={"40"}
                      color={"gray"}
                      align="center"
                    >
                      <Moment calendar>{node.created_at}</Moment>
                    </Text>
                    <Divider />
                  </Flex>
                )}
                <ChatBubble
                  key={index}
                  message={node.content}
                  created_at={node.created_at}
                  from={node.sender}
                />
                {!isLastMessageDate &&
                  currentMessageDate != pastMessageDate && (
                    <Flex align="center" mt={6}>
                      <Divider />
                      <Text
                        my={4}
                        fontSize={10}
                        minW={"40"}
                        color={"gray"}
                        align="center"
                      >
                        <Moment calendar>
                          {array[index - 1].node.created_at}
                        </Moment>
                      </Text>
                      <Divider />
                    </Flex>
                  )}
              </Box>
            );
          } else {
            // most recent message
            return (
              <ChatBubble
                key={index}
                message={node.content}
                created_at={node.created_at}
                from={node.sender}
              />
            );
          }
        })}
      </InfiniteScroll>
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
      {channel && isGettingMessages && <Progress size="xs" isIndeterminate />}
      {channel && messagesComponent}
      {/* {!isBottom && messages.length > 0 && (
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
      )} */}
      {channel && <ChatInput isBottom={isBottom} channel={channel} />}
    </Flex>
  );
}

export default Chat;

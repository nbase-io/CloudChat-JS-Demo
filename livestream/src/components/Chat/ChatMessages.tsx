import { Divider, Flex, Text, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import ChatBubble from "./ChatBubble";

type Props = {
  messages: any[];
  getMessages: () => void;
  hasMore: boolean;
  setReplyParentMessage: any;
};

function ChatMessages({
  messages,
  getMessages,
  hasMore,
  setReplyParentMessage,
}: Props) {
  return (
    <Flex
      px={6}
      overflowY="auto"
      flexDirection={"column-reverse"}
      flex={1}
      pb={4}
      id="scrollableDiv"
      w="full"
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
        loader={<></>}
        endMessage={
          <Flex align="center" mt={6}>
            <Divider />
            <Text
              my={4}
              fontSize={10}
              minW={"40"}
              color={"gray"}
              align="center"
            >
              Beginning of the conversation
            </Text>
            <Divider />
          </Flex>
        }
      >
        {messages?.map(({ node }: any, index: number, array: any[]) => {
          // all messages except the most recent message
          if (index > 0) {
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
                  node={node}
                  setReplyParentMessage={setReplyParentMessage}
                />
                {currentMessageDate != pastMessageDate && (
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
                node={node}
                setReplyParentMessage={setReplyParentMessage}
              />
            );
          }
        })}
      </InfiniteScroll>
    </Flex>
  );
}

export default ChatMessages;

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

  // getMessages: using state instead of react infinite query for educational purpose
  useEffect(() => {
    const getMessages = async () => {
      try {
        setIsGettingMessages(true);
        const filter = { channel_id: channel.id };
        const sort = { created_at: -1 };
        const option = { offset: 0, per_page: 25 };
        const response = await nc.getMessages(filter, sort, option);
        console.log(response);
        setMessages(response);
        setIsGettingMessages(false);
      } catch (error) {
        console.log(error);
        setIsGettingMessages(false);
      }
    };
    getMessages();
  }, [channel]);

  // getMessages after subscription
  // const {
  //   data: messages,
  //   isFetchingNextPage,
  //   hasNextPage,
  //   fetchNextPage,
  // } = useGetMessages(!!subscription, channel?.id);
  // const queryClient = useQueryClient();

  // nc.bind("onMessageReceived", function (channel: any, message: any) {
  // 수신된 메시지
  // console.log(channel);
  // console.log(message);
  // const { pages, ...extraData } = queryClient.getQueryData([
  //   `messages`,
  //   { channelId: channel },
  // ]);

  // const newData: any = { node: message };
  // const edges = [].concat(pages[0].edges, newData);
  // const updatedFirstPage = { ...newData, ...pages[0].edges };
  // const updatedFirstPage = { ...pages[0].edges, 25: newData };
  // const updatedData = {
  //   ...extraData,
  //   pages: [updatedFirstPage, ...pages.slice(1)],
  // };
  // console.log(updatedFirstPage);
  // console.log(updatedData);
  // queryClient.setQueryData([`messages`, { channelId: channel }], updatedData);
  // });

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
      // if (!isFetchingNextPage && scrollTop === 0) {
      //   if (hasNextPage) {
      //     fetchNextPage();
      //   }
      // }
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
      {messages.edges
        ?.map(({ node }: any, index: number, array: any[]) => {
          // all messages except the most recent message
          if (index > 0) {
            const currentMessageDate = new Date(node.created_at).getDate();
            const pastMessageDate = new Date(
              array[index - 1].node.created_at
            ).getDate();
            // lsat message date
            var isLastMessageDate = false;
            // if (
            //   (pageIndex === pagesArray.length - 1, index === array.length - 1)
            // ) {
            //   isLastMessageDate = true;
            // }
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
        })
        .reverse()}
      {/* {messages?.pages
        .map((page: any, pageIndex, pagesArray) =>
          page?.edges
            ?.map(({ node }: any, index: number, array: any[]) => {
              // all messages except the most recent message
              if (index > 0) {
                const currentMessageDate = new Date(node.created_at).getDate();
                const pastMessageDate = new Date(
                  array[index - 1].node.created_at
                ).getDate();
                // lsat message date
                var isLastMessageDate = false;
                if (
                  (pageIndex === pagesArray.length - 1,
                  index === array.length - 1)
                ) {
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
            })
            .reverse()
        )
        .reverse()} */}
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

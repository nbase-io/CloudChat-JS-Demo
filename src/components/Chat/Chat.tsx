import { useEffect, useRef, useState } from "react";
import { Flex, Divider, Box, Text, Progress } from "@chakra-ui/react";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import { HiArrowDown } from "react-icons/hi";
import { nc, useMarkRead } from "../../api";
import ChatMessages from "./ChatMessages";

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
  const hasMore = useRef(false);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [replyParentMessage, setReplyParentMessage] = useState<any>(null);
  const lastMessageRef = useRef(messages[messages.length - 1]);
  const { mutate: markRead } = useMarkRead(
    channel.id,
    lastMessageRef.current?.node.message_id,
    "guest",
    lastMessageRef.current?.node.sort_id
  );

  // getMessages: using state instead of react query for educational purpose
  const getMessages = async () => {
    setIsGettingMessages(true);
    try {
      const filter = { channel_id: channel.id };
      const sort = { created_at: -1 };
      const option = { offset: messages.length, per_page: 25 };
      const response = await nc.getMessages(filter, sort, option);
      const newMessages = messages.concat(response.edges);
      setMessages(newMessages);
      hasMore.current =
        messages.length + response.edges.length < response.totalCount;
    } catch (error) {
      console.log(error);
    }
    setIsGettingMessages(false);
  };

  // message received
  nc.bind("onMessageReceived", (channelId: string, message: any) => {
    if (channel.id === channelId) {
      setArrivalMessage({ node: message });
    }
    console.log(channelId, message);
  });

  // message deleted
  nc.bind("onMessageDeleted", (channelId: string, data: any) => {
    if (channel.id === channelId) {
      // delete message
      const newMessages = messages.filter(
        (item: any) => item.node.message_id !== data.message_id
      );
      setMessages(newMessages);
    }
  });

  // receive message
  useEffect(() => {
    setMessages((prev: any) => [arrivalMessage, ...prev]);
  }, [arrivalMessage]);

  // clear messages when channel changed (and after subscribed)
  useEffect(() => {
    setMessages([]);
    hasMore.current = false;
  }, [subscription]);

  // getMessages if messages are cleared (channel changed)
  useEffect(() => {
    if (messages.length === 0 && subscription) {
      getMessages();
    }
    // keep track of the last message
    if (messages.length > 0 && messages[0]) {
      lastMessageRef.current = messages[0];
      // markRead();
    }
  }, [messages]);

  return (
    <Flex w="full" flexDirection={"column"}>
      <ChatHeader
        onLeftSideBarOpen={onLeftSideBarOpen}
        onChatDetailOpen={onChatDetailOpen}
        channel={channel}
      />
      <Divider />
      {channel && (isGettingMessages || !subscription) && (
        <Progress size="xs" isIndeterminate />
      )}
      {channel && (
        <ChatMessages
          messages={messages}
          getMessages={getMessages}
          hasMore={hasMore.current}
          setReplyParentMessage={setReplyParentMessage}
        />
      )}
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
      {channel && (
        <ChatInput
          channel={channel}
          replyParentMessage={replyParentMessage}
          setReplyParentMessage={setReplyParentMessage}
        />
      )}
    </Flex>
  );
}

export default Chat;

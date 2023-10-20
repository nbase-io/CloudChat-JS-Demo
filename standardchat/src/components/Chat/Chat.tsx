import { useEffect, useRef, useState } from "react";
import { Flex, Divider, useToast, Progress } from "@chakra-ui/react";
import { ChatHeader } from "./ChatHeader";
import ChatInput from "./ChatInput";
import { nc, useMarkRead } from "../../api";
import ChatMessages from "./ChatMessages";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobal } from "../Root";
import { toast } from "react-hot-toast";

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
  channel: any;
  setChannel: any;
  subscription: any;
};

function Chat({
  onLeftSideBarOpen,
  onChatDetailOpen,
  channel,
  setChannel,
  subscription,
}: Props) {
  const queryClient = useQueryClient();
  const { user } = useGlobal();
  const [messages, setMessages] = useState<any>([]);
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const hasMore = useRef(false);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [replyParentMessage, setReplyParentMessage] = useState<any>(null);
  const lastMessageRef = useRef<any>();
  const { mutate: markRead } = useMarkRead(
    channel.id,
    lastMessageRef.current?.node.message_id,
    user!.id,
    lastMessageRef.current?.node.sort_id
  );

  const guideToast = useToast();

  // getMessages: using state instead of react query for educational purpose
  const getMessages = async () => {
    setIsGettingMessages(true);
    try {
      const filter = { channel_id: channel.id };
      const sort = { sort_id: -1 };
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
  });

  // message deleted
  nc.bind("onMessageDeleted", (channelId: string, data: any) => {
    if (channel.id === channelId) {
      toast.success(`A message has been deleted!`);
      // delete message
      const newMessages = messages.filter(
        (item: any) => item.node.message_id !== data.message_id
      );
      setMessages(newMessages);
    }
  });

  // user joined
  nc.bind("onMemberJoined", (data: any) => {
    if (channel.id === data.channel_id) {
      toast(`${data.user_id} joined ${channel.name}`, {
        duration: 5000,
        position: "bottom-center",
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries([
        "subscriptions",
        { channelId: channel.id },
      ]);
    }
  });

  // user leave
  nc.bind("onMemberLeft", (data: any) => {
    if (channel.id === data.channel_id) {
      toast(`${data.user_id} left ${channel.name}`, {
        duration: 5000,
        position: "bottom-center",
        icon: "✌️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries([
        "subscriptions",
        { channelId: channel.id },
      ]);
    }
  });

  // receive message
  useEffect(() => {
    setMessages((prev: any) => [arrivalMessage, ...prev]);
  }, [arrivalMessage]);

  // clear messages when channel changed (and after subscribed)
  useEffect(() => {
    setMessages([]);
    hasMore.current = true;
    lastMessageRef.current = undefined;
    guideToast.closeAll();
  }, [subscription]);

  // getMessages if messages are cleared (channel changed)
  useEffect(() => {
    if (hasMore.current && messages.length === 0 && subscription) {
      getMessages();
      if (channel.integration_id) {
        guideToast({
          position: "top",
          title: channel?.integration_id,
          description: `이 채널은 ${channel?.integration_id} 기능이 연동되어 있습니다. 연동된 기능을 사용하려면, 메시지 앞에 "#"을 붙여주세요. `,
          status: "info",
          duration: 20000,
          isClosable: true,
          variant: "subtle",
        });
      }
    }
    // keep track of the last message
    if (messages.length > 0 && messages[0]) {
      lastMessageRef.current = messages[0];
      if (lastMessageRef.current) {
      }
      // markRead();
      // queryClient.invalidateQueries(["countUnread"]);
    }
  }, [messages]);

  return (
    <Flex w="full" flexDirection={"column"}>
      <ChatHeader
        onLeftSideBarOpen={onLeftSideBarOpen}
        onChatDetailOpen={onChatDetailOpen}
        channel={channel}
        setChannel={setChannel}
      />
      <Divider />
      {channel && isGettingMessages && <Progress size="xs" isIndeterminate />}
      {channel && (
        <ChatMessages
          messages={messages}
          getMessages={getMessages}
          hasMore={hasMore.current}
          setReplyParentMessage={setReplyParentMessage}
        />
      )}
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

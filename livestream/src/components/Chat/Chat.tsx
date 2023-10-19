import {
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Progress,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { nc } from "../../api";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import UserList from "./UserList";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Props = {
  subscription: any;
  subscriptions: any;
  onChatClose: any;
  fetchNextPage: any;
  hasNextPage: boolean | undefined;
};

function Chat({
  subscription,
  subscriptions,
  onChatClose,
  fetchNextPage,
  hasNextPage,
}: Props) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<any>([]);
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const hasMore = useRef(true);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [replyParentMessage, setReplyParentMessage] = useState<any>(null);
  const {
    isOpen: isUserListOpen,
    onClose: onUserListClose,
    onOpen: onUserListOpen,
  } = useDisclosure({ defaultIsOpen: false });

  // getMessages: using state instead of react query for educational purpose
  const getMessages = async () => {
    setIsGettingMessages(true);
    try {
      const filter = { channel_id: subscription?.channel_id };
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
    if (subscription?.channel_id === channelId) {
      setArrivalMessage({ node: message });
    }
  });

  // message deleted
  nc.bind("onMessageDeleted", (channelId: string, data: any) => {
    if (subscription?.channel_id === channelId) {
      // delete message
      const newMessages = messages.filter(
        (item: any) => item.node.message_id !== data.message_id
      );
      setMessages(newMessages);
    }
  });

  // user joined
  nc.bind("onMemberJoined", (data: any) => {
    if (subscription?.channel_id === data.channel_id) {
      toast(`${data.user_id} joined ${subscription?.channel.name}`, {
        duration: 5000,
        position: "bottom-right",
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries([
        "subscriptions",
        { channelId: subscription?.channel_id },
      ]);
    }
  });

  // user leave
  nc.bind("onMemberLeaved", (data: any) => {
    if (subscription?.channel_id === data.channel_id) {
      toast(`${data.user_id} left ${subscription?.channel.name}`, {
        duration: 5000,
        position: "bottom-right",
        icon: "✌️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      queryClient.invalidateQueries([
        "subscriptions",
        { channelId: subscription?.channel_id },
      ]);
    }
  });

  // get messages after subscribe
  useEffect(() => {
    if (hasMore.current && messages.length === 0 && subscription) {
      getMessages();
    }
  }, [subscription]);

  // receive message
  useEffect(() => {
    if (subscription) {
      setMessages((prev: any) => [arrivalMessage, ...prev]);
    }
  }, [arrivalMessage]);

  const chatHeader = (
    <HStack w="full" h={"60px"} justifyContent="space-between" px={2}>
      <Tooltip label={"Close Chat"}>
        <IconButton
          icon={<TbLayoutSidebarLeftCollapse />}
          variant={"ghost"}
          aria-label={"Collapse Chat"}
          size="md"
          _hover={{ bgColor: "gray.700" }}
          onClick={onChatClose}
        />
      </Tooltip>
      <Text as="b" fontSize={15}>
        Live Chat
      </Text>
      <Tooltip label="Members">
        <IconButton
          icon={<RiGroupLine />}
          variant={"ghost"}
          aria-label={"Attendance"}
          size="md"
          _hover={{ bgColor: "gray.700" }}
          onClick={onUserListOpen}
        />
      </Tooltip>
    </HStack>
  );

  return isUserListOpen ? (
    <UserList
      onClose={onUserListClose}
      subscriptions={subscriptions}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  ) : (
    <VStack bg="gray.900" w="full" color="white" spacing={0}>
      {chatHeader}
      <Divider borderColor={"gray"} />
      {isGettingMessages && <Progress size="xs" isIndeterminate w="full" />}
      <ChatMessages
        messages={messages}
        getMessages={getMessages}
        hasMore={hasMore.current}
        setReplyParentMessage={setReplyParentMessage}
      />
      <ChatInput
        channel={{ id: "c80e0fb6-c07a-4a80-b4c0-1a483f477fea" }}
        replyParentMessage={replyParentMessage}
        setReplyParentMessage={setReplyParentMessage}
      />
    </VStack>
  );
}

export default Chat;

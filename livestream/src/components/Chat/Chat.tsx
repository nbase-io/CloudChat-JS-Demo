import {
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Box,
  Progress,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { nc } from "../../api";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import UserList from "./UserList";

type Props = {
  subscription: any;
  subscriptions: any;
};

function Chat({ subscription, subscriptions }: Props) {
  const [messages, setMessages] = useState<any>([]);
  const [isGettingMessages, setIsGettingMessages] = useState(false);
  const hasMore = useRef(true);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [replyParentMessage, setReplyParentMessage] = useState<any>(null);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

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

  return isOpen ? (
    <UserList onClose={onClose} subscriptions={subscriptions} />
  ) : (
    <VStack bg="gray.900" w="full" color="white" spacing={0}>
      <HStack w="full" h={"60px"} justifyContent="space-between">
        {/* <IconButton
        icon={<TbLayoutSidebarLeftExpand />}
        variant={"ghost"}
        aria-label={"Close Chat"}
        size="lg"
        _hover={{ bgColor: "gray.700" }}
      /> */}
        <Text></Text>
        <Text as="b">Live Chat</Text>
        <IconButton
          icon={<RiGroupLine />}
          variant={"ghost"}
          aria-label={"Attendance"}
          size="lg"
          _hover={{ bgColor: "gray.700" }}
          onClick={onOpen}
        />
      </HStack>
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

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  IconButton,
  Tooltip,
  Image,
  Spinner,
  useDisclosure,
  useClipboard,
} from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";
import { VscReply, VscCopy, VscTrash, VscCheck } from "react-icons/vsc";
import Moment from "react-moment";
import { useDeleteMessage } from "../../api";
import ImageViwer from "./ImageViewer";
import { useGlobal } from "../Root";
import toast from "react-hot-toast";
import JSONPretty from "react-json-pretty";
import "./ChatBubble.css";
import dayjs from "dayjs";

type Props = {
  node: any;
  setReplyParentMessage: any;
};

function ChatBubble({ node, setReplyParentMessage }: Props) {
  const { user } = useGlobal();

  const {
    isOpen: isImageModalOpen,
    onOpen: onImageModalOpen,
    onClose: onImageModalClose,
  } = useDisclosure();
  const {
    isOpen: isParentImageModalOpen,
    onOpen: onParentImageModalOpen,
    onClose: onParentImageModalClose,
  } = useDisclosure();
  const [isHovering, setIsHovering] = useState(false);
  const isMe = node.sender.id === user!.id;
  const allignment = isMe ? "flex-end" : "flex-start";
  const bottomRightRadius = isMe ? 0 : 18;
  const topLeftRadius = isMe ? 18 : 0;
  const { mutate: deleteMessage, status: deleteMessageStatus } =
    useDeleteMessage(node.channel_id, node.message_id);
  const { onCopy, setValue, hasCopied } = useClipboard(node.content);

  // this is needed for copy-to-clipboard
  useEffect(() => {
    setValue(node.content);
  }, [node.content]);
  const onCopyButtonClicked = () => {
    onCopy();
    toast.success(`"${node.content}" has been copied to the clipboard!`);
  };

  const othersBubbleName = (
    <HStack>
      <Tooltip label={node.sender.id}>
        <Avatar
          size={"sm"}
          name={node.sender.name}
          src={node.sender.profile}
        ></Avatar>
      </Tooltip>
      <Text ml={6} fontSize={"small"}>
        {node.sender.name}
      </Text>
    </HStack>
  );

  const messageTime = (
    <Text fontSize={"xs"} color={"gray"}>
      {dayjs(node.created_at).format("LTS")}
    </Text>
  );

  const replyButton = (
    <Tooltip label={"Reply"}>
      <IconButton
        aria-label="Reply Message"
        variant={"ghost"}
        icon={<VscReply />}
        size={"sm"}
        onClick={() => setReplyParentMessage(node)}
        _hover={{ bg: "gray.100" }}
      />
    </Tooltip>
  );

  const copyButton = (
    <Tooltip label={"Copy"}>
      <IconButton
        aria-label="Copy Message"
        variant={"ghost"}
        icon={hasCopied ? <VscCheck /> : <VscCopy />}
        size={"sm"}
        onClick={onCopyButtonClicked}
        _hover={{ bg: "gray.100" }}
      />
    </Tooltip>
  );

  const deleteButton = (
    <Tooltip label={"Delete"}>
      <IconButton
        aria-label="Delete Message"
        variant={"ghost"}
        icon={<VscTrash />}
        size={"sm"}
        onClick={() => deleteMessage()}
        _hover={{ bg: "gray.100" }}
      />
    </Tooltip>
  );

  const parentMessage = () => {
    if (node.parent_message) {
      if (node.parent_message?.message_type === "text") {
        return (
          <Text fontSize={"13px"} color={isMe ? "white" : "#555"}>
            {node.parent_message?.content}
          </Text>
        );
      } else {
        return (
          <Image
            src={`https://dashboard-api.beta-ncloudchat.naverncp.com${node.parent_message?.attachment_filenames?.url}`}
            alt={node.parent_message?.attachment_filenames?.name}
            onClick={onParentImageModalOpen}
            fallback={<Spinner />}
            color="gray"
          />
        );
      }
    } else {
      return <Text fontSize={"sm"}>Deleted message</Text>;
    }
  };

  const parentBubble = (
    <HStack
      px={4}
      py={2}
      w="full"
      borderTopLeftRadius={topLeftRadius}
      borderTopRightRadius={18}
      bg={isMe ? "#1370ce" : "#d7dce0"}
      color={node.parent_message ? "#555" : "gray.100"}
    >
      {!node.parent_message && <FaExclamationCircle />}
      {parentMessage()}
    </HStack>
  );

  const messageContent = () => {
    if(node.attachment_filenames) {
      console.log(`https://dashboard-api.beta-ncloudchat.naverncp.com${node.attachment_filenames?.url}`);
    }
    if (node.translate) {
      return (
        <JSONPretty
          themeClassName="custom-json-pretty"
          data={node.content}
        ></JSONPretty>
      );
    } else {
      return node.message_type === "text" ? (
        <Text fontSize={"15px"} color={isMe ? "white" : "#222"}>
          {node.content}
        </Text>
      ) : (
        
        <Image
          src={`https://dashboard-api.beta-ncloudchat.naverncp.com${node.attachment_filenames?.url}`}
          alt={node.attachment_filenames?.name}
          onClick={onImageModalOpen}
          fallback={<Spinner />}
        />
      );
    }
  };

  return (
    <VStack mt={6} alignItems={allignment} alignSelf={allignment}>
      {!isMe && othersBubbleName}
      {node.parent_message_id && node.parent_message && (
        <HStack fontSize={13} spacing={1}>
          <VscReply />
          <Text>reply to</Text>
          <Text as="b">{node.parent_message?.sender?.name}</Text>
        </HStack>
      )}
      <HStack
        alignItems={isHovering ? "center" : "flex-end"}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* time and hover buttons */}
        {isMe &&
          (isHovering ? (
            <HStack spacing={0}>
              {deleteButton}
              {node.message_type === "text" && copyButton}
              {replyButton}
            </HStack>
          ) : (
            messageTime
          ))}
        <VStack
          onMouseEnter={() => setIsHovering(true)}
          spacing={0}
          maxW={{ base: 60, sm: "xl" }}
          minH={"40px"}
        >
          {node.parent_message_id && parentBubble}
          <Box
            px={4}
            py={2}
            w="full"
            bg={isMe ? "#117ce9" : "#eaedef"}
            borderTopLeftRadius={node.parent_message_id ? 0 : topLeftRadius}
            borderTopRightRadius={node.parent_message_id ? 0 : 18}
            borderBottomLeftRadius={18}
            borderBottomRightRadius={bottomRightRadius}
            _hover={{ bg: isMe ? "blue.600" : "gray.400" }}
          >
            {messageContent()}
          </Box>
        </VStack>
        {/* time and hover buttons */}
        {!isMe &&
          (isHovering ? (
            <HStack spacing={0}>
              {replyButton}
              {node.message_type === "text" && copyButton}
            </HStack>
          ) : (
            messageTime
          ))}
      </HStack>
      <ImageViwer
        node={node}
        isModalOpen={isImageModalOpen}
        onModalClose={onImageModalClose}
        onModalOpen={onImageModalOpen}
      />
      {node.parent_message && (
        <ImageViwer
          node={node.parent_message}
          isModalOpen={isParentImageModalOpen}
          onModalClose={onParentImageModalClose}
          onModalOpen={onParentImageModalOpen}
        />
      )}
    </VStack>
  );
}

export default ChatBubble;

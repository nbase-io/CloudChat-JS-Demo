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
  useToast,
} from "@chakra-ui/react";
// import { FaReply, FaCopy, FaTrashAlt, FaCheck } from "react-icons/fa";
import { VscReply, VscCopy, VscTrash, VscCheck } from "react-icons/vsc";
import Moment from "react-moment";
import { useDeleteMessage } from "../../api";
import ImageViwer from "./ImageViewer";

type Props = {
  node: any;
  setReplyParentMessage: any;
};

function ChatBubble({ node, setReplyParentMessage }: Props) {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [isHovering, setIsHovering] = useState(false);
  const isMe = node.sender.id === "guest";
  const allignment = isMe ? "flex-end" : "flex-start";
  const bottomRightRadius = isMe ? 0 : 32;
  const topLeftRadius = isMe ? 32 : 0;
  const { mutate: deleteMessage, status: deleteMessageStatus } =
    useDeleteMessage(node.channel_id, node.message_id);
  const { onCopy, setValue, hasCopied } = useClipboard(node.content);
  // this is needed for copy-to-clipboard
  useEffect(() => {
    setValue(node.content);
  }, [node.content]);
  const toast = useToast({
    position: "top",
  });
  const onCopyButtonClicked = () => {
    onCopy();
    toast({
      description: `"${node.content}" has been copied to the clipboard!`,
      status: "success",
    });
  };

  useEffect(() => {
    if (deleteMessageStatus === "success") {
      toast({
        description: `A message has been deleted!`,
        status: deleteMessageStatus,
      });
    } else if (deleteMessageStatus === "error") {
      toast({
        description: `Failed to delete the message.`,
        status: deleteMessageStatus,
      });
    }
  }, [deleteMessageStatus]);

  const othersBubbleName = (
    <HStack>
      <Tooltip label={node.sender.id}>
        <Avatar size={"sm"} name={node.sender.name}></Avatar>
      </Tooltip>
      <Text ml={6} fontSize={"small"}>
        {node.sender.name}
      </Text>
    </HStack>
  );

  const messageTime = (
    <Text fontSize={"xs"} color={"gray"}>
      <Moment local format="LT">
        {node.created_at}
      </Moment>
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
      />
    </Tooltip>
  );

  return (
    <VStack mt={6} alignItems={allignment} alignSelf={allignment}>
      {!isMe && othersBubbleName}
      <HStack
        alignItems={isHovering ? "center" : "flex-end"}
        onMouseLeave={() => setIsHovering(false)}
      >
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
        <Box
          bg={isMe ? "blue.50" : "gray.100"}
          px={4}
          py={2}
          maxW={80}
          minH={"40px"}
          borderTopLeftRadius={topLeftRadius}
          borderTopRightRadius={32}
          borderBottomLeftRadius={32}
          borderBottomRightRadius={bottomRightRadius}
          _hover={{ bg: isMe ? "blue.300" : "gray.400" }}
          onMouseEnter={() => setIsHovering(true)}
        >
          {node.message_type === "text" ? (
            node.content
          ) : (
            <Image
              src={`https://alpha-api.cloudchat.dev${node.attachment_filenames.url}`}
              alt={node.attachment_filenames.name}
              onClick={onModalOpen}
              fallback={<Spinner />}
            />
          )}
        </Box>
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
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        onModalOpen={onModalOpen}
      />
    </VStack>
  );
}

export default ChatBubble;

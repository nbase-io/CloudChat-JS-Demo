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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { FaReply, FaCopy, FaTrashAlt, FaCheck } from "react-icons/fa";
import Moment from "react-moment";
import { useDeleteMessage } from "../../api";

type Props = {
  node: any;
};

function ChatBubble({ node }: Props) {
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
  const { mutate: deleteMessage } = useDeleteMessage(
    node.channel_id,
    node.message_id
  );
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
    });
  };

  return (
    <VStack mt={6} alignItems={allignment} alignSelf={allignment}>
      {!isMe && (
        <HStack>
          <Tooltip label={node.sender.id}>
            <Avatar size={"sm"} name={node.sender.name}></Avatar>
          </Tooltip>
          <Text ml={6} fontSize={"small"}>
            {node.sender.name}
          </Text>
        </HStack>
      )}
      <HStack
        alignItems={isHovering ? "center" : "flex-end"}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isMe &&
          (isHovering ? (
            <HStack>
              <Tooltip label={"Delete"}>
                <IconButton
                  aria-label="Delete Message"
                  variant={"ghost"}
                  icon={<FaTrashAlt />}
                  size={"sm"}
                  onClick={() => deleteMessage()}
                />
              </Tooltip>
              {node.message_type === "text" && (
                <Tooltip label={"Copy"}>
                  <IconButton
                    aria-label="Copy Message"
                    variant={"ghost"}
                    icon={hasCopied ? <FaCheck /> : <FaCopy />}
                    size={"sm"}
                    onClick={onCopyButtonClicked}
                  />
                </Tooltip>
              )}
              <Tooltip label={"Reply"}>
                <IconButton
                  aria-label="Reply Message"
                  variant={"ghost"}
                  icon={<FaReply />}
                  size={"sm"}
                />
              </Tooltip>
            </HStack>
          ) : (
            <Text fontSize={"xs"} color={"gray"}>
              <Moment local format="LT">
                {node.created_at}
              </Moment>
            </Text>
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
            <HStack>
              <Tooltip label={"Reply"}>
                <IconButton
                  aria-label="Reply Message"
                  variant={"ghost"}
                  icon={<FaReply />}
                  size={"sm"}
                />
              </Tooltip>
              {node.message_type === "text" && (
                <Tooltip label={"Copy"}>
                  <IconButton
                    aria-label="Copy Message"
                    variant={"ghost"}
                    icon={hasCopied ? <FaCheck /> : <FaCopy />}
                    size={"sm"}
                    onClick={onCopyButtonClicked}
                  />
                </Tooltip>
              )}
            </HStack>
          ) : (
            <Text fontSize={"xs"} color={"gray"}>
              <Moment local format="LT">
                {node.created_at}
              </Moment>
            </Text>
          ))}
      </HStack>
      <Modal
        onClose={onModalClose}
        size={"full"}
        isOpen={isModalOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={"blackAlpha.800"}>
          <ModalHeader color={"white"}>
            {node.attachment_filenames.name}
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            onClick={onModalClose}
          >
            <Image
              src={`https://alpha-api.cloudchat.dev${node.attachment_filenames.url}`}
              alt={node.attachment_filenames.name}
              onClick={onModalOpen}
              fallback={<Spinner />}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default ChatBubble;

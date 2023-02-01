import { useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaImage, FaReply, FaCopy, FaTrashAlt } from "react-icons/fa";

type Props = {
  message: string;
  dateSent: string;
  from: string;
};

function ChatBubble({ message, dateSent, from }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const isMe = from === "me";
  const allignment = isMe ? "flex-end" : "flex-start";
  const bottomRightRadius = isMe ? 0 : 32;
  const topLeftRadius = isMe ? 32 : 0;

  return (
    <VStack mt={6} alignItems={allignment} alignSelf={allignment}>
      {!isMe && (
        <HStack>
          <Avatar size={"sm"} name={from}></Avatar>
          <Text ml={6} fontSize={"small"}>
            {from}
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
              <Tooltip label={"삭제"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Delete Message"
                  variant={"ghost"}
                  icon={<FaTrashAlt />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"복사"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Copy Message"
                  variant={"ghost"}
                  icon={<FaCopy />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"답장"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Reply Message"
                  variant={"ghost"}
                  icon={<FaReply />}
                  size={"sm"}
                />
              </Tooltip>
            </HStack>
          ) : (
            <Text fontSize={"xs"} color={"gray"}>
              {dateSent}
            </Text>
          ))}
        <Box
          bg={isMe ? "blue.50" : "gray.100"}
          px={6}
          py={4}
          maxW={80}
          borderTopLeftRadius={topLeftRadius}
          borderTopRightRadius={32}
          borderBottomLeftRadius={32}
          borderBottomRightRadius={bottomRightRadius}
          _hover={{ bg: isMe ? "blue.300" : "gray.400" }}
          onMouseEnter={() => setIsHovering(true)}
        >
          {message}
        </Box>
        {!isMe &&
          (isHovering ? (
            <HStack>
              <Tooltip label={"답장"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Reply Message"
                  variant={"ghost"}
                  icon={<FaReply />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"복사"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Copy Message"
                  variant={"ghost"}
                  icon={<FaCopy />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"삭제"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Delete Message"
                  variant={"ghost"}
                  icon={<FaTrashAlt />}
                  size={"sm"}
                />
              </Tooltip>
            </HStack>
          ) : (
            <Text fontSize={"xs"} color={"gray"}>
              {dateSent}
            </Text>
          ))}
      </HStack>
    </VStack>
  );
}

export default ChatBubble;

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
import { FaReply, FaCopy, FaTrashAlt } from "react-icons/fa";
import Moment from "react-moment";

type Props = {
  message: string;
  created_at: string;
  from: string;
};

function ChatBubble({ message, created_at, from }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const isMe = from === "guest";
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
              <Tooltip label={"Delete"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Delete Message"
                  variant={"ghost"}
                  icon={<FaTrashAlt />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"Copy"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Copy Message"
                  variant={"ghost"}
                  icon={<FaCopy />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"Reply"}>
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
              {created_at}
            </Text>
          ))}
        <Box
          bg={isMe ? "blue.50" : "gray.100"}
          px={6}
          py={2}
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
              <Tooltip label={"Reply"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Reply Message"
                  variant={"ghost"}
                  icon={<FaReply />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"Copy"}>
                <IconButton
                  colorScheme={"black"}
                  aria-label="Copy Message"
                  variant={"ghost"}
                  icon={<FaCopy />}
                  size={"sm"}
                />
              </Tooltip>
              <Tooltip label={"Delete"}>
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
              <Moment local>{created_at}</Moment>
            </Text>
          ))}
      </HStack>
    </VStack>
  );
}

export default ChatBubble;

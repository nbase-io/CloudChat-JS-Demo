import { Box, VStack, Text, HStack, Avatar } from "@chakra-ui/react";

type Props = {
  message: string;
  dateSent: string;
  from: string;
};

function ChatBubble({ message, dateSent, from }: Props) {
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
      <Box
        bg={isMe ? "blue.50" : "gray.100"}
        px={6}
        py={4}
        maxW={80}
        borderTopLeftRadius={topLeftRadius}
        borderTopRightRadius={32}
        borderBottomLeftRadius={32}
        borderBottomRightRadius={bottomRightRadius}
      >
        {message}
      </Box>
      <Text fontSize={"xs"} color={"gray"}>
        {dateSent}
      </Text>
    </VStack>
  );
}

export default ChatBubble;

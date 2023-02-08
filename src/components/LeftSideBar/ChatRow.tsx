import { Avatar, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Moment from "react-moment";

type Props = {
  channelName: string;
  channelProfile: string;
  lastMessageUpdatedAt: string;
  lastMessageContent: string;
};

function ChatRow({
  channelName,
  channelProfile,
  lastMessageUpdatedAt,
  lastMessageContent,
}: Props) {
  return (
    <Flex
      py={4}
      px={8}
      w="full"
      alignItems={"center"}
      borderBottomColor="gray.100"
      borderBottomWidth={1}
      style={{ transition: "background 300ms" }}
      _hover={{ bg: "gray.50", cursor: "pointer" }}
    >
      <Avatar name={channelName} src={channelProfile} />
      <VStack
        overflow={"hidden"}
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading fontSize={12} w="full">
          {channelName}
        </Heading>
        <Text
          overflow={"hidden"}
          textOverflow="ellipsis"
          whiteSpace={"nowrap"}
          w="full"
          fontSize={"xs"}
          color="gray.500"
        >
          {lastMessageContent}
        </Text>
      </VStack>
      <VStack justifyContent={"center"} alignItems="center">
        <Text ml={3} fontSize="xs" color={"gray.500"} w="full">
          <Moment fromNow local>
            {lastMessageUpdatedAt}
          </Moment>
        </Text>
        <Text
          fontSize={"xs"}
          color={"white"}
          as="b"
          bg={"red"}
          px={1}
          rounded="full"
        >
          300+
        </Text>
      </VStack>
    </Flex>
  );
}

export default ChatRow;

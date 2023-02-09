import { Avatar, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Moment from "react-moment";
import { useCountUnread } from "../../api";
import { FaLock } from "react-icons/fa";

type Props = {
  channel: any;
};

function ChatRow({ channel }: Props) {
  // const { data: mark, isLoading } = useCountUnread(!!channel, channel.id);

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
      <Avatar name={channel.name} src={channel.image_url} />
      <VStack
        overflow={"hidden"}
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <HStack spacing={1}>
          <Heading fontSize={12} w="full">
            {channel.name}
          </Heading>
          {channel.type === "PRIVATE" && <FaLock size={"10"} />}
        </HStack>
        <Text
          overflow={"hidden"}
          textOverflow="ellipsis"
          whiteSpace={"nowrap"}
          w="full"
          fontSize={"xs"}
          color="gray.500"
        >
          {channel.last_message && channel.last_message.content}
        </Text>
      </VStack>
      <VStack justifyContent={"center"} alignItems="center">
        <Text ml={3} fontSize="xs" color={"gray.500"} w="full">
          {channel.last_message && (
            <Moment fromNow local>
              {channel.last_message.created_at}
            </Moment>
          )}
        </Text>
        {/* {mark && (
          <Text
            fontSize={"xs"}
            color={"white"}
            as="b"
            bg={"red"}
            px={1}
            rounded="full"
          >
            {mark.unread}
          </Text>
        )} */}
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

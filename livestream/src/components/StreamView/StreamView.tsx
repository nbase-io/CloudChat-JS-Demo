import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import UserAvatar from "../UserAvatar/UserAvatar";
import { AiOutlineEye } from "react-icons/ai";
import { useGlobal } from "../Root";

type Props = {
  subscriptions: any;
  subscription: any;
};

function StreamView({ subscriptions, subscription }: Props) {
  const { user } = useGlobal();
  return (
    <VStack w="full" spacing={0}>
      <HStack
        bg="gray.800"
        h={"64px"}
        px={6}
        w="full"
        justifyContent={"space-between"}
      >
        <HStack h={"64px"}>
          <Heading size="md" color={"white"}>
            {subscription?.channel.name}
          </Heading>
          <Text
            color={"white"}
            fontSize="xs"
            as="b"
            bg="red"
            px={2}
            rounded="full"
          >
            LIVE
          </Text>
        </HStack>
        <HStack spacing={6} color="white">
          <UserAvatar user={user} color="white" />
          <HStack spacing={1}>
            <AiOutlineEye />
            <Text fontSize={"sm"}>{subscriptions?.edges.length}</Text>
          </HStack>
        </HStack>
      </HStack>
      <VStack justifyContent={"center"} h="100%" w="full" bg="black">
        <ReactPlayer
          url="https://ssl.pstatic.net/static/ncp/ndk/s/img/temp_video.mp4"
          width="100%"
          height="100%"
          playing
        />
      </VStack>
    </VStack>
  );
}

export default StreamView;

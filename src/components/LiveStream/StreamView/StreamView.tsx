import { Box, Center, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useConnect } from "../../../api";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { AiOutlineEye } from "react-icons/ai";

function StreamView() {
  //   const { data: user } = useConnect();

  return (
    <VStack w="full" spacing={0}>
      <HStack
        bg="gray.800"
        h={"16"}
        px={6}
        w="full"
        justifyContent={"space-between"}
      >
        <HStack>
          <Heading size="md" color={"white"}>
            Battle ground final match live stream
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
            <Text fontSize={"sm"}>14</Text>
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

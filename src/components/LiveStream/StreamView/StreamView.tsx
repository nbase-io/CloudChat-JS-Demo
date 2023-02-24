import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { AiOutlineEye } from "react-icons/ai";
import { useUser } from "../../Root";

function StreamView() {
  const { user } = useUser();
  return (
    <VStack w="full" spacing={0}>
      <HStack
        bg="gray.800"
        h={"64px"}
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
          {/* <Tooltip label={"Channel information"}>
            <IconButton
              rounded={"full"}
              onClick={onChatDetailOpen}
              display={{ base: "inherit", lg: "none" }}
              variant="ghost"
              icon={<IoMdInformationCircleOutline />}
              size="lg"
              aria-label="Toggle Chat Detail Drawer"
            />
          </Tooltip> */}
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

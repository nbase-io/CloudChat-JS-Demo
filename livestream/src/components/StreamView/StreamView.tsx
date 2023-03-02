import {
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import UserAvatar from "../UserAvatar/UserAvatar";
import { AiOutlineEye } from "react-icons/ai";
import { useGlobal } from "../Root";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

type Props = {
  subscriptions: any;
  subscription: any;
  isChatOpen: boolean;
  onChatOpen: any;
};

function StreamView({
  subscriptions,
  subscription,
  isChatOpen,
  onChatOpen,
}: Props) {
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
          <Heading
            size="md"
            color={"white"}
            fontSize={{ base: "xs", md: "md", lg: "lg" }}
          >
            {subscription?.channel.name}
          </Heading>
          <Text
            color={"white"}
            fontSize="2xs"
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
            <Text fontSize={{ base: "xs", lg: "sm" }}>
              {subscriptions?.totalCount}
            </Text>
          </HStack>
          <Tooltip label="Expand Chat">
            <IconButton
              icon={<TbLayoutSidebarLeftExpand />}
              variant={"ghost"}
              aria-label={"Expand Chat"}
              size="lg"
              _hover={{ bgColor: "gray.700" }}
              onClick={onChatOpen}
              hidden={isChatOpen}
            />
          </Tooltip>
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

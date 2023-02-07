import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  InputGroup,
  List,
  ListItem,
  VStack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import ChatRow from "./ChatRow";
import UserAvatar from "../UserAvatar/UserAvatar";
import { GrAdd } from "react-icons/gr";

type Props = {
  isConnecting: boolean;
  user: any;
  isGettingFriendships: boolean;
  isGettingChannels: boolean;
  friendships: any;
  channels: any;
  setChannel: (value: any) => void;
};

function LeftSideBar({
  isConnecting,
  user,
  isGettingFriendships,
  isGettingChannels,
  channels,
  friendships,
  setChannel,
}: Props) {
  return (
    <VStack h="full" alignItems={"center"} w="full" spacing={6}>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={"column"}
        py={8}
      >
        <Avatar name={user?.name} size="2xl" src={user?.profile}>
          <AvatarBadge bg="green.400" boxSize={8} borderWidth={4} />
        </Avatar>
        {!isConnecting && (
          <Heading size="md" mt={3}>
            {user?.name}
          </Heading>
        )}
      </Flex>
      <HStack px={8} w="full" justifyContent={"space-between"}>
        <Heading size="sm">온라인 친구들</Heading>
        {!isGettingFriendships && (
          <Text fontSize={"sm"} color="gray.500" fontWeight={"semibold"}>
            {friendships?.length}
          </Text>
        )}
      </HStack>
      <HStack
        overflowX={"auto"}
        minH={24}
        px={8}
        w="full"
        justifyContent={"flex-start"}
        spacing={3}
      >
        {friendships &&
          friendships.map((friend: any) => (
            <UserAvatar name={friend.friend.name} key={friend.friend.id} />
          ))}
      </HStack>
      <Box px={8} w="full">
        <Divider />
      </Box>
      <Box
        w="full"
        px={8}
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Heading fontSize="xl">채널</Heading>
        <Tooltip label={"채널 생성"}>
          <IconButton
            rounded={"full"}
            variant="ghost"
            icon={<GrAdd />}
            size="md"
            aria-label="Add Channel"
          />
        </Tooltip>
      </Box>
      <InputGroup size={"md"} px={8}>
        <Input
          placeholder="이름 검색"
          mt={2}
          variant="filled"
          w="full"
          minH={10}
        />
      </InputGroup>
      <Box w="full" overflow={"auto"}>
        <List w="full" spacing={0}>
          {!isGettingChannels &&
            channels?.map((channel: any) => (
              <ListItem
                key={channel.id}
                onClick={() => {
                  setChannel(channel);
                }}
              >
                <ChatRow
                  channelName={channel.name}
                  channelProfile={channel.image_url}
                  lastMessageUpdatedAt={channel.updated_at}
                  lastMessageContent={channel.last_message.content}
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </VStack>
  );
}

export default LeftSideBar;

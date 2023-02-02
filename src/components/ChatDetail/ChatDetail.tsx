import {
  Flex,
  HStack,
  Text,
  IconButton,
  Avatar,
  Heading,
  Divider,
  Box,
  VStack,
  Button,
  ListItem,
  List,
  Tooltip,
} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import { RiNotificationBadgeFill, RiLockFill } from "react-icons/ri";
import ChatFile from "./ChatFile";
import ChatLink from "./ChatLink";
import UserAvatar from "../UserAvatar/UserAvatar";

const channelMembers = ["Asher Hong", "Shinbae Kong", "Han Kim"];

function ChatDetail() {
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <HStack justify={"space-between"} w="full" px={8} mb={8}>
        <Tooltip label={"채널 생성일"}>
          <Text color="gray.500">20 March 2021</Text>
        </Tooltip>
        <HStack>
          <Tooltip label={"비공개"}>
            <IconButton
              rounded={"full"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              icon={<RiLockFill />}
              aria-label="Private Channel"
            />
          </Tooltip>
          <Tooltip label={"푸시 허용"}>
            <IconButton
              rounded={"full"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              icon={<RiNotificationBadgeFill />}
              aria-label="Push Notifications"
            />
          </Tooltip>
          <Tooltip label={"알림 허용"}>
            <IconButton
              rounded={"full"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              icon={<FaBell />}
              aria-label="Notifications"
            />
          </Tooltip>
          <Tooltip label={"검색"}>
            <IconButton
              rounded={"full"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              icon={<FaSearch />}
              aria-label="Search"
            />
          </Tooltip>
        </HStack>
      </HStack>
      <Avatar size="2xl" name="nbase"></Avatar>
      <Heading size={"md"} mt={3}>
        nbase
      </Heading>
      <HStack px={8} w="full" justifyContent={"space-between"} mt={6}>
        <Heading size={"s"}>채팅 맴버들</Heading>
        <Text fontSize={"s"} color="gray.500" fontWeight={"semibold"}>
          {channelMembers.length}
        </Text>
      </HStack>
      <HStack
        overflowX={"auto"}
        minH={24}
        px={8}
        w="full"
        justifyContent={"flex-start"}
        spacing={3}
      >
        {channelMembers.map((friend) => (
          <UserAvatar name={friend} key={friend} />
        ))}
      </HStack>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
      <VStack spacing={6} overflowY="auto" w="full">
        <HStack px={8} w="full" mt={6} justifyContent="space-between">
          <Heading size="md">공유된 이미지들</Heading>
          <Button
            fontWeight={"normal"}
            variant={"text"}
            size="xs"
            color={"blue"}
          >
            모두 보기
          </Button>
        </HStack>
        <List spacing={4} mt={6} w="full">
          <ListItem>
            <ChatFile />
          </ListItem>
          <ListItem>
            <ChatFile />
          </ListItem>
          <ListItem>
            <ChatFile />
          </ListItem>
          <ListItem>
            <ChatFile />
          </ListItem>
        </List>
        <Box px={8} w="full">
          <Divider mt={6} color="gray.100" />
        </Box>
        <HStack px={8} w="full" mt={6} justifyContent="space-between">
          <Heading size="md">공유된 링크들</Heading>
          <Button
            fontWeight={"normal"}
            variant={"text"}
            size="xs"
            color={"blue"}
          >
            모두 보기
          </Button>
        </HStack>
        <List spacing={4} mt={6} w="full">
          <ListItem>
            <ChatLink />
          </ListItem>
          <ListItem>
            <ChatLink />
          </ListItem>
          <ListItem>
            <ChatLink />
          </ListItem>
        </List>
      </VStack>
    </Flex>
  );
}

export default ChatDetail;

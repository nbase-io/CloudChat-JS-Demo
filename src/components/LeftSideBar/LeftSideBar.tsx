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

const onlineFriends = [
  "Jenny",
  "Rose",
  "Jisoo",
  "Asher Hong",
  "Shinbae Kong",
  "Lisa",
  "IU",
];

function LeftSideBar() {
  return (
    <VStack h="full" alignItems={"center"} w="full" spacing={6}>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={"column"}
        py={8}
      >
        <Avatar name={"guest"} size="2xl">
          <AvatarBadge bg="green.400" boxSize={8} borderWidth={4} />
        </Avatar>
        <VStack>
          <Heading size="md" mt={3}>
            Guest
          </Heading>
        </VStack>
      </Flex>
      <HStack px={8} w="full" justifyContent={"space-between"}>
        <Heading size="sm">온라인 친구들</Heading>
        <Text fontSize={"sm"} color="gray.500" fontWeight={"semibold"}>
          {onlineFriends.length}
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
        {onlineFriends.map((friend) => (
          <UserAvatar name={friend} key={friend} />
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
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
          <ListItem>
            <ChatRow />
          </ListItem>
        </List>
      </Box>
    </VStack>
  );
}

export default LeftSideBar;

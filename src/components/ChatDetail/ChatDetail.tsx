import {
  Flex,
  HStack,
  Text,
  Avatar,
  Heading,
  Divider,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChatDetailHeader from "./ChatDetailHeader";

type Props = {
  channel: any;
};

function ChatDetail({ channel }: Props) {
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <ChatDetailHeader channel={channel} />
      <Avatar size="xl" name={channel?.name} src={channel?.image_url}></Avatar>
      <Heading size={"md"} mt={3}>
        {channel?.name}
      </Heading>
      <Accordion w="full" px={8} mt={12} allowToggle>
        <AccordionItem border={"none"}>
          <AccordionButton bg="gray.100" borderRadius={4}>
            <HStack spacing={0} flex={1}>
              <Text as="b">참석 중&nbsp;</Text>
              <Text fontSize={"s"} color="blue.500">
                {channel?.members.length}
              </Text>
              <Text as="b">명</Text>
            </HStack>
            <Box
              // size={"xs"}
              bg="black"
              color="white"
              mr="3"
              fontWeight={"bold"}
              fontSize={"xs"}
              px={2}
              py={1}
              borderRadius={4}
              _hover={{ bg: "gray" }}
              onClick={(e) => e.stopPropagation()}
            >
              초대하기
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <HStack
              overflowX={"auto"}
              minH={channel?.members.length === 0 ? 0 : 24}
              px={8}
              w="full"
              justifyContent={"flex-start"}
              spacing={3}
            >
              {channel?.members.map((member: string) => (
                <UserAvatar name={member} key={member} />
              ))}
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default ChatDetail;

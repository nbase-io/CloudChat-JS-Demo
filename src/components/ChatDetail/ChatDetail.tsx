import {
  Flex,
  HStack,
  Text,
  Avatar,
  Heading,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  VStack,
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
              <Text fontSize={"s"} color="blue.500">
                {channel?.members.length}&nbsp;
              </Text>
              <Text as="b">Members</Text>
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
              Invite
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <VStack
              overflowY={"auto"}
              minH={channel?.members.length === 0 ? 0 : 24}
              py={8}
              px={8}
              w="full"
              justifyContent={"flex-start"}
              spacing={3}
            >
              {channel?.members.map((member: string) => (
                <UserAvatar name={member} key={member} />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default ChatDetail;

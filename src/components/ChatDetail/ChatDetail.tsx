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
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { useGetSubscriptions } from "../../api";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChatDetailHeader from "./ChatDetailHeader";

type Props = {
  channel: any;
  subscription: any;
  setChannel: any;
};

function ChatDetail({ channel, subscription, setChannel }: Props) {
  // getSubscriptions after subscribe
  const { data: subscriptions } = useGetSubscriptions(
    !!subscription,
    channel?.id
  );

  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <ChatDetailHeader channel={channel} setChannel={setChannel} />
      <Avatar size="xl" name={channel?.name} src={channel?.image_url}></Avatar>
      <Heading size={"md"} mt={3}>
        {channel?.name}
      </Heading>
      <Accordion w="full" px={8} mt={12} allowToggle>
        <AccordionItem border={"none"}>
          <AccordionButton bg="gray.100" borderRadius={4}>
            <HStack spacing={1} flex={1}>
              {!subscriptions && <Skeleton>&nsbp;</Skeleton>}
              <Text fontSize={"s"} color="blue.500">
                {subscriptions?.edges?.length}
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
              // minH={subscriptions?.length === 0 ? 0 : 24}
              py={2}
              w="full"
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              spacing={3}
            >
              {subscriptions?.edges?.map((edge: any) => (
                <UserAvatar
                  user={edge.node.user}
                  key={edge.node.user_id}
                  userId={edge.node.user_id}
                  online={edge.node.online}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default ChatDetail;

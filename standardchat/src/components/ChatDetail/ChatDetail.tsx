import { Flex, Box, Text, Avatar, Heading } from "@chakra-ui/react";
import { useGetSubscriptions } from "../../api";
import { useGlobal } from "../Root";
import UserAvatar from "../UserAvatar/UserAvatar";
import ChatDetailHeader from "./ChatDetailHeader";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  channel: any;
  subscription: any;
  setChannel: any;
};

function ChatDetail({ channel, subscription, setChannel }: Props) {
  const { user } = useGlobal();
  // getSubscriptions after subscribe
  const {
    data: subscriptions,
    fetchNextPage,
    hasNextPage,
  } = useGetSubscriptions(!!subscription, channel?.id);
  const isPrivate = channel.type === "PRIVATE";
  const isAdmin = channel.user?.id === user!.id;

  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <ChatDetailHeader channel={channel} setChannel={setChannel} />
      <Avatar
        size={{ base: "md", md: "lg", lg: "xl" }}
        name={channel?.name}
        src={channel?.image_url}
      ></Avatar>
      <Heading size={"md"} mt={3}>
        {channel?.name}
      </Heading>
      {subscriptions && (
        <Text fontSize="sm" color="gray.500" mt="1" mb="4">
          {subscriptions?.pages[0]?.totalCount} Members
        </Text>
      )}
      <Flex
        px={6}
        overflowY="auto"
        flexDirection={"column"}
        pb={4}
        id="scrollableSubscriptionDiv"
        w="full"
        // justifyContent={"flex-start"}
        // alignItems={"flex-start"}
        fontSize={{ base: "xs", sm: "sm", md: "md" }}
      >
        <InfiniteScroll
          dataLength={subscriptions?.pages?.length! * 25 || 0}
          next={fetchNextPage}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          hasMore={hasNextPage || false}
          scrollableTarget="scrollableSubscriptionDiv"
          loader={"Loading more..."}
        >
          {subscriptions?.pages?.map((page: any) =>
            page.edges.map((edge: any) => (
              <Box key={edge.node.user_id} mt="2">
                <UserAvatar user={edge.node.user} />
              </Box>
            ))
          )}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
}

export default ChatDetail;

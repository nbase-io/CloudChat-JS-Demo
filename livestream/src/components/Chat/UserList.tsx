import { HStack, VStack, Text, CloseButton, Flex, Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserAvatar from "../UserAvatar/UserAvatar";

type Props = {
  onClose: any;
  subscriptions: any;
  fetchNextPage: any;
  hasNextPage: boolean | undefined;
};

function UserList({
  onClose,
  subscriptions,
  fetchNextPage,
  hasNextPage,
}: Props) {
  const userListHeader = (
    <HStack w="full" justifyContent={"space-between"} h={"64px"} px={2} pt={4}>
      <HStack spacing={1} ml="3">
        <Text as="b" color="blue.400">
          {subscriptions.pages[0].totalCount}
        </Text>
        <Text>people watching</Text>
      </HStack>
      <CloseButton onClick={onClose} />
    </HStack>
  );

  return (
    <VStack bg="gray.900" w="full" color="white">
      {userListHeader}
      {/* <VStack
        w="full"
        overflowY={"auto"}
        py={2}
        px={4}
        alignItems={"flex-start"}
        spacing={3}
      >
        {subscriptions?.edges?.map((edge: any, index: number) => (
          <UserAvatar
            user={edge.node.user}
            key={edge.node.user_id}
            online={edge.node.online}
            color="white"
          />
        ))}
      </VStack> */}
      <Flex
        px={6}
        overflowY="auto"
        flexDirection={"column"}
        pb={4}
        id="scrollableSubscriptionDiv"
        w="full"
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
                <UserAvatar
                  user={edge.node.user}
                  online={edge.node.online}
                  color="white"
                />
              </Box>
            ))
          )}
        </InfiniteScroll>
      </Flex>
    </VStack>
  );
}

export default UserList;

import { HStack, VStack, Text, CloseButton } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar/UserAvatar";

type Props = {
  onClose: any;
  subscriptions: any;
};

function UserList({ onClose, subscriptions }: Props) {
  return (
    <VStack bg="gray.900" w="full" color="white">
      <HStack
        w="full"
        justifyContent={"space-between"}
        h={"64px"}
        px={2}
        pt={4}
      >
        <HStack spacing={1} ml="3">
          <Text as="b" color="blue.400">
            {subscriptions.totalCount}
          </Text>
          <Text>people watching</Text>
        </HStack>
        <CloseButton onClick={onClose} />
      </HStack>
      <VStack
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
      </VStack>
    </VStack>
  );
}

export default UserList;

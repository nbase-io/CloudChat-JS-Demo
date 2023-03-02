import { Avatar, AvatarBadge, HStack, Tooltip, Text } from "@chakra-ui/react";

type Props = {
  user: any;
  online?: boolean;
  color?: string;
};

function UserAvatar({ user, online = false, color = "black" }: Props) {
  return (
    <HStack>
      <Tooltip label={user?.id}>
        <Avatar name={user?.name} size="sm" src={user.profile}>
          {online && <AvatarBadge boxSize={3} bg="green.500" />}
        </Avatar>
      </Tooltip>
      <Text as="b" color={color} fontSize={{ base: "xs", md: "md", lg: "lg" }}>
        {user?.name}
      </Text>
    </HStack>
  );
}

export default UserAvatar;

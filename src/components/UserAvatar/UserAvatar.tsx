import { Avatar, AvatarBadge, HStack, Tooltip, Text } from "@chakra-ui/react";
import { IUser } from "../../lib/interfaces/IUser";

type Props = {
  user: IUser;
  userId: string;
  online: boolean;
};

function UserAvatar({ user, userId, online }: Props) {
  return (
    <HStack>
      <Tooltip label={userId}>
        <Avatar name={user.name} _hover={{ borderWidth: 1 }} size="sm">
          {online && <AvatarBadge boxSize={3} bg="green.500" />}
        </Avatar>
      </Tooltip>
      <Text as="b">{user.name}</Text>
    </HStack>
  );
}

export default UserAvatar;

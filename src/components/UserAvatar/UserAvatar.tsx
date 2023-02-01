import { Avatar, AvatarBadge, Tooltip } from "@chakra-ui/react";

type Props = {
  name: string;
};

function UserAvatar({ name }: Props) {
  return (
    <Tooltip label={name}>
      <Avatar name={name} _hover={{ borderWidth: 1 }}>
        <AvatarBadge boxSize={4} bg="green.500" />
      </Avatar>
    </Tooltip>
  );
}

export default UserAvatar;

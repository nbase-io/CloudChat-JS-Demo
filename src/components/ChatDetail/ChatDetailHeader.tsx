import { HStack, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { TbSearch, TbX, TbSettings } from "react-icons/tb";

type Props = {
  channel: any;
};

function ChatDetailHeader({ channel }: Props) {
  return (
    <HStack justify={"space-between"} w="full" px={8} mb={8}>
      <Text fontSize={"xl"} as="b">
        채팅방 정보
      </Text>
      <HStack>
        <Tooltip label={"검색"}>
          <IconButton
            rounded={"full"}
            variant="ghost"
            icon={<TbSearch />}
            size="lg"
            aria-label="Search"
          />
        </Tooltip>
        <Tooltip label={"설정"}>
          <IconButton
            rounded={"full"}
            variant="ghost"
            icon={<TbSettings />}
            size="lg"
            aria-label="Settings"
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
}

export default ChatDetailHeader;

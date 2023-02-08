import { HStack, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { TbSearch, TbX, TbSettings } from "react-icons/tb";

type Props = {
  channel: any;
};

function ChatDetailHeader({ channel }: Props) {
  return (
    <HStack justify={"space-between"} w="full" px={8} mb={8}>
      <Text fontSize={"xl"} as="b">
        Channel Info.
      </Text>
      <HStack>
        <Tooltip label={"Search"}>
          <IconButton
            rounded={"full"}
            variant="ghost"
            icon={<TbSearch />}
            size="lg"
            aria-label="Search"
          />
        </Tooltip>
        <Tooltip label={"Settings"}>
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

import {
  HStack,
  IconButton,
  Tooltip,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TbSearch, TbX, TbSettings } from "react-icons/tb";
import EditChannelModal from "../Modal/EditChannelModal";

type Props = {
  channel: any;
  setChannel: any;
};

function ChatDetailHeader({ channel, setChannel }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

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
            onClick={onOpen}
          />
        </Tooltip>
      </HStack>
      <EditChannelModal
        isOpen={isOpen}
        onClose={onClose}
        channel={channel}
        setChannel={setChannel}
      />
    </HStack>
  );
}

export default ChatDetailHeader;

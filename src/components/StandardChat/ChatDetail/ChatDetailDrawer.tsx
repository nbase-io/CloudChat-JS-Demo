import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import ChatDetail from "./ChatDetail";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel: any;
  subscription: any;
};

function ChatDetailDrawer({ isOpen, onClose, channel, subscription }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatDetail channel={channel} subscription={subscription} />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChatDetailDrawer;
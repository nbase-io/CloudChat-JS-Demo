import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Chat from "./Chat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  subscription: any;
  subscriptions: any;
};

function ChatDrawer({ isOpen, onClose, subscription, subscriptions }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <Chat subscription={subscription} subscriptions={subscriptions} />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChatDrawer;

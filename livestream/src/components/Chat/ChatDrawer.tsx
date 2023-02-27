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
  isDarkMode: boolean;
};

function ChatDrawer({ isOpen, onClose, subscription, isDarkMode }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <Chat subscription={subscription} isDarkMode={isDarkMode} />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChatDrawer;

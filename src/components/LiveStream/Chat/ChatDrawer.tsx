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
};

function ChatDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <Chat />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChatDrawer;

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
};

function ChatDetailDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <ChatDetail />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ChatDetailDrawer;

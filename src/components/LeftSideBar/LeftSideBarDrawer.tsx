import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import LeftSideBar from "./LeftSideBar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function LeftSideBarDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <LeftSideBar />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default LeftSideBarDrawer;

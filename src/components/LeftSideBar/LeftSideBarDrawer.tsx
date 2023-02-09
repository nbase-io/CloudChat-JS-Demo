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
  isConnecting: boolean;
  user: any;
  // isGettingFriendships: boolean;
  isGettingChannels: boolean;
  // friendships: any;
  channels: any;
  setChannel: (value: any) => void;
};

function LeftSideBarDrawer({
  isOpen,
  onClose,
  isConnecting,
  user,
  // isGettingFriendships,
  isGettingChannels,
  channels,
  // friendships,
  setChannel,
}: Props) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <LeftSideBar
            isConnecting={isConnecting}
            user={user}
            // isGettingFriendships={isGettingFriendships}
            isGettingChannels={isGettingChannels}
            // friendships={friendships}
            channels={channels}
            setChannel={setChannel}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default LeftSideBarDrawer;

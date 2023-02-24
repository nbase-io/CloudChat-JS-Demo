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
  user: any;
  // isGettingFriendships: boolean;
  isGettingChannels: boolean;
  // friendships: any;
  channels: any;
  setChannel: (value: any) => void;
  subscription: any;
};

function LeftSideBarDrawer({
  isOpen,
  onClose,
  user,
  // isGettingFriendships,
  isGettingChannels,
  channels,
  // friendships,
  setChannel,
  subscription,
}: Props) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <LeftSideBar
            user={user}
            // isGettingFriendships={isGettingFriendships}
            isGettingChannels={isGettingChannels}
            // friendships={friendships}
            channels={channels}
            setChannel={setChannel}
            subscription={subscription}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default LeftSideBarDrawer;

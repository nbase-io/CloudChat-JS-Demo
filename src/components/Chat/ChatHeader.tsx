import { useEffect } from "react";
import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stat,
  StatNumber,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdInformationCircleOutline, IoMdMenu } from "react-icons/io";
import { MdOutlinePersonAddAlt, MdOutlinePersonRemove } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { SlOptions, SlSettings } from "react-icons/sl";
import { useDeleteChannel } from "../../api";
import { CustomToast } from "../Toast/CustomToast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
  channel: any;
  setChannel: any;
};

export const ChatHeader = ({
  onLeftSideBarOpen,
  onChatDetailOpen,
  channel,
  setChannel,
}: Props) => {
  const queryClient = useQueryClient();
  const { addToast } = CustomToast();
  const { mutate: deleteChannel, status: deleteChannelStatus } =
    useDeleteChannel(channel.id);
  const isAdmin = channel.user_id?.id === "guest";
  useEffect(() => {
    if (deleteChannelStatus === "success") {
      addToast({
        description: `A channel has been deleted!`,
        status: deleteChannelStatus,
      });
      setChannel(null);
      queryClient.refetchQueries(["channels"]);
    } else if (deleteChannelStatus === "error") {
      addToast({
        description: `Failed to delete the channel.`,
        status: deleteChannelStatus,
      });
    }
  }, [deleteChannelStatus]);

  const channelMenu = (
    <Menu>
      <Tooltip label={"Channel menu"}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SlOptions />}
          variant="ghost"
          rounded={"full"}
        />
      </Tooltip>
      <MenuList>
        <MenuGroup title="Member">
          <MenuItem icon={<MdOutlinePersonAddAlt />}>Add users</MenuItem>
          <MenuItem icon={<MdOutlinePersonRemove />}>Remove users</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Channel">
          <MenuItem icon={<RxExit />}>Leave</MenuItem>
          {isAdmin && <MenuItem icon={<SlSettings />}>Settings</MenuItem>}
          {isAdmin && (
            <MenuItem
              icon={<AiOutlineDelete />}
              color={"red"}
              onClick={() => deleteChannel()}
            >
              Delete
            </MenuItem>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
  return (
    <HStack px={4} py={4} borderBottomColor="gray.100">
      <Tooltip label={"Channels"}>
        <IconButton
          rounded={"full"}
          onClick={onLeftSideBarOpen}
          display={{ base: "inherit", lg: "none" }}
          variant="ghost"
          icon={<IoMdMenu />}
          size="lg"
          aria-label="Toggle Left Side Bar Drawer"
        />
      </Tooltip>
      <Stat mt={6}>
        <HStack>
          <Avatar size="md" name={channel?.name} src={channel?.image_url} />
          <StatNumber>{channel?.name}</StatNumber>
        </HStack>
      </Stat>
      <Tooltip label={"Channel information"}>
        <IconButton
          rounded={"full"}
          onClick={onChatDetailOpen}
          display={{ base: "inherit", lg: "none" }}
          variant="ghost"
          icon={<IoMdInformationCircleOutline />}
          size="lg"
          aria-label="Toggle Chat Detail Drawer"
        />
      </Tooltip>
      {channel && channelMenu}
    </HStack>
  );
};

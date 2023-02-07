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

type Props = {
  onLeftSideBarOpen: () => void;
  onChatDetailOpen: () => void;
  channel: any;
};

function ChatHeader({ onLeftSideBarOpen, onChatDetailOpen, channel }: Props) {
  return (
    <HStack px={4} py={4} borderBottomColor="gray.100">
      <Tooltip label={"채널 리스트"}>
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
      <Tooltip label={"채널 정보"}>
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
      <Menu>
        <Tooltip label={"채널 매뉴"}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<SlOptions />}
            variant="ghost"
            rounded={"full"}
          />
        </Tooltip>
        <MenuList>
          <MenuGroup title="맴버">
            <MenuItem icon={<MdOutlinePersonAddAlt />}>초대</MenuItem>
            <MenuItem icon={<MdOutlinePersonRemove />}>내보내기</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="채널">
            <MenuItem icon={<RxExit />}>나가기</MenuItem>
            <MenuItem icon={<SlSettings />}>설정</MenuItem>
            <MenuItem icon={<AiOutlineDelete />} color={"red"}>
              삭제
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export default ChatHeader;

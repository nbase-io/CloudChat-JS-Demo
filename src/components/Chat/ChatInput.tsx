import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";

type Props = {
  isBottom: boolean;
};

function ChatInput({ isBottom }: Props) {
  return (
    <Flex
      pl={4}
      py={2}
      borderTopColor="gray.100"
      borderTopWidth={isBottom ? 0 : 1}
    >
      <InputGroup>
        <InputLeftElement>
          <Tooltip label={"이모지"}>
            <IconButton
              colorScheme={"black"}
              aria-label="Send Image"
              variant={"ghost"}
              icon={<HiOutlineEmojiHappy />}
              ml={2}
            />
          </Tooltip>
        </InputLeftElement>
        <Input
          borderRadius={120}
          variant={"outline"}
          placeholder="입력 후 Enter 키를 누르세요"
        />
      </InputGroup>
      <Tooltip label={"이미지 및 영상 보내기"}>
        <IconButton
          colorScheme={"black"}
          aria-label="Send Image"
          variant={"ghost"}
          icon={<FaImage />}
          ml={2}
        />
      </Tooltip>
      <Tooltip label={"메세지 보내기"}>
        <IconButton
          colorScheme={"black"}
          aria-label="Send Message"
          variant={"ghost"}
          icon={<IoIosSend />}
          mr={2}
        />
      </Tooltip>
    </Flex>
  );
}

export default ChatInput;

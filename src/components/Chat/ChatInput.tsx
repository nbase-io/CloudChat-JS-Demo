import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import {
  RiSendPlaneLine,
  RiImageLine,
  RiEmotionHappyLine,
} from "react-icons/ri";
import { useFilePicker } from "use-file-picker";

type Props = {
  isBottom: boolean;
};

function ChatInput({ isBottom }: Props) {
  const [openFileSelector, { filesContent, loading: filePickerLoading }] =
    useFilePicker({
      accept: ".png",
    });

  // {filesContent.map((file, index) => (
  //   <div key={index}>
  //     <h2>{file.name}</h2>
  //     <div key={index}>{file.content}</div>
  //     <br />
  //   </div>
  // ))}

  return (
    <Flex
      pl={4}
      py={2}
      borderTopColor="gray.100"
      borderTopWidth={isBottom ? 0 : 1}
    >
      <InputGroup>
        <InputLeftElement>
          <Tooltip label={"Add emoji"}>
            <IconButton
              colorScheme={"black"}
              aria-label="Emogi"
              variant={"ghost"}
              icon={<RiEmotionHappyLine />}
              ml={2}
            />
          </Tooltip>
        </InputLeftElement>
        <Input
          borderRadius={120}
          variant={"outline"}
          placeholder="Type your message"
        />
      </InputGroup>
      <Tooltip label={"Send image or video"}>
        <IconButton
          colorScheme={"black"}
          aria-label="Send Image"
          variant={"ghost"}
          icon={<RiImageLine />}
          ml={2}
          // onClick={() => openFileSelector()}
        />
      </Tooltip>
      <Tooltip label={"Send message"}>
        <IconButton
          colorScheme={"black"}
          aria-label="Send Message"
          variant={"ghost"}
          icon={<RiSendPlaneLine />}
          mr={2}
        />
      </Tooltip>
    </Flex>
  );
}

export default ChatInput;

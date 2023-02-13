import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  RiSendPlaneLine,
  RiImageLine,
  RiEmotionHappyLine,
} from "react-icons/ri";
import { useFilePicker } from "use-file-picker";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

type Props = {
  isBottom: boolean;
};

function ChatInput({ isBottom }: Props) {
  const [input, setInput] = useState("");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [openFileSelector, { filesContent, loading: filePickerLoading }] =
    useFilePicker({
      accept: [".png", ".jpeg"],
      multiple: false,
    });

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log(input);
    setInput(""); // clear input
  };

  const emojiSelected = (e: any) => {
    setInput(input + e.native);
    onToggle();
  };

  // {filesContent.map((file, index) => (
  //   <div key={index}>
  //     <h2>{file.name}</h2>
  //     <div key={index}>{file.content}</div>
  //     <br />
  //   </div>
  // ))}

  return (
    <FormControl as={"form"} onSubmit={sendMessage}>
      <Flex
        pl={4}
        py={2}
        borderTopColor="gray.100"
        borderTopWidth={isBottom ? 0 : 1}
      >
        <InputGroup>
          <InputLeftElement>
            <Popover isLazy isOpen={isOpen} onClose={onClose}>
              <PopoverTrigger>
                <Box>
                  <Tooltip label={"Add emoji"}>
                    <IconButton
                      colorScheme={"black"}
                      aria-label="Emoji"
                      variant={"ghost"}
                      icon={<RiEmotionHappyLine />}
                      onClick={onToggle}
                      ml={2}
                    />
                  </Tooltip>
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <Picker data={data} onEmojiSelect={emojiSelected} />
              </PopoverContent>
            </Popover>
          </InputLeftElement>
          <Input
            borderRadius={120}
            variant={"outline"}
            placeholder="Type your message"
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </InputGroup>
        <Tooltip label={"Send image or video"}>
          <IconButton
            colorScheme={"black"}
            aria-label="Send Image"
            variant={"ghost"}
            icon={<RiImageLine />}
            ml={2}
            onClick={() => openFileSelector()}
          />
        </Tooltip>
        <Tooltip label={"Send message"}>
          <IconButton
            colorScheme={"black"}
            aria-label="Send Message"
            variant={"ghost"}
            icon={<RiSendPlaneLine />}
            mr={2}
            type={"submit"}
          />
        </Tooltip>
      </Flex>
    </FormControl>
  );
}

export default ChatInput;

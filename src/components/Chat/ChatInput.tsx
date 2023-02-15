import { useState, useEffect } from "react";
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
import { useSendImage, useSendMessage } from "../../api";

type Props = {
  channel: any;
};

function ChatInput({ channel }: Props) {
  const [input, setInput] = useState<any>("");
  const { mutate: sendMessage, status: sendMessageStatus } = useSendMessage(
    channel.id,
    input
  );
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [
    openFileSelector,
    { filesContent, loading: filePickerLoading, plainFiles, clear },
  ] = useFilePicker({
    accept: [
      ".bmp",
      ".gif",
      ".jpeg",
      ".png",
      ".webp",
      ".heic",
      ".heic-sequence",
      ".heif",
      ".heif-sequence",
      ".svgz",
    ],
    multiple: false,
  });
  const { mutate: sendImage } = useSendImage(channel.id, plainFiles[0]);

  const sendText = (e: any) => {
    e.preventDefault();
    if (input) {
      // send message
      sendMessage(channel.id, input);
    }
    setInput(""); // clear input
  };

  const emojiSelected = (e: any) => {
    setInput(input + e.native);
    onToggle(); // close popover
  };

  useEffect(() => {
    console.log(sendMessageStatus);
  }, [sendMessageStatus]);

  useEffect(() => {
    if (plainFiles.length > 0) {
      console.log(plainFiles);
      sendImage();
      clear();
    }
  }, [plainFiles]);

  // {filesContent.map((file, index) => (
  //   <div key={index}>
  //     <h2>{file.name}</h2>
  //     <div key={index}>{file.content}</div>
  //     <br />
  //   </div>
  // ))}

  return (
    <FormControl as={"form"} onSubmit={sendText}>
      <Flex pl={4} py={2} borderTopColor="gray.100" borderTopWidth={1}>
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

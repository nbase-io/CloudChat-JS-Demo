import { useState, useEffect, useRef } from "react";
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
  Text,
  VStack,
  HStack,
  CloseButton,
  Image,
  Spinner,
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
  replyParentMessage: any;
  setReplyParentMessage: any;
};

function ChatInput({
  channel,
  replyParentMessage,
  setReplyParentMessage,
}: Props) {
  const inputRef = useRef<any>(null);
  const [input, setInput] = useState<any>("");
  const { mutate: sendMessage, status: sendMessageStatus } = useSendMessage(
    channel.id,
    input,
    replyParentMessage?.message_id
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
      ".svg+xml",
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
    setReplyParentMessage(null); // clear parent message
  };

  const focus = () => {
    inputRef.current?.focus();
  };

  const emojiSelected = (e: any) => {
    setInput(input + e.native);
    onToggle(); // close popover
    focus();
  };

  useEffect(() => {
    if (plainFiles.length > 0) {
      console.log(plainFiles);
      sendImage();
      clear();
    }
  }, [plainFiles]);

  return (
    <FormControl
      as={"form"}
      onSubmit={sendText}
      borderTopColor="gray.100"
      borderTopWidth={1}
    >
      {replyParentMessage !== null && (
        <HStack px={4} py={2} justifyContent={"space-between"}>
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"2xs"} as="b">
              {`Reply to ${replyParentMessage.sender.name}`}
            </Text>
            {replyParentMessage.message_type === "text" ? (
              <Text fontSize={"xs"} noOfLines={1} color={"gray"}>
                {replyParentMessage.content}
              </Text>
            ) : (
              <Image
                src={`https://alpha-api.cloudchat.dev${replyParentMessage.attachment_filenames.url}`}
                alt={replyParentMessage.attachment_filenames.name}
                fallback={<Spinner />}
                maxW={"3xs"}
              />
            )}
          </VStack>
          <CloseButton onClick={() => setReplyParentMessage(null)} />
        </HStack>
      )}
      <Flex pl={4} py={2}>
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
            ref={inputRef}
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

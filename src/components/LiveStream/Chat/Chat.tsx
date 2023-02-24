import {
  HStack,
  VStack,
  Text,
  Divider,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";

function Chat() {
  return (
    <VStack bg="gray.900" w="full" color="white" spacing={0} px={6}>
      <HStack w="full" h={"60px"} justifyContent="space-between">
        <IconButton
          icon={<TbLayoutSidebarLeftExpand />}
          variant={"ghost"}
          aria-label={"Close Chat"}
          size="lg"
          _hover={{ bgColor: "gray.700" }}
        />
        <Text as="b">Live Chat</Text>
        <IconButton
          icon={<RiGroupLine />}
          variant={"ghost"}
          aria-label={"Attendance"}
          size="lg"
          _hover={{ bgColor: "gray.700" }}
        />
      </HStack>
      <Divider borderColor={"gray"} />
    </VStack>
  );
}

export default Chat;

import {
  Box,
  HStack,
  Image,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaSketch, FaGithub } from "react-icons/fa";
import LoginModal from "./LoginModal/LoginModal";

function Root() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={3}
        px={8}
        borderBottomWidth={1}
      >
        <Box color="red.500">
          <Link to={"/"}>
            <Image
              src="./ncloudchat-logo.png"
              alt="Ncloud Chat Logo"
              height={7}
            />
          </Link>
        </Box>
        <HStack spacing={2}>
          <Tooltip label={"Go to Github"}>
            <Link to={"https://github.com/nbase-io/CloudChat-JS-Demo"}>
              <IconButton
                icon={<FaGithub />}
                variant={"ghost"}
                aria-label={"Github Button"}
              />
            </Link>
          </Tooltip>
          <Tooltip label={"Download Sketch"}>
            <Link
              to={
                "https://kr.object.ncloudstorage.com/ncloudchat/NCP_Ncloud%20Chat_UI%20Kit_v1.0.sketch"
              }
            >
              <IconButton
                icon={<FaSketch />}
                variant={"ghost"}
                aria-label={"Download Sketch Button"}
              />
            </Link>
          </Tooltip>
        </HStack>
        <LoginModal isOpen={isOpen} onClose={onClose} />
      </HStack>
      <Outlet />
    </Box>
  );
}

export default Root;

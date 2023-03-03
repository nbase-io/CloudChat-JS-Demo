import { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Tooltip,
  IconButton,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { FaSketch, FaGithub } from "react-icons/fa";
import LoginModal from "./Modal/LoginModal";
import { IUser } from "../lib/interfaces/IUser";
import Loading from "./Loading/Loading";

type GlobalContextType = {
  user: IUser | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export function useGlobal() {
  return useOutletContext<GlobalContextType>();
}

function Root() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const header = (
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
      <ChakraLink
        href="https://cloudchat-livestream.vercel.app/"
        isExternal
        fontSize={{ base: "xs", lg: "sm" }}
      >
        Live Stream <ExternalLinkIcon mx="2px" />
      </ChakraLink>
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
    </HStack>
  );

  return (
    <Box>
      {isLoading && <Loading />}
      {user && header}
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setUser={setUser}
        user={user}
        setIsLoading={setIsLoading}
      />
      {user && <Outlet context={{ user, isLoading, setIsLoading }} />}
    </Box>
  );
}

export default Root;

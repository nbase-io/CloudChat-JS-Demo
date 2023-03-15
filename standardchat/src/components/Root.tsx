import { useState } from "react";
import {
  Box,
  HStack,
  Image,
  Tooltip,
  IconButton,
  useDisclosure,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { SiNaver, SiSketch, SiGithub, SiNpm } from "react-icons/si";
import { FaHandsHelping } from "react-icons/fa";
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

const small = "./assets/img/ncloudchat-logo-simple.png";
const large = "./assets/img/ncloudchat-logo.png";

function Root() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const header = (
    <HStack
      justifyContent={"space-between"}
      py={3}
      px={4}
      borderBottomWidth={1}
      spacing={0}
    >
      <Box color="red.500">
        <Link to={"/"}>
          {/* no idea why srcSet is not working below*/}
          <Image
            // srcSet={`${small} 1x, ${large} 2x`}
            src={`${large}`}
            alt="Ncloud Chat Logo"
            height={7}
            display={{ base: "none", md: "block" }}
            minW="28px"
          />
          <Image
            src={`${small}`}
            alt="Ncloud Chat Logo"
            height={7}
            display={{ base: "block", md: "none" }}
            minW="28px"
            mr="2"
          />
        </Link>
      </Box>
      <ChakraLink
        href="https://livestream.ncloudchat.com"
        isExternal
        fontSize={{ base: "xs", lg: "sm" }}
      >
        Live Stream <ExternalLinkIcon mx="2px" />
      </ChakraLink>
      <HStack spacing={0}>
        <Tooltip label={"Ask for Support"}>
          <Link
            to={"https://www.ncloud.com/support/question/sales/?language=ko-KR"}
            target="_blank"
          >
            <Button
              rightIcon={<FaHandsHelping />}
              aria-label={"Ask Support Link Button"}
              variant={"ghost"}
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
            >
              Contact Us
            </Button>
          </Link>
        </Tooltip>
        <Tooltip label={"Ncloud Chat"}>
          <Link
            to={"https://www.ncloud.com/product/businessApplication/ncloudChat"}
            target="_blank"
          >
            <IconButton
              icon={<SiNaver />}
              variant={"ghost"}
              aria-label={"NAVER Button"}
              fontSize={{ base: "sm", md: "md" }}
            />
          </Link>
        </Tooltip>
        <Tooltip label={"Go to NPM"}>
          <Link to={"https://www.npmjs.com/package/ncloudchat"} target="_blank">
            <IconButton
              icon={<SiNpm />}
              variant={"ghost"}
              aria-label={"NPM Button"}
              fontSize={{ base: "sm", md: "md" }}
            />
          </Link>
        </Tooltip>
        <Tooltip label={"Go to Github"}>
          <Link
            to={"https://github.com/nbase-io/CloudChat-JS-Demo"}
            target="_blank"
          >
            <IconButton
              icon={<SiGithub />}
              variant={"ghost"}
              aria-label={"Github Button"}
              fontSize={{ base: "sm", md: "md" }}
            />
          </Link>
        </Tooltip>
        <Tooltip label={"Download Sketch"}>
          <Link
            to={
              "https://kr.object.ncloudstorage.com/ncloudchat/NCP_Ncloud%20Chat_UI%20Kit_v1.0.sketch"
            }
            target="_blank"
          >
            <IconButton
              icon={<SiSketch />}
              variant={"ghost"}
              aria-label={"Download Sketch Button"}
              fontSize={{ base: "sm", md: "md" }}
              display={{ base: "none", sm: "flex" }}
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

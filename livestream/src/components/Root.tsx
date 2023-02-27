import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Image,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { FaSketch, FaGithub } from "react-icons/fa";
import LoginModal from "./Modal/LoginModal";
import { IUser } from "../lib/interfaces/IUser";

type ContextType = { user: IUser | null };

export function useUser() {
  return useOutletContext<ContextType>();
}

function Root() {
  const [user, setUser] = useState<IUser | null>(null);
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Box>
      {user && (
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
        </HStack>
      )}
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        setUser={setUser}
        user={user}
      />
      {user && <Outlet context={{ user }} />}
    </Box>
  );
}

export default Root;

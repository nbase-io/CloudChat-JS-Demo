import { Box, HStack, Button, Image } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaSketch } from "react-icons/fa";

function Root() {
  console.log("we");
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        py={5}
        px={10}
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
          <Link
            to={
              "https://kr.object.ncloudstorage.com/ncloudchat/NCP_Ncloud%20Chat_UI%20Kit_v1.0.sketch"
            }
          >
            <Button leftIcon={<FaSketch />} colorScheme="blue">
              스케치 다운로드
            </Button>
          </Link>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}

export default Root;

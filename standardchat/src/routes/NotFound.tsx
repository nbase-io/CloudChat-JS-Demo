import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justifyContent={"center"} minH="100vh">
      <Heading>Page not found.</Heading>
      <Text>It seems like you're lost.</Text>
      <iframe src="https://embed.lottiefiles.com/animation/119968"></iframe>
      <Link to="/">
        <Button colorScheme={"blue"} variant={"link"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}

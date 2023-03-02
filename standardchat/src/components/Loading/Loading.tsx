import {
  Box,
  Center,
  keyframes,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export default function Loading() {
  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      isCentered
      closeOnOverlayClick={false}
      motionPreset="none"
    >
      <ModalOverlay bg="white" />
      <ModalContent boxShadow={"none"}>
        <Center>
          <Box
            as={motion.div}
            animation={animation}
            // not work: transition={{ ... }}
            padding="2"
            // @ts-ignore - "Does not exist" Type Error against Motion
            bgGradient="linear(to-l, #7928CA, #20b2da)"
            width="12"
            height="12"
            display="flex"
          />
        </Center>
      </ModalContent>
    </Modal>
  );
}

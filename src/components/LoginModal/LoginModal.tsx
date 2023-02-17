import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  Image,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { FaImage, FaProjectDiagram, FaUser } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function LoginModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg={"blue.500"} />
      <ModalContent>
        <ModalHeader>
          <Image
            src="./ncloudchat-logo.png"
            alt="Ncloud Chat Logo"
            height={7}
          />
        </ModalHeader>
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<CgNametag />} />
              <Input placeholder="Name" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaUser />} />
              <Input placeholder="ID" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaImage />} />
              <Input placeholder="Profile URL" />
            </InputGroup>
          </VStack>
          <Button mt={6} colorScheme={"blue"} w="full">
            Start
          </Button>
        </ModalBody>
        <ModalFooter>
          <VStack w="full">
            <Select placeholder="Select a server" defaultValue={"alpha"}>
              <option value="localhost">localhost</option>
              <option value="alpha">Alpha</option>
              <option value="beta">Beta</option>
              <option value="real">Real</option>
            </Select>
            <InputGroup>
              <InputLeftElement children={<FaProjectDiagram />} />
              <Input placeholder="Project ID" />
            </InputGroup>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;

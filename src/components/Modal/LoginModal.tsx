import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  Image,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { FaImage, FaProjectDiagram, FaUser } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function LoginModal({ isOpen: isModalOpen, onClose: onModalClose }: Props) {
  const { isOpen: isServerSelectionOpen, onToggle } = useDisclosure();
  const clickHandler = (event: any) => {
    if (event.detail == 3) {
      onToggle();
    }
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg={"blue.500"} />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Image
              src="./ncloudchat-logo.png"
              alt="Ncloud Chat Logo"
              height={7}
              onClick={clickHandler}
            />
          </Center>
        </ModalHeader>
        <ModalBody py={4}>
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
        <ModalFooter hidden={!isServerSelectionOpen}>
          <VStack w="full">
            <Select placeholder="Select a server">
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

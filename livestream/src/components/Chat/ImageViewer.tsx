import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Spinner,
} from "@chakra-ui/react";

type Props = {
  node: any;
  isModalOpen: boolean;
  onModalClose: () => void;
  onModalOpen: () => void;
};

function ImageViwer({ node, isModalOpen, onModalClose, onModalOpen }: Props) {
  return (
    <Modal onClose={onModalClose} size={"full"} isOpen={isModalOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg={"blackAlpha.800"}>
        <ModalHeader color={"white"}>
          {node.attachment_filenames.name}
        </ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          onClick={onModalClose}
        >
          <Image
            src={`https://alpha-api.cloudchat.dev${node.attachment_filenames.url}`}
            alt={node.attachment_filenames.name}
            onClick={onModalOpen}
            fallback={<Spinner />}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ImageViwer;

import {
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: any;
};

function UserListModal({ isOpen, onClose, subscriptions }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{subscriptions.totalCount} people watching</ModalHeader>
        <ModalCloseButton />
        <ModalBody>List</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserListModal;

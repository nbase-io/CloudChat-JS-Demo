import {
  Button,
  Center,
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
  ModalCloseButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { FaImage } from "react-icons/fa";
import { createChannel } from "../../api";
import { useForm } from "react-hook-form";
import { ICreateChannel } from "../../lib/interfaces/ICreateChannel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomToast } from "../Toast/CustomToast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function NewChannelModal({
  isOpen: isModalOpen,
  onClose: onModalClose,
}: Props) {
  const queryClient = useQueryClient();
  const { addToast } = CustomToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateChannel>();

  const mutation = useMutation<any, any, ICreateChannel>(createChannel, {
    onSuccess: (data) => {
      addToast({
        title: `New channel ${data.createChannel?.channel?.name} was created!`,
        status: "success",
      });
      onModalClose();
      reset();
      queryClient.refetchQueries(["channels"]);
    },
    onError: (error) => {
      addToast({ title: { error }, status: "error" });
    },
  });

  const onSubmit = (data: ICreateChannel) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Center>
            <Text>New Channel</Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <VStack w="full">
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <Select
                isInvalid={Boolean(errors.type?.message)}
                placeholder="Choose a channel type"
                defaultValue={"PUBLIC"}
                {...register("type", {
                  required: "Please choose a channel type.",
                })}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </Select>
              <Text fontSize={"sm"} color="red.500">
                {errors.type?.message}
              </Text>
            </VStack>
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <InputGroup>
                <InputLeftElement children={<CgNametag />} />
                <Input
                  isInvalid={Boolean(errors.name?.message)}
                  placeholder="Channel Name"
                  {...register("name", {
                    required: "Please give channel a name.",
                  })}
                />
              </InputGroup>
              <Text fontSize={"sm"} color="red.500">
                {errors.name?.message}
              </Text>
            </VStack>
            <InputGroup>
              <InputLeftElement children={<FaImage />} />
              <Input
                placeholder="Channel Image URL"
                {...register("image_url")}
              />
            </InputGroup>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"blue"}
            w="full"
            type="submit"
            isLoading={mutation.isLoading}
          >
            Create new channel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewChannelModal;
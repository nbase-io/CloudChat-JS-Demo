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
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { FaImage } from "react-icons/fa";
import { updateChannel } from "../../api";
import { useForm } from "react-hook-form";
import { IUpdateChannel } from "../../lib/interfaces/IChannel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel: any;
  setChannel: any;
};

function EditChannelModal({
  isOpen: isModalOpen,
  onClose: onModalClose,
  channel,
  setChannel,
}: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IUpdateChannel>();

  const mutation = useMutation<any, any, IUpdateChannel>(updateChannel, {
    onSuccess: (data) => {
      toast.success(`A channel ${data?.name} was edited!`);
      setChannel(null);
      onModalClose();
      reset();
      queryClient.refetchQueries(["channels"]);
    },
  });

  const onSubmit = (data: IUpdateChannel) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    setValue("channel_id", channel.id);
    setValue("name", channel.name);
    setValue("type", channel.type);
    setValue("image_url", channel.image_url);
  }, [channel]);

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
            <Text>Edit Channel</Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <VStack w="full">
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <Select
                isInvalid={Boolean(errors.type?.message)}
                placeholder="Choose a channel type"
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
            Edit channel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditChannelModal;

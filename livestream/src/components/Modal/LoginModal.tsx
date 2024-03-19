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
  Text,
} from "@chakra-ui/react";
import { CgNametag } from "react-icons/cg";
import { FaImage, FaProjectDiagram, FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ILogin } from "../../lib/interfaces/ILogin";
import { connect } from "../../api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setUser: any;
  user: any;
  setIsLoading: (value: boolean) => void;
};

function LoginModal({
  isOpen: isModalOpen,
  onClose: onModalClose,
  setUser,
  user,
  setIsLoading,
}: Props) {
  const ramdomUser = `guest-${Math.floor(Math.random() * 9999)}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>();
  const { isOpen: isServerSelectionOpen, onToggle } = useDisclosure();
  const clickHandler = (event: any) => {
    if (event.detail == 3) {
      onToggle();
    }
  };
  // connect
  const mutation = useMutation<any, any, ILogin>(connect, {
    onSuccess: (data) => {
      toast.success(`Hello, ${data?.name}`);
      setUser(data);
      onModalClose();
      reset();
    },
    onError: (error) => {
      setIsLoading(false);
    },
    mutationKey: ["connect"],
  });
  const onSubmit = (data: ILogin) => {
    setIsLoading(true);
    mutation.mutate(data); // trigger connect
  };

  const nameField = (
    <VStack w="full" alignItems={"flex-start"} spacing={0}>
      <InputGroup>
        <InputLeftElement children={<CgNametag />} />
        <Input
          isInvalid={Boolean(errors.name?.message)}
          defaultValue={ramdomUser.toUpperCase()}
          placeholder="Name"
          {...register("name", {
            required: "Please input a name.",
          })}
        />
      </InputGroup>
      <Text fontSize={"sm"} color="red.500">
        {errors.name?.message}
      </Text>
    </VStack>
  );

  const idField = (
    <VStack w="full" alignItems={"flex-start"} spacing={0}>
      <InputGroup>
        <InputLeftElement children={<FaUser />} />
        <Input
          isInvalid={Boolean(errors.id?.message)}
          defaultValue={ramdomUser.toLowerCase()}
          placeholder="ID"
          {...register("id", { required: "Please input an id." })}
        />
      </InputGroup>
      <Text fontSize={"sm"} color="red.500">
        {errors.id?.message}
      </Text>
    </VStack>
  );

  const profileField = (
    <InputGroup>
      <InputLeftElement children={<FaImage />} />
      <Input
        placeholder="Profile URL"
        {...register("profile")}
        defaultValue="https://loremflickr.com/640/360"
      />
    </InputGroup>
  );

  const serverAndProjectIdFields = (
    <VStack w="full">
      <VStack w="full" alignItems={"flex-start"} spacing={0}>
        <Select
          isInvalid={Boolean(errors.server?.message)}
          placeholder="Select a server"
          defaultValue={"beta"}
          {...register("server", {
            required: "Please choose a server",
          })}
        >
          <option value="localhost">localhost</option>
          <option value="alpha">Alpha</option>
          <option value="beta">Beta</option>
          <option value="real">Real</option>
        </Select>
        <Text fontSize={"sm"} color="red.500">
          {errors.server?.message}
        </Text>
      </VStack>
      <VStack w="full" alignItems={"flex-start"} spacing={0}>
        <InputGroup>
          <InputLeftElement children={<FaProjectDiagram />} />
          <Input
            isInvalid={Boolean(errors.projectId?.message)}
            placeholder="Project ID"
            defaultValue={"339c2b1c-d35b-47f2-828d-5f02a130146a"}
            {...register("projectId", {
              required: "Please input a project id",
            })}
          />
        </InputGroup>
        <Text fontSize={"sm"} color="red.500">
          {errors.projectId?.message}
        </Text>
      </VStack>
    </VStack>
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      isCentered
      closeOnOverlayClick={false}
      motionPreset="none"
    >
      <ModalOverlay bg={"blue.500"} />
      <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Center>
            <Image
              src="./assets/img/ncloudchat-logo.png"
              alt="Ncloud Chat Logo"
              height={7}
              onClick={clickHandler}
            />
          </Center>
        </ModalHeader>
        <ModalBody py={4}>
          <VStack>
            {nameField}
            {idField}
            {profileField}
          </VStack>
          <Button mt={6} colorScheme={"blue"} w="full" type="submit">
            Start
          </Button>
        </ModalBody>
        <ModalFooter hidden={!isServerSelectionOpen}>
          {serverAndProjectIdFields}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;

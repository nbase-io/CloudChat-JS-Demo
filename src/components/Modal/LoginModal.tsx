import { useEffect, useState } from "react";
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
import { useConnect } from "../../api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function LoginModal({ isOpen: isModalOpen, onClose: onModalClose }: Props) {
  const [readyToConnect, setReadyToConnect] = useState(false);
  const [loginValues, setLoginValues] = useState({
    name: "",
    id: "",
    profile: "",
    server: "",
    projectId: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>();
  // 1. connect
  const { data: user } = useConnect(
    readyToConnect,
    loginValues.name,
    loginValues.id,
    loginValues.profile,
    loginValues.server,
    loginValues.projectId
  );
  const { isOpen: isServerSelectionOpen, onToggle } = useDisclosure();
  const clickHandler = (event: any) => {
    if (event.detail == 3) {
      onToggle();
    }
  };
  const onSubmit = (data: any) => {
    console.log(data);
    setLoginValues({
      name: data.name,
      id: data.id,
      profile: data.profile,
      server: data.server,
      projectId: data.projectId,
    });
    reset();
  };
  useEffect(() => {
    if (
      loginValues.name !== "" ||
      loginValues.id !== "" ||
      loginValues.server !== "" ||
      loginValues.projectId !== ""
    ) {
      console.log(loginValues);
    }
  }, [loginValues]);

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
              src="./ncloudchat-logo.png"
              alt="Ncloud Chat Logo"
              height={7}
              onClick={clickHandler}
            />
          </Center>
        </ModalHeader>
        <ModalBody py={4}>
          <VStack>
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <InputGroup>
                <InputLeftElement children={<CgNametag />} />
                <Input
                  isInvalid={Boolean(errors.name?.message)}
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
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <InputGroup>
                <InputLeftElement children={<FaUser />} />
                <Input
                  isInvalid={Boolean(errors.id?.message)}
                  placeholder="ID"
                  {...register("id", { required: "Please input an id." })}
                />
              </InputGroup>
              <Text fontSize={"sm"} color="red.500">
                {errors.id?.message}
              </Text>
            </VStack>
            <InputGroup>
              <InputLeftElement children={<FaImage />} />
              <Input placeholder="Profile URL" {...register("profile")} />
            </InputGroup>
          </VStack>
          <Button mt={6} colorScheme={"blue"} w="full" type="submit">
            Start
          </Button>
        </ModalBody>
        <ModalFooter hidden={!isServerSelectionOpen}>
          <VStack w="full">
            <VStack w="full" alignItems={"flex-start"} spacing={0}>
              <Select
                isInvalid={Boolean(errors.server?.message)}
                placeholder="Select a server"
                defaultValue={"alpha"}
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;

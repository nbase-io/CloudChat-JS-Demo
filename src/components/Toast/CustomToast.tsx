import { useToast } from "@chakra-ui/react";

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (newRes: any) => {
    toast({
      title: newRes.title,
      description: newRes.description,
      status: newRes.type,
      position: "top",
      duration: 5000,
    });
  };

  return { addToast };
};

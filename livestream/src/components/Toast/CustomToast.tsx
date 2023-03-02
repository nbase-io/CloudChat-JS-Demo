import { useToast } from "@chakra-ui/react";

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (newRes: any) => {
    toast({
      title: newRes.title,
      description: newRes.description,
      status: newRes.status,
      position: "top",
      duration: 3000,
    });
  };

  return { addToast };
};

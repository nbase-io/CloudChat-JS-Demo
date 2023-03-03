import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";

const mutationCache = new MutationCache({
  onError(error: any) {
    toast.error(`Something went wrong: ${error.message}`);
  },
});

const queryCache = new QueryCache({
  onError(error: any) {
    toast.error(`Something went wrong: ${error.message}`);
  },
});

const client = new QueryClient({
  mutationCache,
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <RouterProvider router={router} />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

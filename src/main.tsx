import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <Suspense
          fallback={
            <Center h="100vh">
              <Spinner size="lg" />
            </Center>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

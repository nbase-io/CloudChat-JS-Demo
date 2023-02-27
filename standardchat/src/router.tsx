import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import StandardChat from "./routes/StandardChat";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <StandardChat />,
      },
    ],
  },
]);

export default router;

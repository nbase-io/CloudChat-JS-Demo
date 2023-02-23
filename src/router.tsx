import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import StandardChat from "./routes/StandardChat";
import NotFound from "./routes/NotFound";
import LiveStream from "./routes/LiveStream";

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
      {
        path: "live-stream",
        element: <LiveStream />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Take from "./components/Take";
import Edit from "./components/Edit";
import Results from "./components/Results";
import TakeActive from "./components/TakeActive";
import EditActive from "./components/EditActive";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/take",
    element: <Take />,
  },
  {
    path: "/take/:quiz",
    element: <TakeActive />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/edit/:quiz",
    element: <EditActive />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

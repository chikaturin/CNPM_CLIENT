import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import DanhSachSanBay from "../AdminPage/ListSanBay/DanhSachSanBay.jsx";
import CreateDanhSachSanBay from "../AdminPage/ListSanBay/CreateDanhSachSanBay.jsx";
import ErrorPage from "./ErrorPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DanhSachSanBay />,
      },
      {
        path: "/CreateDanhSachSanBay",
        element: <CreateDanhSachSanBay />,
      },
    ],
  },
]);

export default router;

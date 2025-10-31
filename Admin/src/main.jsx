import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { router } from "../src/Routes/Route.jsx";
import { AdminApi } from "./Context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminApi>
    <RouterProvider router={router} />
  </AdminApi>
);

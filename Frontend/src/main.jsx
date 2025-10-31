import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./Routers/Routes.jsx";
import { ProductApi } from "./Context/ProductContext.jsx";
import { CartApi } from "./Context/CartContext.jsx";
import { AuthApi } from "./Context/AuthContext.jsx";
import { ProfileApi } from "./Context/ProfileContext.jsx";
import { HomeApi } from "./Context/HomeContext.jsx";

createRoot(document.getElementById("root")).render(
  <HomeApi>
    <ProfileApi>
      <ProductApi>
        <CartApi>
          <AuthApi>
            <RouterProvider router={router} />
          </AuthApi>
        </CartApi>
      </ProductApi>
    </ProfileApi>
  </HomeApi>
);

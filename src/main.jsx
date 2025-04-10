import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ScreenRestrictionLayout from "./shared/components/ScreenRestrictionLayout";
import "./shared/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenRestrictionLayout>
      <RouterProvider router={router} />
    </ScreenRestrictionLayout>
  </StrictMode>
);

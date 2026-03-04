import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
    }
]);
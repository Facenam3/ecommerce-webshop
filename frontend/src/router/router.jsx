import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/layout/Root.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/category/3" replace />
            },
            {
                path: "category/:id",
                element: <CategoryPage />
            },
        ],
    }
]);
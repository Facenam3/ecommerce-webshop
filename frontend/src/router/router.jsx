import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/layout/Root.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "category/:id",
                element: <CategoryPage />
            },
        ],
    }
]);
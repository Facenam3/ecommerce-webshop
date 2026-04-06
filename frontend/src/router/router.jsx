import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../pages/layout/Root.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import Product from "../pages/Product.jsx";
import ErrorPage from "../pages/error/Errorpage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/all" replace />
            },
            {
                path: ":categoryName",
                element: <ProductsPage />,
            },
            {
                path:"products/:id",
                element: <Product />,
            }
        ],
    }
]);
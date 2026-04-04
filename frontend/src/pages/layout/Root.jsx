import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/navigation/MainNavigation";
import CartOverlay from "../../components/UI/cart/CartOverlay";

export default function RootLayout() {
    return (
        <div className="min-h-screen">
            <MainNavigation />
            <Outlet />
            <CartOverlay />
        </div>
    )
}
import { NavLink } from "react-router-dom";
import CategoryNav from "./CategoryNav";

export default function MainNavigation() {
    return (
        <header>
            <div className="flex justify-between items-center container mx-auto p-5">
                <CategoryNav />
                <a href="#">
                    Green item
                </a>
                <a href="">
                    Cart
                </a>
            </div>            
        </header>
    );
}
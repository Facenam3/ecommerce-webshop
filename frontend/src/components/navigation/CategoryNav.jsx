import { useEffect, useContext } from "react";
import { NavLink,useLocation } from "react-router-dom";
import CategoryContext from "../../store/contexts/CategoryContext.jsx";

import { toCategoryPath } from "../../helper/string.js";
import { fallbackCategories } from "../../helper/categories.js";

export default function CategoryNav() {
    const {categories, fetchCategories} = useContext(CategoryContext);
    const location = useLocation();

    useEffect(() => {
       fetchCategories();
    }, []);

    const navCategories = 
        categories && categories.length > 0 ? categories : fallbackCategories;
    
    return (
        <nav className="flex gap-5 items-center text-2xl uppercase">
            {navCategories?.map((cat) => {
                const path = toCategoryPath(cat.name);
                const isCategoryActive = location.pathname === path;

                return (
                     <NavLink
                        key={cat.id}
                        to={path}
                        className={isCategoryActive ? "underline underline-offset-24 text-green-500" : ""}
                    >
                        <span data-testid={isCategoryActive ? "active-category-link" : "category-link"}>
                            {cat.name}
                        </span>
                    </NavLink>
                )               
            })}
        </nav>
    )
}
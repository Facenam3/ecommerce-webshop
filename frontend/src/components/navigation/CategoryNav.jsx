import { useEffect, useContext } from "react";
import { NavLink,useLocation } from "react-router-dom";
import CategoryContext from "../../store/contexts/CategoryContext.jsx";

import { toCategoryPath } from "../../helper/string.js";

export default function CategoryNav() {
    const {categories,loading, errors, fetchCategories} = useContext(CategoryContext);
    const location = useLocation();

    useEffect(() => {
       fetchCategories();
    }, []);

    if(loading) return <nav>Loading...</nav>
    if(errors) return <nav>Failed to load categories..</nav>
    
    return (
        <nav className="flex gap-5 items-center text-2xl uppercase">
            {categories?.map((cat) => {
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
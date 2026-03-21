import { useEffect, useContext } from "react";
import { NavLink,useLocation, useParams } from "react-router-dom";

import CategoryContext from "../../store/contexts/CategoryContext.jsx";

export default function CategoryNav() {
    const {categories,loading, errors, fetchCategories} = useContext(CategoryContext);

    useEffect(() => {
       fetchCategories();
    }, []);

    const location = useLocation();
    const params = useParams();

    let activeCategoryId = null;

    if(location.pathname.startsWith("/category/")) {
        activeCategoryId = params.id;
    } else if (location.pathname.startsWith("/products/")) {
        activeCategoryId = location.state?.categoryId;
    }

    if(loading) return <nav>Loading...</nav>
    if(errors) return <nav>Failed to load categories..</nav>
    
    return (
        <nav className="flex gap-5 items-center text-2xl uppercase">
            {categories?.map((cat) => {
                const isCategoryActive = String(cat.id) === String(activeCategoryId);

                return (
                     <NavLink
                        key={cat.id}
                        to={`/category/${cat.id}`}
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
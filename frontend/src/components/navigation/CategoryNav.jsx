import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import CategoryContext from "../../store/contexts/CategoryContext.jsx";

const CATEGORIES_QUERY = `
  query {
    categories {
      id
      name
    }
  }
`;

export default function CategoryNav() {
    const {categories, fetchCategories} = useContext(CategoryContext);
    console.log(categories);
    useEffect(() => {
       fetchCategories();
    }, []);
    
    return (
        <nav className="flex gap-5 items-center text-2xl uppercase">
            {categories?.map((cat) => (
                <NavLink 
                    key={cat.id} 
                    to={`/category/${cat.id}`} 
                    className={({isActive}) => (isActive ? "underline underline-offset-24 text-green-500" : "")}>
                    {cat.name}
                </NavLink>
            ))}
        </nav>
    )
}
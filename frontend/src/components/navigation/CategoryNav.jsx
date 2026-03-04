import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { graphqlRequest } from "../../api/graphqlClient";

const CATEGORIES_QUERY = `
query {
    categories {
    id
    name
    }
}
`;

export default function CategoryNav() {
    const [categories, setCategories] = useState([]);

    graphqlRequest(`query { categories { id name } }`)
    .then(console.log)
    .catch(console.error);

    useEffect(() => {
        async function load() {
            const data = await graphqlRequest(CATEGORIES_QUERY);

            console.log(data);
            setCategories(data.categories);
        }

        load();
    }, []);
    
    return (
        <nav className="flex gap-5 items-center text-2xl uppercase">
            {categories.map((cat) => (
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
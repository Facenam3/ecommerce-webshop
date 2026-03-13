import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { CategoryContextProvider } from "./store/contexts/CategoryContext.jsx";
import { ProductContextProvider } from "./store/contexts/ProductContext.jsx";

function App() {

  return (
    <CategoryContextProvider>
      <ProductContextProvider>
        <RouterProvider router={router} />
      </ProductContextProvider>
    </CategoryContextProvider>
  )
}

export default App

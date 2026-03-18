import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { CategoryContextProvider } from "./store/contexts/CategoryContext.jsx";
import { ProductContextProvider } from "./store/contexts/ProductContext.jsx";
import { CartContextProvider } from "./store/contexts/CartContext.jsx";

function App() {

  return (
    <CartContextProvider>
      <CategoryContextProvider>
        <ProductContextProvider>
          <RouterProvider router={router} />
        </ProductContextProvider>
      </CategoryContextProvider>
    </CartContextProvider>    
  );
};

export default App

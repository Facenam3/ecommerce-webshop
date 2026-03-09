import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";

import { CategoryContextProvider } from "./store/contexts/CategoryContext.jsx";

function App() {

  return (
    <CategoryContextProvider>
      <RouterProvider router={router} />
    </CategoryContextProvider>
  )
}

export default App

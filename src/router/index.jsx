import { createBrowserRouter } from "react-router-dom";
import Mind from "../pages/Mind";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mind/>
    }
])

export default router;
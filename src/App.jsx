import {createBrowserRouter, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        errorElement: <ErrorElement/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App

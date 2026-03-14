import {createBrowserRouter, RouterProvider} from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";
import WebsiteLayout from "./layouts/WebsiteLayout.jsx";
import ErrorElement from "./pages/ErrorElement.jsx";
import Login from "./pages/website/Login.jsx";
import Index from "./pages/website/Index.jsx";
import Home from "./pages/app/Home.jsx";
import Register from "./pages/website/Register.jsx";
import Settings from "./pages/app/Settings.jsx";
import Profile from "./pages/app/Profile.jsx";
import Bubble from "./pages/app/Bubble.jsx";
import Friends from "./pages/app/Friends.jsx";
import Explore from "./pages/app/Explore.jsx";
import Onboarding from "./pages/app/Onboarding.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProfileEdit from "./pages/app/ProfileEdit.jsx";

const router = createBrowserRouter([
    {
        element: <WebsiteLayout/>,
        errorElement: <ErrorElement/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/",
                element: <Index/>
            }
        ]
    },
    {
        element: (
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorElement/>,
        children: [
            {
                path: "/app/onboarding",
                element: <Onboarding/>
            },
            {
                path: "/app",
                element: <Home/>
            },
            {
                path: "/app/settings",
                element: <Settings/>,
                handle: {page: "subpage"}
            },
            {
                path: "/app/profile",
                element: <Profile/>
            },
            {
                path: "/app/profile/edit",
                element: <ProfileEdit/>,
                handle: {page: "subpage"}
            },
            {
                path: "/app/bubble",
                element: <Bubble/>,
                handle: {page: "subpage"}
            },
            {
                path: "/app/friends",
                element: <Friends/>,
                handle: {page: "subpage"}
            },
            {
                path: "/app/explore",
                element: <Explore/>
            },
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App

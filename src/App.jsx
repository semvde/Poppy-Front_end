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
import {AppContext} from "./Contexts.jsx";
import {useEffect, useState} from "react";
import {fetchAPI} from "./services/Fetch.js";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/app/admin/Dashboard.jsx";
import FriendRequest from "./pages/app/FriendRequest.jsx";
import Artists from "./pages/app/admin/Top/Artists.jsx";
import Genres from "./pages/app/admin/Top/Genres.jsx";

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
            },
            {
                path: "/app/friends/requests",
                element: <FriendRequest/>,
                handle: {page: "subpage"}
            },
            {
                path: "/app/explore",
                element: <Explore/>
            },

        ]
    },
    {
        path: "/app/admin",
        element: (
            <ProtectedRoute>
                <AdminLayout/>
            </ProtectedRoute>
        ),
        errorElement: <ErrorElement/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "top/artists",
                element: <Artists/>
            },
            {
                path: "top/genres",
                element: <Genres/>
            },
            {
                path: "settings",
                element: <Settings/>
            }
        ]
    }
]);

function App() {
    const [genres, setGenres] = useState([{index: -1, name: "Loading..."}]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [user, setUser] = useState(null);

    const getGenres = async () => {
        let {items} = await fetchAPI('/genres');

        if (items === undefined) items = [{index: -1, name: "Loading..."}];

        setGenres(items);
        setSelectedGenres([]);
    }

    useEffect(() => {
        if (user) {
            getGenres();
        }
    }, [user]);

    return (
        <AppContext value={{genres, selectedGenres, setSelectedGenres, user, setUser}}>
            <RouterProvider router={router}/>
        </AppContext>
    )
}

export default App

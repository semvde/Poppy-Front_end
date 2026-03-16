import {useContext, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";
import {fetchAPI} from "../services/Fetch.js";
import {AppContext} from "../Contexts.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

export default function ProtectedRoute({children}) {
    const [loading, setLoading] = useState(true);
    const {user, setUser} = useContext(AppContext);
    const location = useLocation();

    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);

            const res = await fetchAPI("/auth/me");

            if (res?.id) {
                setUser(res);
            } else {
                setUser(null);
            }

            setLoading(false);
        };

        checkLogin();
    }, [location.pathname]);

    if (loading) return <AppLayout/>;

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (!user.hasCompletedOnboarding && location.pathname !== "/app/onboarding") {
        return <Navigate to="/app/onboarding" replace/>;
    }

    if (user.hasCompletedOnboarding && location.pathname === "/app/onboarding") {
        return <Navigate to="/app" replace/>;
    }

    return children;
}
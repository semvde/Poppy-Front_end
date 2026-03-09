import {Outlet} from "react-router";
import Button from "../components/Button.jsx";

function WebsiteLayout() {
    return (
        <>
            <nav className={"bg-black rounded-b-xl px-3 py-2.5"}>
                <div className={"flex items-center justify-between max-w-300 mx-auto"}>
                    <img src="/logo.png" alt="" className={"h-10"}/>
                    <div className={"flex gap-2.5"}>
                        <Button as={"link"} variant={"secondary"} size={"sm"} to={"/register"}>Register</Button>
                        <Button as={"link"} size={"sm"} to={"/login"}>Login</Button>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet/>
            </main>

            <footer className={"bg-black rounded-t-xl px-3 py-3"}>
                <div className={"text-sm text-center"}>
                    © Copyright {new Date().getFullYear()} Poppy
                </div>
            </footer>
        </>
    );
}

export default WebsiteLayout;
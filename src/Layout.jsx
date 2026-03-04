import {NavLink, Outlet} from "react-router";

function Layout() {
    return (
        <>
            <header className={"bg-black rounded-b-xl px-3 py-2.5"}>
                {/*Mobile version*/}
                <div className={"flex items-center justify-between max-w-300 mx-auto sm:hidden"}>
                    <img src="/logo.png" alt="" className={"h-10"}/>
                    <i className="text-2xl fa-solid fa-gear" aria-label={"Settings"}></i>
                </div>
                {/*Desktop version*/}
                <div className={"hidden items-center justify-between max-w-300 mx-auto sm:flex"}>
                    <div className={"flex items-center gap-20"}>
                        <img src="/logo.png" alt="" className={"h-10"}/>
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/"}>Explore</NavLink>
                        <NavLink to={"/"}>Playlists</NavLink>
                    </div>
                    <div className={"flex items-center gap-10"}>
                        <NavLink to={"/"}>Profile</NavLink>
                        <i className="text-2xl fa-solid fa-gear" aria-label={"Settings"}></i>
                    </div>
                </div>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer className={"bg-black rounded-t-xl px-3 py-3"}>
                {/*Mobile version*/}
                <nav className={"flex items-center justify-between text-4xl max-w-300 mx-auto sm:hidden"}>
                    <i className="fa-solid fa-layer-group" aria-label={"Home"}></i>
                    <i className="fa-regular fa-compass" aria-label={"Explore"}></i>
                    <i className="fa-solid fa-folder-open" aria-label={"Playlists"}></i>
                    <i className="fa-regular fa-user" aria-label={"Profile"}></i>
                </nav>
                {/*Desktop version*/}
                <div className={"hidden text-sm text-center sm:block"}>
                    © Copyright {new Date().getFullYear()} Poppy
                </div>
            </footer>
        </>
    );
}

export default Layout;
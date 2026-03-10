import {NavLink, Outlet, useMatches, useNavigate} from "react-router";

function AppLayout() {
    const matches = useMatches();
    const navigate = useNavigate();

    const isSubPage = matches.some(
        match => match.handle?.page === "subpage"
    );

    return (
        <>
            {isSubPage ? (
                <header className={"fixed left-0 right-0 top-0 bg-black rounded-b-xl px-3 py-2.5 z-999"}>
                    {/*Mobile version*/}
                    <div className={"flex items-center justify-between max-w-300 mx-auto sm:hidden"}>
                        <i onClick={() => navigate((-1))} className="py-2.75 fa-solid fa-angles-left"
                           aria-label={"Back to previous page"}></i>
                        <NavLink to={"/app/settings"} className={"flex items-center"} aria-label={"Settings"}><i
                            className="text-2xl fa-solid fa-gear"></i></NavLink>
                    </div>
                    {/*Desktop version*/}
                    <div className={"hidden items-center justify-between max-w-300 mx-auto sm:flex"}>
                        <div className={"flex items-center gap-20"}>
                            <img src="/logo.png" alt="" className={"h-10"}/>
                            <NavLink to={"/app"}>Home</NavLink>
                            <NavLink to={"/app/explore"}>Explore</NavLink>
                            <NavLink to={"/app/playlists"}>Playlists</NavLink>
                        </div>
                        <div className={"flex items-center gap-10"}>
                            <NavLink to={"/app/profile"}>Profile</NavLink>
                            <NavLink to={"/app/settings"} className={"flex items-center"} aria-label={"Settings"}><i
                                className="text-2xl fa-solid fa-gear"></i></NavLink>
                        </div>
                    </div>
                </header>
            ) : (
                <header className={"fixed left-0 right-0 top-0 bg-black rounded-b-xl px-3 py-2.5 z-999"}>
                    {/*Mobile version*/}
                    <div className={"flex items-center justify-between max-w-300 mx-auto sm:hidden"}>
                        <img src="/logo.png" alt="" className={"h-10"}/>
                        <NavLink to={"/app/settings"} className={"flex items-center"} aria-label={"Settings"}><i
                            className="text-2xl fa-solid fa-gear"></i></NavLink>
                    </div>
                    {/*Desktop version*/}
                    <div className={"hidden items-center justify-between max-w-300 mx-auto sm:flex"}>
                        <div className={"flex items-center gap-20"}>
                            <img src="/logo.png" alt="" className={"h-10"}/>
                            <NavLink to={"/app"}>Home</NavLink>
                            <NavLink to={"/app/explore"}>Explore</NavLink>
                            <NavLink to={"/app/playlists"}>Playlists</NavLink>
                        </div>
                        <div className={"flex items-center gap-10"}>
                            <NavLink to={"/app/profile"}>Profile</NavLink>
                            <NavLink to={"/app/settings"} className={"flex items-center"} aria-label={"Settings"}><i
                                className="text-2xl fa-solid fa-gear"></i></NavLink>
                        </div>
                    </div>
                </header>
            )}

            <main>
                <Outlet/>
            </main>

            <footer className={"fixed left-0 right-0 bottom-0 bg-black rounded-t-xl px-3 py-3 sm:static z-999"}>
                {/*Mobile version*/}
                <nav className={"flex items-center justify-between text-4xl max-w-300 mx-auto sm:hidden"}>
                    <NavLink to={"/app"} className={"flex items-center"} aria-label={"Home"}><i
                        className="fa-solid fa-layer-group"></i></NavLink>
                    <NavLink to={"/app/explore"} className={"flex items-center"} aria-label={"Explore"}><i
                        className="fa-regular fa-compass"></i></NavLink>
                    <NavLink to={"/app/playlists"} className={"flex items-center"} aria-label={"Playlists"}><i
                        className="fa-solid fa-folder-open"></i></NavLink>
                    <NavLink to={"/app/profile"} className={"flex items-center"} aria-label={"Profile"}><i
                        className="fa-regular fa-user"></i></NavLink>
                </nav>
                {/*Desktop version*/}
                <div className={"hidden text-sm text-center sm:block"}>
                    © Copyright {new Date().getFullYear()} Poppy
                </div>
            </footer>
        </>
    );
}

export default AppLayout;
import {useState} from "react";
import Button from "../components/Button.jsx"
import {NavLink, Outlet, useMatches, useNavigate} from "react-router";

function AdminLayout() {
    const [topOpen, setTopOpen] = useState(false);
    const matches = useMatches();
    const navigate = useNavigate();

    const isSubPage = matches.some(
        match => match.handle?.page === "subpage"
    );

    return (
        <>
            {isSubPage ? (
                <header className="fixed left-0 right-0 top-0 bg-black rounded-b-xl px-3 py-2.5 z-999">
                    {/* Mobiel vers */}
                    <div className="flex items-center justify-between max-w-300 mx-auto sm:hidden">
                        <i onClick={() => navigate(-1)} className="py-2.75 fa-solid fa-angles-left"
                           aria-label="Back to previous page"
                        ></i>

                        <NavLink to="/app/admin/settings" className="flex items-center" aria-label="Settings">
                            <i className="text-2xl fa-solid fa-gear"></i>
                        </NavLink>
                    </div>

                    {/* Desktop vers */}
                    <div className="hidden items-center justify-between max-w-300 mx-auto sm:flex">
                        <div className="flex items-center gap-20">
                            <img src="/logo.png" alt="" className="h-10"/>

                            <NavLink to="/app/admin/dashboard">Dashboard</NavLink>
                            <NavLink to="/app/admin/users">Users</NavLink>

                            <div className="relative">
                                <Button onClick={() => setTopOpen(!topOpen)}>Top<i
                                    className="fa-solid fa-chevron-down text-xs"></i>
                                </Button>

                                {topOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2 bg-outline text-black rounded-xl shadow-lg p-2 flex flex-col min-w-40">
                                        <NavLink to="/app/admin/top/songs"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top songs
                                        </NavLink>

                                        <NavLink to="/app/admin/top/artists"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top artists
                                        </NavLink>

                                        <NavLink to="/app/admin/top/genres"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top genres
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <NavLink to="/app/profile">Profile</NavLink>

                            <NavLink to="/app/admin/settings" className="flex items-center" aria-label="Settings">
                                <i className="text-2xl fa-solid fa-gear"></i>
                            </NavLink>
                        </div>
                    </div>
                </header>
            ) : (
                <header className="fixed left-0 right-0 top-0 bg-black rounded-b-xl px-3 py-2.5 z-999">
                    {/* Mobile vers */}
                    <div className="flex items-center justify-between max-w-300 mx-auto sm:hidden">
                        <img src="/logo.png" alt="" className="h-10"/>

                        <NavLink to="/app/admin/settings" className="flex items-center" aria-label="Settings">
                            <i className="text-2xl fa-solid fa-gear"></i>
                        </NavLink>
                    </div>

                    {/* Desktop vers */}
                    <div className="hidden items-center justify-between max-w-300 mx-auto sm:flex">
                        <div className="flex items-center gap-20">
                            <img src="/logo.png" alt="" className="h-10"/>

                            <NavLink to="/app/admin/dashboard">Dashboard</NavLink>
                            <NavLink to="/app/admin/users">Users</NavLink>

                            <div className="relative">
                                <Button as={"link"} onClick={() => setTopOpen(!topOpen)}>
                                    Top
                                    <i className="fa-solid fa-chevron-down text-xs"></i>
                                </Button>

                                {topOpen && (
                                    <div
                                        className="absolute top-full left-0 mt-2 bg-outline text-black rounded-xl shadow-lg p-2 flex flex-col min-w-40">
                                        <NavLink to="/app/admin/top/songs"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top songs
                                        </NavLink>

                                        <NavLink to="/app/admin/top/artists"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top artists
                                        </NavLink>

                                        <NavLink to="/app/admin/top/genres"
                                                 className="px-3 py-2 rounded hover:bg-primary-hover"
                                                 onClick={() => setTopOpen(false)}>
                                            Top genres
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <NavLink to="/app/profile">Profile</NavLink>

                            <NavLink to="/app/admin/settings" className="flex items-center" aria-label="Settings">
                                <i className="text-2xl fa-solid fa-gear"></i>
                            </NavLink>
                        </div>
                    </div>
                </header>
            )}

            <main className="pt-20">
                <Outlet/>
            </main>

            <footer className="fixed left-0 right-0 bottom-0 bg-black rounded-t-xl px-3 py-3 sm:static z-999">
                {/* Mobile version */}
                <nav className="flex items-center justify-between text-4xl max-w-300 mx-auto sm:hidden">
                    <NavLink to="/app/admin/dashboard" className="flex items-center" aria-label="Dashboard">
                        <i className="fa-solid fa-chart-line"></i>
                    </NavLink>

                    <NavLink to="/app/admin/users" className="flex items-center" aria-label="Users">
                        <i className="fa-solid fa-users"></i>
                    </NavLink>

                    <NavLink to="/app/admin/top/songs" className="flex items-center" aria-label="Top">
                        <i className="fa-solid fa-trophy"></i>
                    </NavLink>

                    <NavLink to="/app/profile" className="flex items-center" aria-label="Profile">
                        <i className="fa-regular fa-user"></i>
                    </NavLink>
                </nav>

                {/*/!* Desktop version *!/*/}
                {/*<div className="hidden text-sm text-center sm:block">*/}
                {/*    © Copyright {new Date().getFullYear()} Poppy Admin*/}
                {/*</div>*/}
            </footer>
        </>
    );
}

export default AdminLayout;
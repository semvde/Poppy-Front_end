import Button from "../../components/Button.jsx";
import {Link} from "react-router";
import Card from "../../components/Card.jsx";
import {useEffect, useState} from "react";
import {fetchAPI} from "../../services/Fetch.js";
import Toggle from "../../components/Toggle.jsx";
import {useNavigate, useLocation} from "react-router";

function Profile() {
    const [user, setUser] = useState({});
    let image = '/placeholder.jpg';

    // Admin Toggle
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/app/admin");

    const getGenres = async () => {
        const res = await fetchAPI('/auth/me');

        setUser(res);

        if (user.imageUrl !== undefined) image = user.imageUrl;
    }

    useEffect(() => {
        getGenres();
    }, []);

    // Admin Toggle
    const handleToggleChange = (e) => {
        const newValue = e.target.checked;

        if (newValue) {
            navigate("/app/admin/profile");
        } else {
            navigate("/app/profile");
        }
    };

    return (
        <>
            <section className={"py-10"}>
                <div className={"flex items-center gap-5"}>
                    <img src={image} alt="Profile Image"
                         className={"aspect-square object-cover rounded-full w-20"}/>
                    <div className={"flex flex-col justify-center w-full"}>
                        <h1 className={"text-3xl!"}>@{user.username}</h1>
                        <div className={"grid grid-cols-2 gap-2.5 pt-2.5"}>
                            <Button variant={"outline"} size={"sm"} as={"link"} to={"/app/profile/edit"}>Edit
                                Profile</Button>
                            <Button size={"sm"} as={"link"} to={"/app/settings"}>Settings</Button>
                            
                            {/*Admin Toggle*/}
                            {user.role === "admin" && (
                                <div
                                    className="col-span-2 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
                                    <span>Admin dashboard</span>
                                    <Toggle checked={isAdmin} onChange={handleToggleChange}/>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex flex-col gap-2.5"}>
                    <h2 className={"text-2xl!"}>Musical Bubble</h2>

                    <div>
                        <h3 className={"text-xl!"}>Top genres</h3>
                        <span className={"text-sm text-outline"}>Genres you listened to the most!</span>
                    </div>
                    <div className={"grid grid-cols-2 gap-2.5"}>
                        <div className={"grid grid-cols-5 items-center gap-2.5 bg-secondary rounded-xl"}>
                            <img src="/placeholder.jpg" alt=""
                                 className={"col-start-1 col-end-3 aspect-square object-cover rounded-l-xl"}/>
                            <span className={"col-start-3 col-end-8"}>Genre Title</span>
                        </div>
                        <div className={"grid grid-cols-5 items-center gap-2.5 bg-secondary rounded-xl"}>
                            <img src="/placeholder.jpg" alt=""
                                 className={"col-start-1 col-end-3 aspect-square object-cover rounded-l-xl"}/>
                            <span className={"col-start-3 col-end-8"}>Genre Title</span>
                        </div>
                    </div>

                    <div>
                        <h3 className={"text-xl!"}>Top artists</h3>
                        <span className={"text-sm text-outline"}>Artists you listened to the most!</span>
                    </div>
                    <div className={"grid grid-cols-2 gap-2.5"}>
                        <div className={"grid grid-cols-5 items-center gap-2.5 bg-secondary rounded-xl"}>
                            <img src="/placeholder.jpg" alt=""
                                 className={"col-start-1 col-end-3 aspect-square object-cover rounded-l-xl"}/>
                            <span className={"col-start-3 col-end-8"}>Artist Name</span>
                        </div>
                        <div className={"grid grid-cols-5 items-center gap-2.5 bg-secondary rounded-xl"}>
                            <img src="/placeholder.jpg" alt=""
                                 className={"col-start-1 col-end-3 aspect-square object-cover rounded-l-xl"}/>
                            <span className={"col-start-3 col-end-8"}>Artist Name</span>
                        </div>
                    </div>

                    <Button as={"link"} to={"/app/bubble"}><i className={"mr-2.5 fa-solid fa-chart-simple"}></i>Visualise</Button>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex flex-col gap-2.5"}>
                    <h2 className={"text-2xl!"}>Friends</h2>
                    <Button><i className={"mr-2.5 fa-solid fa-people-group"}></i>Friends list</Button>
                    <Button><i className={"mr-2.5 fa-solid fa-user-plus"}></i>Friend requests</Button>
                </div>
            </section>
        </>
    );
}

export default Profile;
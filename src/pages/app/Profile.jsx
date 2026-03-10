import Button from "../../components/Button.jsx";
import {Link} from "react-router";
import Card from "../../components/Card.jsx";

function Profile() {
    return (
        <>
            <section className={"py-10"}>
                <div className={"flex items-center gap-5"}>
                    <img src="/favicon.png" alt="Profile Image"
                         className={"aspect-square object-cover rounded-full w-20"}/>
                    <div className={"flex flex-col justify-center w-full"}>
                        <h1 className={"text-3xl!"}>@janmetdepet</h1>
                        <div className={"grid grid-cols-2 gap-2.5 pt-2.5"}>
                            <Button variant={"outline"} size={"sm"}>Edit Profile</Button>
                            <Button size={"sm"}>Settings</Button>
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
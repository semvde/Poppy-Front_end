import Button from "../../components/Button.jsx";

function Profile() {
    return (
        <>
            <section className={"py-10"}>
                <div className={"flex gap-5"}>
                    <img src="/favicon.png" alt="Profile Image"
                         className={"aspect-square object-cover rounded-full w-20"}/>
                    <div className={"flex flex-col justify-center"}>
                        <h1 className={"text-3xl!"}>Jan with the Cap</h1>
                        <span>@janmetdepet</span>
                    </div>
                </div>
                <div className={"flex flex-col gap-2.5 pt-2.5"}>
                    <Button variant={"outline"}><i className={"mr-2.5 fa-solid fa-user-pen"}></i> Edit personal
                        information</Button>
                    <Button><i className={"mr-2.5 fa-solid fa-gear"}></i>Settings</Button>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex flex-col gap-2.5"}>
                    <h2 className={"text-2xl!"}>Musical Bubble</h2>
                    <Button><i className={"mr-2.5 fa-solid fa-chart-simple"}></i>Visualise</Button>
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
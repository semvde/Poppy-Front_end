import Button from "../../components/Button.jsx";

function Friends() {
    return (
        <>

            <div className="flex flex-wrap gap-2.5 p-5 justify-center text-center">
                <h1>Friend Space</h1>
                <div className={"max-w-[65ch]"}>
                    <span className={"text-base text-outline"}>Here you can experience your friends music taste, learn what you have in common and explore new music through each other via recommendations done by the algorithm.</span>
                </div>
            </div>

            <section className={"pb-10"}>
                <div className={"flex flex-col gap-2.5"}>
                    <Button variant={"secondary"}><i className={"mr-2.5 fa-solid fa-user-plus"}></i>Friend
                        requests</Button>
                </div>
            </section>

            <div className="p-5">
                <h2>Friend list</h2>
            </div>

            <section className={"grid grid-cols-1 gap-2.5"}>
                <Button as={"link"}>
                    <div className="flex items-center justify-between w-full">

                        <span className="font-medium">@Username</span>

                        <Button className={"px-2!"}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Button>

                    </div>
                </Button>
            </section>

            {/*Voor als we de "You might know" gaan doen...*/}

            {/*<section>*/}
            {/*    <div className="p-5">*/}
            {/*        <h2>You might know</h2>*/}
            {/*    </div>*/}

            {/*    <Button as={"link"}>*/}
            {/*        <div className="flex items-center justify-between w-full">*/}

            {/*            <span className="font-medium">@Username</span>*/}

            {/*        </div>*/}
            {/*    </Button>*/}
            {/*</section>*/}


        </>
    )
}

export default Friends;
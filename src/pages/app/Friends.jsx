import Button from "../../components/Button.jsx";

function Friends() {
    return (
        <>
            <div className="p-5">
                <h1>Friend list</h1>
            </div>

            <section className={"grid grid-cols-1"}>
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
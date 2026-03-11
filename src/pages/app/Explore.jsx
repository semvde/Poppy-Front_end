import Button from "../../components/Button.jsx";

function Explore() {
    return (
        <>
            {/*searchbar*/}
            <section className="py-10 space-y-5">

                <div className="flex items-center gap-2 bg-body-light rounded-4xl px-4 py-2">
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        placeholder="Search genres, artists or friends..."
                        className="w-full bg-transparent outline-none"
                    />
                </div>

            </section>

            {/*Your top genres*/}
            <section className="pb-10 space-y-3 max-w-sm">
                <h1 className="text-xl! p-2.5">
                    Your top genres
                </h1>

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
            </section>

            {/*Explore new genres*/}
            <section className="pb-10 space-y-3">
                <h1 className="text-xl! p-2.5">
                    Explore new genres
                </h1>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    <Button as="link" className="relative w-100 h-45 aspect-square">
                        <img src="/placeholder.jpg" alt=""
                             className="absolute inset-0 w-full h-full object-cover"/>

                        <span className="absolute left-4 top-4">
                            Hardcore Mix
                        </span>
                    </Button>
                </div>
            </section>

            {/*    Explore subgenres*/}
            <section className="pb-10 space-y-3">
                <h1 className="text-xl! p-2.5">
                    Explore new subgenre
                </h1>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    <Button as="link" className="relative w-100 h-45 aspect-square">
                        <img src="/placeholder.jpg" alt=""
                             className="absolute inset-0 w-full h-full object-cover"/>

                        <span className="absolute left-4 top-4">
                            Hardcore Mix
                        </span>
                    </Button>
                </div>
            </section>

        </>
    );
}

export default Explore;
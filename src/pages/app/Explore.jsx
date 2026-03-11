import Button from "../../components/Button.jsx";

function Explore() {
    return (
        <>
            {/*searchbar*/}
            <section className="p-5 space-y-5">

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
            <section className="px-5 pb-5 space-y-3 max-w-sm">
                <h1 className="text-xl! p-2.5">
                    Your top genres
                </h1>

                <div className="grid grid-cols-2 gap-2">
                    <Button as="link" className="h-10 p-0 flex pl-0 rounded!">
                        <img src="/placeholder.jpg" alt="" className="h-10 w-10 -ml-8"/>
                        <span className="px-4 font-semibold">Rock</span>
                    </Button>
                </div>
            </section>

            {/*Explore new genres*/}
            <section className="px-5 pb-5 space-y-3">
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
            <section className="px-5 pb-5 space-y-3">
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
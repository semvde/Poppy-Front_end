import Button from "../../components/Button.jsx";

function Explore() {
    return (
        <>
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

            <section className="px-5 pb-5 space-y-3">
                <h1 className="text-xl! font-bold">
                    Your top genres
                </h1>

                <div className="grid grid-cols-2 gap-2">
                    <Button as="link" className="h-10 w-10 flex items-center pl-0 rounded!">
                        <img src="/placeholder.jpg" alt="" className="h-10 w-10 object-cover"/>
                        <span className="px-4 font-semibold">
                            Rock
                        </span>
                    </Button>

                    <Button as="link" className="h-10 w-10 flex items-center pl-0 rounded!">
                        <img src="/placeholder.jpg" alt="" className="h-10 w-10 object-cover"/>
                        <span className="px-4 font-semibold">
                            Rock
                        </span>
                    </Button>

                </div>
            </section>

            <section className="px-5 pb-5 space-y-3">
                <h2 className="text-xl! font-bold">
                    Explore new genres
                </h2>

                <div className="grid grid-cols-2 gap-2">
                   
                </div>
            </section>


        </>
    );
}

export default Explore;
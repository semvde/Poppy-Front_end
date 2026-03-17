import {fetchAPI} from "../../services/Fetch.js";
import {useEffect, useState} from "react";
import Button from "../../components/Button.jsx";

function Bubble() {

    const [bubbleItems, setBubbleItems] = useState([]);
    const [bubbleNewItems, setBubbleNewItems] = useState([]);

    const [activeItem, setActiveItem] = useState(null);

    const getGenreInfo = async () => {
        try {
            const data = await fetchAPI('/sliders', 'GET');

            console.log(data);

            const sliders = data.sliders;

            const sortedGenres = Object.entries(sliders)
                .map(([name, score]) => ({name, score}))
                .sort((a, b) => b.score - a.score);

            const topGenres = sortedGenres.slice(0, 3);
            const nextGenres = sortedGenres.slice(3, 6);

            setBubbleItems(topGenres);
            setBubbleNewItems(nextGenres);


        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    }

    function toggleRecom(e, name) {
        //stops the slide from opening the recommendation button
        e.stopPropagation();

        setActiveItem(prev => prev === name ? null : name);
    }

    useEffect(() => {
        getGenreInfo();
    }, []);


    return (
        <div className={"overflow-x-hidden sm:overflow-x-visible"}>
            <section className={"py-5"}>
                <div className={"flex flex-col items-center text-center"}>
                    <h1 className={"text-3xl!"}>Musical Bubble</h1>
                    <span className={"text-outline"}>Your musical taste visualised!</span>
                    <div className={"max-w-[65ch]"}>
                        <span className={"text-[12px] text-outline"}> Genres are rated with a multiplier between 0 and 2. The closer a genre is to 2, the more it fits your musical taste and the more the algorithm boosts it in your recommendations. Genres closer to 0 appear less prominently but can still show up.</span>
                    </div>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex justify-center overflow-visible"}>
                    {/*Big Bubble with music genres*/}
                    <div
                        className={"relative overflow-visible text-2xl border border-secondary rounded-full aspect-square w-full max-w-100 m-10 z-1"}>
                        {bubbleItems.map((item, i) => {
                            const angle = (360 / bubbleItems.length) * i;

                            const radius = (screen.width < 640) ? screen.width / 2 - 40 - 20 : 200;

                            return (
                                <div key={i} className={"absolute top-1/2 left-1/2 bg-body p-1"} style={{
                                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`
                                }}>
                                    <Button
                                        unstyled
                                        className={"capitalize"}
                                        onClick={(e) => toggleRecom(e, item.name)}>
                                        {item.name}
                                    </Button>

                                    {activeItem === item.name && (
                                        <div
                                            role="dialog"
                                            aria-live="polite"
                                            className="absolute bg-primary right-0 mr-1 w-30 p-2 rounded shadow-lg break-words
                                            sm:w-48 sm:left-auto sm:translate-x-0 sm:right-0"
                                        >
                                            <p className="text-sm">
                                                You listen to <strong className="capitalize">{item.name}</strong> a lot,
                                                and the algorithm boosts it by {item.score.toFixed(2)}x in your
                                                recommendations.
                                            </p>
                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={"-mt-75 pb-10"}>
                <div className={"flex justify-center"}>
                    {/*Smaller bubble with newly discovered genres*/}
                    <div
                        className={"animate-pulse relative aspect-square w-full max-w-100 m-10"}>
                        {bubbleNewItems.map((item, i) => {
                            const startAngle = 135;
                            const endAngle = 45;
                            const angle = startAngle + ((endAngle - startAngle) / (bubbleItems.length - 1)) * i;

                            const radius = (screen.width < 640) ? screen.width / 2 - 40 - 12 : 200;

                            return (
                                <div key={i}
                                     className={"absolute top-1/2 left-1/2 flex items-center bg-body aspect-square border border-secondary rounded-full p-2"}
                                     style={{
                                         transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`
                                     }}>
                                    <Button
                                        unstyled
                                        className={"capitalize"}
                                        onClick={(e) => toggleRecom(e, item.name)}>
                                        {item.name}
                                    </Button>
                                    <div>
                                        {activeItem === item.name && (
                                            <div
                                                role="dialog"
                                                aria-live="polite"
                                                className="absolute bg-primary right-0 mt-3 mr-1 w-25 p-2 rounded shadow-lg break-words
                                                sm:w-48 sm:left-auto sm:translate-x-0 sm:right-0"
                                            >
                                                <p className="text-sm">
                                                    <strong className={"capitalize"}>{item.name}</strong> is a recent
                                                    discovery that the algorithm boosts by {item.score.toFixed(2)}x in
                                                    your recommendations.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            );
                        })}


                    </div>


                </div>
            </section>
        </div>
    );
}

export default Bubble;
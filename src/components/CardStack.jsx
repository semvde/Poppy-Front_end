import {useEffect, useState} from "react";
import MusicCard from "./MusicCard.jsx";
import {fetchAPI} from "../services/Fetch.js";

function CardStack() {
    const [message, setMessage] = useState("");

    const getRecommendations = async () => {
        const {vector} = await fetchAPI('/profile/compute', 'POST')

        const {tracks} = await fetchAPI('/recommendations', 'POST', {
            'profileVector': vector,
            'limit': 5
        })

        console.log(tracks);

        setSongs(tracks);
    }

    const [songs, setSongs] = useState([{}])

    function handleSwipe(direction, song) {
        console.log(direction, song.title);

        if (direction === "right") {
            setMessage(`❤️ Successfully liked ${song.title}`);
        } else {
            setMessage(`😔 Successfully disliked ${song.title}`);
        }

        //remove previous card
        setSongs(prev => prev.slice(1));
    }

    //succesfully swiped message
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, 1500);

        return () => clearTimeout(timer);
    }, [message]);

    useEffect(() => {
        getRecommendations();
    }, []);

    return (

        <div className="p-10 flex flex-col items-center w-full min-h-[calc(100dvh-104px)]">

            {message && (
                <div className="mb-4 text-center text-color-info font-semibold text-lg">
                    {message}
                </div>
            )}

            <div className="flex flex-col items-center relative w-72 sm:w-80 md:w-96 min-h-fit">
                {songs.map((song, index) => {
                    const isOnTop = index === 0;
                    return (
                        <MusicCard
                            key={index}
                            song={song.track}
                            onSwipe={handleSwipe}
                            aria-label={`Stack of music cards`}

                            //dynamic
                            style={{
                                //stack cards behind each other
                                position: "absolute", margin: 'auto',

                                //stacking order
                                zIndex: songs.length - index,
                                transform: isOnTop ? "translateY(0px)" : `scale(${1 - 0.05 * index}) translateY(${10 * index}px)`,
                                transition: "transform 0.3s ease filter 0.3s ease",
                                filter: isOnTop ? "brightness(100%)" : "brightness(85%)",
                                boxShadow: isOnTop ? "shadow-lg" : "shadow-md"
                            }}>
                        </MusicCard>
                    )
                })}

                {songs.length === 0 && (
                    <div className="text-center text-gray-400 text-xl">
                        No more songs
                    </div>
                )}
            </div>
        </div>

    )
}

export default CardStack
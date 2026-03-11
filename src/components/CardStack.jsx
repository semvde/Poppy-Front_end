import {useEffect, useState} from "react";
import MusicCard from "./MusicCard.jsx";

function CardStack() {

    const [message, setMessage] = useState("");

    const [songs, setSongs] = useState([
        {
            id: 1,
            title: "Title 1",
            artist: "Artist 1",
            img: "/placeholder.png",
            url: "/559608__zhr__lonely-music.mp3",
            explanation: "This song is recommended because..."
        },
        {
            id: 2,
            title: "Title 2",
            artist: "Artist 2",
            img: "/placeholder.png",
            url: "/559608__zhr__lonely-music.mp3",
            explanation: "You might like this because..."
        },
        {
            id: 3,
            title: "Title 3",
            artist: "Artist 3",
            img: "/placeholder.png",
            url: "/559608__zhr__lonely-music.mp3",
            explanation: "Recommended for you..."
        }
    ])

    function handleSwipe(direction, song) {
        console.log(direction, song.title);

        if (direction === "right") {
            setMessage(`Successfully liked ❤️ ${song.title}`);
        } else {
            setMessage(`Successfully disliked 😔 ${song.title}`);
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

    return (

        <div className="p-10 flex flex-col justify-center items-center w-full">

            {message && (
                <div className="mb-4 text-center text-color-info font-semibold text-lg">
                    {message}
                </div>
            )}


            <div className="relative w-72 sm:w-80 md:w-96 h-96">
                {songs.map((song, index) => {
                    const isOnTop = index === 0;
                    return (
                        <MusicCard
                            key={song.id}
                            song={song}
                            onSwipe={handleSwipe}
                            aria-label={`Stack of music cards`}

                            //dynamic
                            style={{
                                //stack cards behind each other
                                position: "absolute",

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
import {useEffect, useState} from "react";
import MusicCard from "./MusicCard.jsx";
import {fetchAPI} from "../services/Fetch.js";

function CardStack() {
    const [message, setMessage] = useState("");

    const [songs, setSongs] = useState([{}])

    //smoother swipe
    const [swipedCards, setSwipedCards] = useState({});

    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading more recommendations...');


    const getRecommendations = async () => {
        setLoadingMessage('Loading more recommendations...')
        setLoading(true);
        const {vector} = await fetchAPI('/profile/compute', 'POST')

        console.log(vector);

        const {tracks} = await fetchAPI('/recommendations', 'POST', {
            'profileVector': vector,
            'limit': 5,
            'dial': Number(localStorage.getItem('dial')) || 3,
            'filters': {
                'unplayed': true
            }
        })

        for (const track of tracks) {
            const {url} = await fetchAPI(`/tracks/${track.track._id}/preview`);

            track.track.previewUrl = url;
        }

        console.log(tracks);

        setSongs(tracks);
        setLoading(false);
    }

    function handleSwipe(direction, song, index) {

        if (direction === "right") {
            setMessage(`❤️ Liked ${song.title?.replace(/\s*\(feat\..*?\)/i, '')}`);
        } else {
            setMessage(`😔 Disliked ${song.title?.replace(/\s*\(feat\..*?\)/i, '')}`);
        }

        // Set the card as swiped by value to true
        // This keeps track of which cards have been swiped without changing the others
        setSwipedCards((prev) => ({...prev, [index]: true}));

        // remove card from array after some time so loading message will appear eventually
        setTimeout(() => {
            setSongs(prev => prev.filter((_, i) => i !== index));
            setSwipedCards(prev => {
                const copy = {...prev};
                delete copy[index];
                return copy;
            });
        }, 300);

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

    useEffect(() => {
        if (songs.length === 0 && !loading) {
            getRecommendations().then(() => {
                if (songs.length === 0) {
                    setLoadingMessage('You have listened to every possible song... go touch grass 🥀')
                }
            });
        }
    }, [songs.length]);

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

                    //remove card if swiped
                    if (swipedCards[index]) return null;

                    return (
                        <MusicCard
                            key={index}
                            song={song.track}

                            // When the card is swiped, tell it which direction the swipe was, which song was on the card, the position in the stack
                            onSwipe={(direction) => handleSwipe(direction, song.track, index)}

                            aria-label={`Stack of music cards`}

                            //dynamic
                            style={{
                                //stack cards behind each other
                                position: "absolute", margin: 'auto',
                                width: "100%",
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
                        {loadingMessage}
                    </div>
                )}
            </div>
        </div>

    )
}

export default CardStack
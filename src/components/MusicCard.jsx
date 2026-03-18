import Card from "./Card.jsx";
import {useRef, useState, forwardRef, useEffect, useContext} from "react";
import Button from "./Button.jsx";
import Slider from "./Slider.jsx";
import {AppContext} from "../Contexts.jsx";
import {fetchAPI} from "../services/Fetch.js";


const MusicCard = forwardRef(
    function MusicCard(props, ref) {

        //all other props go in rest
        const {song = {}, onSwipe, ...rest} = props;


        // eslint-disable-next-line react-hooks/rules-of-hooks
        const cardRef = ref || useRef(null);

        let startPointX = useRef(0);
        let distance = useRef(0);
        let isDraggingCard = useRef(false);

        const [feedback, setFeedback] = useState("");


        const audioRef = useRef(null);
        const progressRef = useRef(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [progress, setProgress] = useState(0);
        const [duration, setDuration] = useState(0);
        const [hasPlayed, setHasPlayed] = useState(false);

        //recommendations
        const [showRecom, setShowRecom] = useState(false);
        const {genres} = useContext(AppContext);
        // console.log(genres);

        const topGenres = (song.genreVector ?? [])
            .map((score, index) => ({score, index}))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);


        //error
        const [audioError, setAudioError] = useState(null);

        const [isLoading, setIsLoading] = useState(true);

        const postPlay = async () => {
            const res = await fetchAPI(`/feedback/${song._id}/play`, 'POST');
        }

        const postFeedback = async (action) => {
            const res = await fetchAPI('/feedback', 'POST', {
                'trackId': song._id,
                'action': action
            })

            console.log(res);
        }

        // reset slider with new song
        useEffect(() => {

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            setIsPlaying(false);
            setProgress(0);
            setDuration(0);
            setHasPlayed(false);

            if (song.title) loadDuration();

            if (!song.previewUrl && song.title) setIsLoading(false);

        }, [song.previewUrl, song]);

        // update progress thumb
        useEffect(() => {
            if (progressRef.current) {
                progressRef.current.value = progress;
            }
        }, [progress]);

        useEffect(() => {
            if (progress >= 3 && isPlaying && !hasPlayed) {
                setHasPlayed(true);

                postPlay();
            }
        }, [progress, hasPlayed]);

        async function togglePlay() {
            const audio = audioRef.current;

            if (!audio) return;

            try {
                if (isPlaying) {
                    audio.pause();
                } else {
                    await audio.play();
                }
            } catch (error) {
                setAudioError("Failed to play");
                console.error(error);
            }


            setIsPlaying(!isPlaying);
        }

        //keeps track of the progress of the song that is playing
        function updateProgress() {
            const audio = audioRef.current;
            setProgress(audio.currentTime);
        }

        function loadDuration() {
            const audio = audioRef.current;
            setDuration(audio.duration);
        }

        //makes it possible to drag the progress bar
        function handleDragBar(e) {
            const audio = audioRef.current;
            audio.currentTime = e.target.value;
            setProgress(e.target.value);
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s < 10 ? "0" + s : s}`;
        }


        function handlePointerDown(e) {

            if (e.target.closest("button") || e.target.closest("input")) {
                return;
            }

            if (isLoading) return;

            isDraggingCard.current = true;

            //horizontal position of pointer
            startPointX.current = e.clientX;

            //keep swipe when pointer leaves card
            cardRef.current.setPointerCapture(e.pointerId);

        }

        function handlePointerMove(e) {

            if (!isDraggingCard.current) return;

            //calculates how much the card has moved
            distance.current = e.clientX - startPointX.current;

            //rotation from card
            const rotation = distance.current * 0.05;

            //moves the card horizontally
            cardRef.current.style.transform = `translateX(${distance.current}px) rotate(${rotation}deg)`;

            //threshold for swiping for when the emoji is shown
            const threshold = 50;
            if (distance.current > threshold) {
                setFeedback("❤️");
            } else if (distance.current < -threshold) {
                setFeedback("😔");
            } else {
                setFeedback("");
            }
        }

        function handlePointerUp() {
            isDraggingCard.current = false;
            setShowRecom(false);


            //25% screen width
            const swipeThreshold = window.innerWidth * 0.25;

            if (distance.current > swipeThreshold) {
                postFeedback('like')

                // setSwipeStatus("liked");
                //if onswipe isnt passed no error
                onSwipe?.("right", song);


            } else if (distance.current < -swipeThreshold) {
                postFeedback('dislike')

                // setSwipeStatus("disliked");
                onSwipe?.("left", song);


            } else {
                cardRef.current.style.transform = `translateX(0px)`;

            }

            distance.current = 0;
            setFeedback("");

        }

        function toggleRecom(e) {
            //stops the slide from opening the recommendation button
            e.stopPropagation();

            setShowRecom(!showRecom);
        }


        return (

            <Card
                ref={cardRef}
                tabIndex={0}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="flex flex-col rounded-xl p-5 bg-secondary touch-none user-none cursor-grab active:cursor-grabbing transition-transform duration-50 min-h-133.75"
                aria-label={`Music card: ${song.title} by ${song.artist}`}
                {...rest}>

                <div className={"flex justify-center"}>
                    <img
                        src={song.albumImages?.[0]?.url ?? '/placeholder.jpg'}
                        alt={`Album cover of ${song.title} from ${song.artist}`}
                        draggable={false}
                        className="object-cover w-64 h-64 mb-4 rounded-lg"
                    />
                </div>

                <div className="flex justify-between">
                    <div>
                        <h3>{song.title?.replace(/\s*\(feat\..*?\)/i, '') ?? 'Loading...'}</h3>
                        <h4>{song.artist ?? 'This may take a while...'}</h4>
                    </div>
                    <Button
                        onClick={toggleRecom}
                        aria-haspopup="dialog"
                        aria-expanded={showRecom}
                        aria-controls={`Recommendation-${song.id}`}
                        className="px-0! py-0! h-full bg-none! shadow-md shadow-primary"
                        aria-label={"Explanation of why this song is getting recommended"}>

                        {/*AI icon or friend profile*/}
                        <img src={"/favicon.png"} alt={"Recommendation info button"}
                             draggable={false}
                             className="w-7 h-7 s"/>
                    </Button>

                    {showRecom && (
                        <div
                            role="dialog"
                            aria-live="polite"
                            className="absolute bg-primary right-0 mt-6 mr-1 w-48 p-2 rounded shadow-lg">
                            <p className="text-sm">
                                This song is recommended because it matches your preferred genres: {" "}
                                {topGenres.map(g => `${genres[g.index]?.name} (${Math.round(g.score * 100)}%)`)
                                    .join(" and ")}.
                            </p>
                        </div>
                    )}
                </div>

                {
                    song.previewUrl !== undefined && <audio
                        ref={audioRef}
                        src={song.previewUrl}
                        onTimeUpdate={updateProgress}
                        onLoadedMetadata={() => {
                            loadDuration();
                            setIsLoading(false)
                        }}
                        onError={() => {
                            setAudioError("Can't load audio")
                            setIsLoading(false);
                        }}
                    />
                }

                {isLoading && song.previewUrl !== undefined && <p className="text-sm">Loading audio....</p>}

                {duration > 0 && (
                    <Slider
                        ref={progressRef}
                        min="0"
                        max={duration}
                        value={progress}
                        onChange={handleDragBar}
                        leftLabel={formatTime(progress)}
                        rightLabel={formatTime(duration)}
                        aria-label={"Progress of the song"}
                    />
                )}

                {audioError && (
                    <p className="text-red-500 text-sm mt-2">
                        {audioError}
                    </p>
                )}

                {
                    song.previewUrl !== undefined && <div className="flex justify-center">
                        <Button
                            onClick={togglePlay}
                            className="mt-2 w-full" variant={"secondary"}
                            aria-label={isPlaying ? "Pause song" : "Play song"}
                        >
                            {isPlaying ? "⏸" : "▶"}
                        </Button>
                    </div>
                }

                <div className="flex justify-between pt-2 mt-auto">
                    <Button size={"sm"} variant={"secondary"} className="text-2xl!"
                            onClick={() => {
                                postFeedback('dislike');
                                onSwipe("left", song);
                            }}
                            aria-label={`Dislike song ${song.title}`}>😔</Button>
                    <Button size={"sm"} variant={"secondary"} className="text-2xl!"
                            onClick={() => {
                                postFeedback('like');
                                onSwipe("right", song);
                            }}
                            aria-label={`Like song ${song.title}`}>❤️</Button>
                </div>

                {feedback && (
                    <div
                        className="absolute inset-0 flex items-center justify-center text-5xl font-bold pointer-events-none"
                    >
                        {feedback}
                    </div>
                )}

            </Card>

        )
    })


export default MusicCard;
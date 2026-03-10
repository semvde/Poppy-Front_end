import Card from "./Card.jsx";
import {useRef, useState, forwardRef, useEffect} from "react";
import Button from "./Button.jsx";
import Slider from "./Slider.jsx";


const MusicCard = forwardRef(
    function MusicCard(props, ref) {

        const song = {
            "title": "Title",
            "artist": "Artist",
            "img": "/placeholder.png",
            "url": "/559608__zhr__lonely-music.mp3",
            "explanation": "This song is recommended because..."
        }


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

        const [showRecom, setShowRecom] = useState(false);


        // reset slider with new song
        useEffect(() => {
            setProgress(0);
            setDuration(0);
        }, [song.url]);

        // update progress thumb
        useEffect(() => {
            if (progressRef.current) {
                progressRef.current.value = progress;
            }
        }, [progress]);

        function togglePlay() {
            const audio = audioRef.current;

            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
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

            //25% screen width
            const swipeThreshold = window.innerWidth * 0.25;

            if (distance.current > swipeThreshold) {
                console.log("liked")
                cardRef.current.style.transform = `translateX(100vw)`;

                audioRef.current.pause();

            } else if (distance.current < -swipeThreshold) {
                console.log("disliked")

                cardRef.current.style.transform = `translateX(-100vw)`;

                audioRef.current.pause();


            } else {
                cardRef.current.style.transform = `translateX(0px)`;

            }

            distance.current = 0;

        }

        function toggleRecom(e) {
            //stops the slide from opening the recommendation button
            e.stopPropagation();

            setShowRecom(!showRecom);
        }


        return (
            <article className="p-10 flex justify-center">


                <Card
                    ref={cardRef}
                    tabIndex={0}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    className="relative rounded p-5 bg-secondary touch-none user-none cursor-grab active:cursor-grabbing transition-transform duration-50"
                    aria-label={`Music card: ${song.title} by ${song.artist}`}
                    {...props}>


                    <img src={song.img} alt={`Album cover of ${song.title} from ${song.artist}`}
                         draggable={false}
                         className=" object-cover w-64 h-64 mb-4 rounded-lg"/>

                    <div className="flex justify-between">
                        <div>
                            <h3>{song.title}</h3>
                            <h4>{song.artist}</h4>
                        </div>
                        <Button
                            onClick={toggleRecom}
                            className="px-0! py-0! h-full bg-none! shadow-md shadow-primary"
                            aria-label={"Explanation of why this song is getting recommended"}>

                            {/*AI icon or friend profile*/}
                            <img src={"/favicon.png"} alt={"Recommendation info button"}
                                 draggable={false}
                                 className="w-7 h-7 s"/>
                        </Button>

                        {showRecom && (
                            <div
                                className="absolute bg-primary right-0 mt-6 mr-1 w-48 p-2 rounded shadow-lg">
                                <p className="text-sm">{song.explanation}</p>
                            </div>
                        )}
                    </div>

                    <audio
                        ref={audioRef}
                        src={song.url}
                        onTimeUpdate={updateProgress}
                        onLoadedMetadata={loadDuration}
                    />

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

                    <div className="flex justify-center">
                        <Button
                            onClick={togglePlay}
                            className="mt-2 w-full" variant={"secondary"}
                            aria-label={isPlaying ? "Pause song" : "Play song"}
                        >
                            {isPlaying ? "⏸" : "▶"}
                        </Button>
                    </div>


                    <div className="flex justify-between pt-2">
                        <Button size={"sm"} variant={"secondary"} className="text-2xl!"
                                aria-label={"Dislike song"}>😔</Button>
                        <Button size={"sm"} variant={"secondary"} className="text-2xl!"
                                aria-label={"Like song"}>❤️</Button>
                    </div>

                    {feedback && (
                        <div
                            className="absolute inset-0 flex items-center justify-center text-5xl font-bold pointer-events-none"
                        >
                            {feedback}
                        </div>
                    )}


                </Card>


            </article>
        )
    })


export default MusicCard;
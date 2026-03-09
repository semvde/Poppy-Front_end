import Card from "./Card.jsx";
import {useRef, useState} from "react";
import Button from "./Button.jsx";


function MusicCard() {

    const song = {
        "title": "Title 1",
        "artist": "Artist",
        "img": "img"
    }


    const cardRef = useRef(null);

    let startPointX = useRef(0);
    let distance = useRef(0);
    let isDraggingCard = useRef(false);

    const [feedback, setFeedback] = useState("");

    const [isPlaying, setIsPlaying] = useState(false);


    function handlePointerDown(e) {
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
            // like(song);
            console.log("liked")
            cardRef.current.style.transform = `translateX(100vw)`;

        } else if (distance.current < -swipeThreshold) {
            // dislike(song);
            console.log("disliked")

            cardRef.current.style.transform = `translateX(-100vw)`;

        } else {
            cardRef.current.style.transform = `translateX(0px)`;

        }

        distance.current = 0;

    }

    function togglePlay() {
        setIsPlaying(prev => !prev);
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
                className="relative w-64 sm:w-72 md:w-80 lg:w-96 h-[400px] p-5">

                <img src={"/placeholder.png"} alt={"image"} className=" object-cover w-full h-64 mb-4 rounded-lg "/>
                <h3>{song.title}</h3>
                <h4>{song.artist}</h4>

                <div className="flex justify-center my-4">
                    <Button
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause" : "Play"}
                        size={"sm"}
                        className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                    >
                        {isPlaying ? (
                            <div className="flex space-x-2">
                                <div className="w-2 h-6 bg-black"></div>
                                <div className="w-2 h-6 bg-black"></div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: `12px solid transparent`,
                                    borderBottom: `12px solid transparent`,
                                    borderLeft: `12px solid black`,
                                }}
                            ></div>
                        )}
                    </Button>
                </div>


                <div className={"flex justify-between pt-2"}>
                    <Button size={"sm"} variant={"secondary"}>😔</Button>
                    <Button size={"sm"} variant={"secondary"}>❤️</Button>
                </div>

                {feedback && (
                    <div
                        className={` absolute inset-0 flex items-center justify-center text-5xl font-bold pointer-events-none`}
                    >
                        {feedback}
                    </div>
                )}


            </Card>


        </article>
    )
}


export default MusicCard;
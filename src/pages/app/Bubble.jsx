function Bubble() {
    const bubbleItems = [
        {
            "name": "EDM",
            "listen_duration": 30
        },
        {
            "name": "House",
            "listen_duration": 25
        },
        {
            "name": "Pop",
            "listen_duration": 20
        }
    ];

    const bubbleNewItems = [
        {
            "name": "Rap",
            "listen_duration": 10
        },
        {
            "name": "Trance",
            "listen_duration": 5
        },
        {
            "name": "DnB",
            "listen_duration": 2
        }
    ];

    return (
        <>
            <section className={"py-10"}>
                <div className={"text-center"}>
                    <h1 className={"text-3xl!"}>Musical Bubble</h1>
                    <span className={"text-outline"}>Your musical taste visualised!</span>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex justify-center"}>
                    {/*Big Bubble with music genres*/}
                    <div
                        className={"relative text-2xl border border-secondary rounded-full aspect-square w-full max-w-100 m-10"}>
                        {bubbleItems.map((item, i) => {
                            const angle = (360 / bubbleItems.length) * i;

                            const radius = (screen.width < 640) ? screen.width / 2 - 40 - 12 : 200;

                            return (
                                <div key={i} className={"absolute top-1/2 left-1/2 bg-body p-1"} style={{
                                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`
                                }}>
                                    {item.name}
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
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Bubble;
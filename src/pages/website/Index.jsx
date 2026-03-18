function Index() {
    return (

        <div className="flex flex-col min-h-screen text-[var(--color-text)] bg-[var(--color-body)]">
            <header
                className="w-full flex flex-col justify-center items-center flex-1 px-6 py-20 sm:py-32 text-center relative overflow-hidden">
                <div
                    className="absolute -top-20 -left-20 w-72 h-72 bg-primary rounded-full opacity-30 animate-pulse motion-reduce:animate-none"></div>
                <div
                    className="absolute -bottom-24 -right-16 w-96 h-96 bg-secondary rounded-full opacity-20 animate-pulse motion-reduce:animate-none"></div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 z-10">Poppy</h1>
                <p className="text-xl sm:text-2xl md:text-3xl mb-6 mt-2 z-10">"Grow out of your bubble"</p>
                <p className="max-w-md sm:max-w-lg md:max-w-xl text-base sm:text-lg mb-8 z-10">
                    Discover music you didn’t know you needed. Break free from your bubble, explore new music, and let
                    AI guide you to your new favorite track.
                </p>

            </header>

            <section
                className="w-full flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 px-6 py-16 md:py-20">
                <div
                    className="flex-1 max-w-sm md:max-w-xs lg:max-w-sm bg-secondary bg-opacity-10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 md:hover:-translate-y-2">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">AI-Powered</h2>
                    <p className="text-text text-sm sm:text-base">
                        Music finds you. Let our AI Algorithm surprise you.
                    </p>
                </div>

                <div
                    className="flex-1 max-w-sm md:max-w-xs lg:max-w-sm bg-secondary bg-opacity-10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 md:hover:-translate-y-2">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Pop Your Bubble</h2>
                    <p className="text-text text-sm sm:text-base">
                        Explore music you never thought you’d love.
                    </p>
                </div>

                <div
                    className="flex-1 max-w-sm md:max-w-xs lg:max-w-sm bg-secondary bg-opacity-10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 md:hover:-translate-y-2">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Play & Discover</h2>
                    <p className="text-text text-sm sm:text-base">
                        Listen, swipe, and let the music guide your journey.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Index;
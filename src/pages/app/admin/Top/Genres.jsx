import Card from "../../../../components/Card.jsx";

function Genres() {

    const genres = [
        {name: "Pop", likes: 80},
        {name: "Hip-Hop", likes: 67},
        {name: "R&B", likes: 56},
        {name: "Indie", likes: 50},
        {name: "Punk", likes: 45},
        {name: "Dance", likes: 40},
        {name: "Electronic", likes: 30},
        {name: "Country", likes: 30},
        {name: "Latin", likes: 20},
        {name: "Reggae", likes: 10},
    ];

    const top10 = genres.slice(0, 10);
    const topGenres = top10[0];

    return (
        <>

            <section>
                <Card className="flex flex-col items-center">
                    <h1 className="text-xl!">{topGenres.name}</h1>
                    <img src="/genres/pop.webp" alt={topGenres.name} className="w-32 h-32 object-cover"/>
                </Card>

                <h1 className="text-xl! p-2.5">Top 10 Liked Genres</h1>

                <ol className="list-decimal pl-5 space-y-2.5">
                    {top10.map((genres, index) => (
                        <li key={index}>
                            <Card className="flex justify-between">
                                <span>{genres.name}</span>
                                <span>{genres.likes}%</span>
                            </Card>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}

export default Genres;
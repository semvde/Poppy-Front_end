import Card from "../../../../components/Card.jsx";

function Artists() {

    const artists = [
        {name: "Bad Bunny", likes: 80},
        {name: "Drake", likes: 67},
        {name: "Taylor Swift", likes: 56},
        {name: "The Weeknd", likes: 50},
        {name: "Zara Larsson", likes: 45},
        {name: "Dominic Fike", likes: 40},
        {name: "Olivia Dean", likes: 30},
        {name: "Sabrina Carpenter", likes: 30},
        {name: "Sombr", likes: 20},
        {name: "RAYE", likes: 10},
    ];

    const top10 = artists.slice(0, 10);
    const topArtist = top10[0];

    return (
        <>

            <section>
                <Card className="flex flex-col items-center">
                    <h1 className="text-xl!">{topArtist.name}</h1>
                    <img src="/artists/bad-bunny.jpg" alt={topArtist.name} className="w-32 h-32 object-cover"/>
                </Card>

                <h1 className="text-xl! p-2.5">Top 10 Liked Artists</h1>

                <ol className="list-decimal pl-5 space-y-2.5">
                    {top10.map((artist, index) => (
                        <li key={index}>
                            <Card className="flex justify-between">
                                <span>{artist.name}</span>
                                <span>{artist.likes}%</span>
                            </Card>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}

export default Artists;
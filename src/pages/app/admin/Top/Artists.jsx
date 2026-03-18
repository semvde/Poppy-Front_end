import Card from "../../../../components/Card.jsx";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

    const chartData = {
        labels: top10.map((artist) => artist.name),
        datasets: [
            {
                label: "Likes per artist",
                data: top10.map((artist) => artist.likes),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#8DD17E",
                    "#C9CBCF",
                    "#E76F51",
                    "#2A9D8F",
                ],
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#ffffff",
                },
            },
        },
    };

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

            <section>
                <h1 className="text-xl! flex justify-center p-5">Visual</h1>
                <Card className="p-5 flex justify-center">
                    <Doughnut data={chartData} options={chartOptions}/>
                </Card>
            </section>
        </>
    );
}

export default Artists;
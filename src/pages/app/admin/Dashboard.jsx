import {useEffect, useRef} from "react";
import Card from "../../../components/Card.jsx";
import Button from "../../../components/Button.jsx";

function Dashboard() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const canvas = chartRef.current;
        if (!canvas || !window.Chart) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new window.Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Rock", "Pop", "Hip-Hop", "EDM", "Jazz"],
                datasets: [
                    {
                        label: "Popular genres",
                        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        backgroundColor: [
                            "#ff6384",
                            "#36a2eb",
                            "#ffce56",
                            "#4bc0c0",
                            "#9966ff"
                        ],
                    }
                ],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "white"
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: "white"
                        },
                        grid: {
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    y: {
                        ticks: {
                            color: "white"
                        },
                        grid: {
                            color: "rgba(255,255,255,0.2)"
                        }
                    }
                }
            }
        });

    }, []);

    return (
        <>
            <section className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">

                <Button className="flex flex-col items-center gap-3 p-5 lg:p-3 rounded-xl">
                    <h1 className="text-xl! lg:text-base text-center">
                        Top Artist
                    </h1>

                    <img
                        src="/placeholder.jpg"
                        alt=""
                        className="w-full aspect-square object-cover rounded"
                    />
                </Button>

                <Button className="flex flex-col items-center gap-3 p-5 lg:p-3 rounded-xl">
                    <h1 className="text-xl! lg:text-base text-center">
                        Top genre
                    </h1>

                    <img
                        src="/placeholder.jpg"
                        alt=""
                        className="w-full aspect-square object-cover rounded"
                    />
                </Button>

                <Button className="flex flex-col items-center gap-3 p-5 lg:p-3 rounded-xl">
                    <h1 className="text-xl! lg:text-base text-center">
                        Current Users
                    </h1>
                    <span>5K</span>
                </Button>

                <Button className="flex flex-col items-center gap-3 p-5 lg:p-3 rounded-xl">
                    <h1 className="text-xl! lg:text-base text-center">
                        Swipes
                    </h1>
                </Button>

            </section>

            <section className="mt-10 space-y-3">
                <h1 className="text-xl!">Populair genres</h1>

                <Card>
                    <div className="h-80 ">
                        <canvas ref={chartRef}></canvas>
                    </div>
                </Card>
            </section>
        </>
    );
}

export default Dashboard;
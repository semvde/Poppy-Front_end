import {useContext, useEffect, useState} from "react";
import {fetchAPI} from "../../services/Fetch.js";
import Button from "../../components/Button.jsx";
import {useNavigate} from "react-router";
import {AppContext} from "../../Contexts.jsx";

function Onboarding() {
    const {genres, selectedGenres, setSelectedGenres} = useContext(AppContext);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState({
        error: ""
    });

    const toggleGenre = (genre) => {
        setSelectedGenres((prev) => {
            if (prev.includes(genre)) {
                return prev.filter((g) => g !== genre);
            } else {
                return [...prev, genre];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {error} = await fetchAPI('/onboarding', 'POST', {
            genres: selectedGenres,
            app: 'poppy'
        });

        if (error) {
            setErrorMessage(prev => ({
                error: error
            }));
            return;
        }

        navigate('/app');
    }

    return (
        <>
            <section className={"py-10"}>
                <div className={'text-center'}>
                    <h1 className={"text-2xl!"}>Select your favorite genres</h1>
                </div>
            </section>

            <section className={"pb-10"}>
                <div className={"flex justify-center flex-wrap gap-2.5"}>
                    {
                        genres.map((genre) => {
                            const isSelected = selectedGenres.includes(genre.name);

                            return (
                                <Button
                                    key={genre.index} variant={isSelected ? "primary" : "outline"}
                                    className={"capitalize"} onClick={() => toggleGenre(genre.name)}
                                >
                                    {genre.name}
                                </Button>
                            );
                        })
                    }
                </div>
                <div className={"flex flex-col gap-5 text-center pt-10"}>
                    <Button size={"lg"} onClick={handleSubmit} disabled={selectedGenres.length < 3}>Finish</Button>
                    {
                        selectedGenres.length >= 3
                            ? <span className={"text-outline"}>You selected enough genres</span>
                            : <span className={"text-outline"}>Select a minimum of 3 genres</span>
                    }
                </div>
            </section>
        </>
    );
}

export default Onboarding;
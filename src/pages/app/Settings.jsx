import Button from "../../components/Button.jsx";
import {useContext, useEffect, useState} from "react";
import FormField from "../../components/FormField.jsx";
import Slider from "../../components/Slider.jsx";
import Toggle from "../../components/Toggle.jsx";
import {AppContext} from "../../Contexts.jsx";
import {fetchAPI} from "../../services/Fetch.js";

function Settings() {
    const {genres} = useContext(AppContext);

    const [activeTab, setActiveTab] = useState("tab1");

    const [genreBlacklist, setGenreBlacklist] = useState([]);
    const [artistBlacklist, setArtistBlacklist] = useState([]);
    const [loadingBlacklist, setLoadingBlacklist] = useState(true);

    const [form, setForm] = useState({
        search: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getBlacklist = async () => {
        const {entries} = await fetchAPI('/blacklist');

        setGenreBlacklist(entries.filter(e => e.type === "genre"));
        setArtistBlacklist(entries.filter(e => e.type === "artist"));

        setLoadingBlacklist(false);
    }

    const addGenreToBlacklist = async (genre) => {
        setLoadingBlacklist(true);

        const {entries} = await fetchAPI('/blacklist', 'POST', {
            'type': 'genre',
            'value': genre
        });

        if (!entries) return;

        setGenreBlacklist(entries.filter(e => e.type === "genre"));
        setLoadingBlacklist(false);
    }

    const removeGenreFromBlacklist = async (entryId) => {
        setLoadingBlacklist(true);

        const {entries} = await fetchAPI(`/blacklist/${entryId}`, 'DELETE')

        if (!entries) return;

        setGenreBlacklist(entries.filter(e => e.type === "genre"));
        setLoadingBlacklist(false);
    }

    const addArtistToBlacklist = async () => {
        setLoadingBlacklist(true);

        const artist = form.search;
        setForm(prev => ({
            ...prev,
            ["search"]: ""
        }));

        const {entries} = await fetchAPI('/blacklist', 'POST', {
            'type': 'artist',
            'value': artist
        });

        if (!entries) return;

        setArtistBlacklist(entries.filter(e => e.type === "artist"));
        setLoadingBlacklist(false);
    }

    const removeArtistFromBlacklist = async (entryId) => {
        setLoadingBlacklist(true);

        const {entries} = await fetchAPI(`/blacklist/${entryId}`, 'DELETE')

        if (!entries) return;

        setArtistBlacklist(entries.filter(e => e.type === "artist"));
        setLoadingBlacklist(false);
    }

    const setDial = (value) => {
        localStorage.setItem('dial', value);
    }

    useEffect(() => {
        getBlacklist();
    }, []);

    const tabs = [
        {
            "id": "tab1",
            "label": "Genres"
        },
        {
            "id": "tab2",
            "label": "Artists"
        }
    ];

    const tabContent = {
        "tab1": (
            <>
                <span className={"text-base text-outline"}>Click on a genre to unblock it.</span>
                <div className={"flex flex-wrap gap-2.5"}>
                    {
                        genreBlacklist.length === 0 ? (
                            <p className={"text-secondary"}>You haven't blacklisted any genres.</p>
                        ) : (
                            genreBlacklist.map((genre) => (
                                <Button key={genre._id} variant="secondary" size="sm" className={"capitalize"}
                                        disabled={loadingBlacklist} onClick={() => removeGenreFromBlacklist(genre._id)}>
                                    {genre.value}
                                </Button>
                            ))
                        )
                    }
                </div>
                {
                    genres
                        .filter((genre) =>
                            !genreBlacklist.some((b) => b.value === genre.name)
                        ).length === 0 ? (
                        <p>All genres are blocked...</p>
                    ) : (
                        <p>Select a genre to add to blacklist</p>
                    )
                }
                <div className={"flex flex-wrap gap-2.5"}>
                    {
                        genres
                            .filter((genre) =>
                                !genreBlacklist.some((b) => b.value === genre.name)
                            )
                            .map((genre) => {
                                return (
                                    <Button key={genre.index} variant={"outline"} size={"sm"} className={"capitalize"}
                                            disabled={loadingBlacklist} onClick={() => addGenreToBlacklist(genre.name)}
                                    >
                                        {genre.name}
                                    </Button>
                                );
                            })
                    }
                </div>
            </>
        ),
        "tab2": (
            <>
                <span className={"text-base text-outline"}>Click on an artist to unblock them.</span>
                <div className={"flex flex-wrap gap-2.5"}>
                    {
                        artistBlacklist.length === 0 ? (
                            <p className={"text-secondary"}>You haven't blacklisted any artists.</p>
                        ) : (
                            artistBlacklist.map((artist) => (
                                <Button key={artist._id} variant="secondary" size="sm" className={"capitalize"}
                                        disabled={loadingBlacklist}
                                        onClick={() => removeArtistFromBlacklist(artist._id)}>
                                    {artist.value}
                                </Button>
                            ))
                        )
                    }
                </div>
                <FormField id={"search"} label={"Type a name to add to blacklist"} value={form.search}
                           onChange={handleInputChange}/>
                <Button onClick={() => addArtistToBlacklist()}>Block!</Button>
            </>
        )
    }

    return (
        <>
            <section className={"py-10"}>
                <div className={"text-center"}>
                    <h1 className={"text-3xl!"}>Settings</h1>
                    <span className={"text-outline"}>Take control of your algorithm!</span>
                </div>
            </section>

            <section className={"pb-10"}>
                <h2 className={"text-2xl!"}>Blacklist</h2>
                <span className={"text-outline"}>Never want to hear a specific genre or artist ever again? Block them here!</span>

                <div className={"mt-5"}>
                    <div className={"grid grid-cols-2 border-b border-outline"}>
                        {tabs.map((tab) => (
                            <button key={tab.id}
                                    className={`${activeTab === tab.id ? 'border-b-3 border-primary' : 'border-b-3 border-transparent text-outline hover:text-primary'}`}
                                    onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
                        ))}
                    </div>

                    <div
                        className={"flex flex-col gap-5 border-b border-secondary p-5"}>{tabContent[activeTab]}</div>
                </div>
            </section>

            <section className={"pb-10"}>
                <h2 className={"text-2xl!"}>Preferences</h2>
                <span className={"text-outline"}>Change how your algorithm recommends new music to you!</span>
                <div className={"flex flex-col gap-5 mt-5"}>
                    <Slider id={"dial"} leftLabel={"Familiar"} rightLabel={"Adventurous"}
                            defaultValue={localStorage.getItem('dial')} step={1}
                            min={1} max={5} onChange={(e) => setDial(e.target.value)}/>
                    <Toggle id={"ignore-activity"} label={"Don't train algorithm temporarily"}/>
                    <span className={"text-base text-outline -mt-6"}>Automatically disables in 00:00</span>
                </div>
            </section>
        </>
    );
}

export default Settings;
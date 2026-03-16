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

        setGenreBlacklist(entries);
        await getBlacklist();
    }

    const removeEntryFromBlacklist = async (entryId) => {
        setLoadingBlacklist(true);

        const {entries} = await fetchAPI(`/blacklist/${entryId}`, 'DELETE')

        if (!entries) return;

        setGenreBlacklist(entries);
        await getBlacklist();
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
                            <p className={"text-secondary"}>You haven't blacklisted any genres yet.</p>
                        ) : (
                            genreBlacklist.map((genre) => (
                                <Button key={genre._id} variant="secondary" size="sm" className={"capitalize"}
                                        disabled={loadingBlacklist} onClick={() => removeEntryFromBlacklist(genre._id)}>
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
                    <Button variant={"secondary"} size={"sm"}>Sorry guy</Button>
                    <Button variant={"secondary"} size={"sm"}>Dream</Button>
                    <Button variant={"secondary"} size={"sm"}>Taylor Slow</Button>
                </div>
                <FormField id={"search"} label={"Search an artist to add to blacklist"}/>
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

                <div className={"space-y-5 mt-5"}>
                    <div className={"grid grid-cols-2 border-b border-outline"}>
                        {tabs.map((tab) => (
                            <button key={tab.id}
                                    className={`${activeTab === tab.id ? 'border-b-3 border-primary' : 'border-b-3 border-transparent text-outline hover:text-primary'}`}
                                    onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
                        ))}
                    </div>

                    <div className={"flex flex-col gap-5"}>{tabContent[activeTab]}</div>
                </div>
            </section>

            <section className={"pb-10"}>
                <h2 className={"text-2xl!"}>Preferences</h2>
                <span className={"text-outline"}>Change how your algorithm recommends new music to you!</span>
                <div className={"flex flex-col gap-5 mt-5"}>
                    <Slider id={"familiar"} leftLabel={"Familiar"} rightLabel={"Adventurous"}/>
                    <Slider id={"instrumental"} leftLabel={"Instrumental"} rightLabel={"Lyrical"}/>
                    <Toggle id={"ignore-activity"} label={"Don't train algorithm temporarily"}/>
                    <span className={"text-base text-outline -mt-6"}>Automatically disables in 00:00</span>
                </div>
            </section>
        </>
    );
}

export default Settings;
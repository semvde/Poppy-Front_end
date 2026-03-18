import Button from "../../components/Button.jsx";
import {fetchAPI} from "../../services/Fetch.js";
import {useEffect, useState} from "react";

function Friends() {

    const [friends, setFriends] = useState([
        {
            "id": "user123",
            "username": "john_doe",
            "email": "john@example.com",
            "image": "https://...",
            "friendshipId": "9812364054123",
            "since": "2026-03-10T12:00:00.000Z",
            "status": "accepted"

        },
        {
            "id": "user1234",
            "username": "jane_doe",
            "email": "jane@example.com",
            "image": "https://...",
            "friendshipId": "9812364054123",
            "since": "2026-03-10T12:00:00.000Z",
            "status": "accepted"

        }
    ])

    const getFriendList = async () => {
        try {
            const data = await fetchAPI('/friends?userId={id}', 'GET');

            console.log(data);
            const friends = data.data;


            setFriends(friends);


        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    }

    useEffect(() => {
        // getFriendList();
    }, []);

    return (
        <>

            {/*searchbar*/}
            <section className="py-10 space-y-5">

                <div className="flex items-center gap-2 bg-body-light rounded-4xl px-4 py-2">
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        placeholder="Search friends..."
                        className="w-full bg-transparent outline-none"
                    />
                </div>

            </section>

            <div className="flex flex-wrap gap-2.5 p-5 justify-center text-center">
                <h1>Friend Space</h1>
                <div className={"max-w-[65ch]"}>
                    <span className={"text-base text-outline"}>Here you can experience your friends music taste, learn what you have in common and explore new music through each other via recommendations done by the algorithm.</span>
                </div>
            </div>


            <section className={"pb-10"}>
                <div className={"flex flex-col gap-2.5"}>
                    <Button as={"link"} to={"/app/friends/requests"} variant={"secondary"}><i
                        className={"mr-2.5 fa-solid fa-user-plus"}></i>Friend
                        requests</Button>
                </div>
            </section>

            <div className="p-5">
                <h2>Your friend list</h2>
            </div>

            <section className={"grid grid-cols-1 gap-2.5"}>
                {friends.filter((friend) => friend.status === "accepted").map((friend) => (
                    <Button key={friend.id} as={"link"}>
                        <div className="flex items-center justify-between w-full">

                            <span className="font-medium">{friend.username}</span>

                            <Button className={"px-2!"}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Button>

                        </div>
                    </Button>
                ))}
            </section>

            {/*Voor als we de "You might know" gaan doen...*/}

            {/*<section>*/}
            {/*    <div className="p-5">*/}
            {/*        <h2>You might know</h2>*/}
            {/*    </div>*/}

            {/*    <Button as={"link"}>*/}
            {/*        <div className="flex items-center justify-between w-full">*/}

            {/*            <span className="font-medium">@Username</span>*/}

            {/*        </div>*/}
            {/*    </Button>*/}
            {/*</section>*/}


        </>
    )
}

export default Friends;
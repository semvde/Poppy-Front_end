import {fetchAPI} from "../../services/Fetch.js";
import Button from "../../components/Button.jsx";
import {useEffect, useState} from "react";

function FriendRequest() {

    const [friendRequests, setFriendsRequest] = useState({
        incoming: [
            {
                id: "req1",
                sender: {
                    id: "user1",
                    username: "john_doe",
                    email: "john@example.com",
                    image: null
                },
                status: "pending",
                createdAt: "2026-03-17T09:48:11.293Z"
            }
        ],
        outgoing: [
            {
                id: "req2",
                receiver: {
                    id: "user2",
                    username: "jane_doe",
                    email: "jane@example.com",
                    image: null
                },
                status: "pending",
                createdAt: "2026-03-17T10:15:22.123Z"
            }
        ]
    })

    const getFriendRequest = async () => {
        try {

            const data = await fetchAPI('/friends/requests?userId={id}', 'GET');

            console.log(data);

            const friendRequests = data.data;

            setFriendsRequest(friendRequests);


        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    }

    const statusFriendRequest = async () => {
        try {
            const data = await fetchAPI('/friends/{requestId}', 'PATCH');

            console.log(data);


        } catch (error) {
            console.error("Error fetching friend requests:", error);
        }
    }

    useEffect(() => {
        // getFriendRequest()
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
                <h1>Friend Requests</h1>
            </div>

            <div className="p-5">
                <h2>Incoming</h2>
            </div>
            <section className={"grid grid-cols-1 gap-2.5"}>
                {friendRequests.incoming.map((request) => (
                    <Button key={request.id} as={"link"}>

                        <div className="flex items-center justify-between w-full">

                            <span className="font-medium">{request.sender.username}</span>

                            <Button className={"px-2!"}>
                                {/*<i className="fa-solid fa-ellipsis-vertical"></i>*/}
                                Accept
                            </Button>
                            <Button className={"px-2!"}>
                                {/*<i className="fa-solid fa-ellipsis-vertical"></i>*/}
                                Decline
                            </Button>
                            <Button className={"px-2!"}>
                                {/*<i className="fa-solid fa-ellipsis-vertical"></i>*/}
                                Block
                            </Button>

                        </div>

                    </Button>
                ))}
            </section>

            <div className="p-5">
                <h2>Sent</h2>
            </div>
            <section className={"grid grid-cols-1 gap-2.5"}>
                {friendRequests.outgoing.map((request) => (
                    <Button key={request.id} as={"link"}>

                        <div className="flex items-center justify-between w-full">

                            <span className="font-medium">{request.receiver.username}</span>

                            <Button className={"px-2!"}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Button>
                            <Button className={"px-2!"}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Button>
                            <Button className={"px-2!"}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Button>

                        </div>

                    </Button>
                ))}
            </section>


        </>
    )
}

export default FriendRequest;
import {fetchAPI} from "../../services/Fetch.js";
import Button from "../../components/Button.jsx";
import {useEffect, useState} from "react";

function FriendRequest() {


    const [friendRequests, setFriendsRequest] = useState({incoming: [], outgoing: []});
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");


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

    const searchUsers = async (username) => {
        if (!username) return setSearchResults([]);
        try {
            const data = await fetchAPI(`/friends/search?q=${encodeURIComponent(username)}`, "GET");
            setSearchResults(data.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };


    const sendFriendRequest = async (receiverId) => {
        try {
            const data = await fetchAPI('/friends/request', 'POST', {receiverId});

            console.log(data);

            setFriendsRequest(prev => ({
                ...prev,
                outgoing: [data.data, ...prev.outgoing]
            }));

            setSearchResults(prev => prev.filter(u => u.id !== receiverId));


        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    }

    const statusFriendRequest = async (requestId, newStatus) => {
        try {
            await fetchAPI('/friends/{requestId}', 'PATCH', {
                status: newStatus
            });


            console.log(newStatus);

            getFriendRequest();


        } catch (error) {
            console.error("Error updating friend requests:", error);
        }
    }


    useEffect(() => {
        getFriendRequest()
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
                        value={query}
                        onChange={(e) => {
                            const val = e.target.value;
                            setQuery(val);
                            searchUsers(val);
                        }}
                    />
                </div>

                {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 gap-2.5 mt-2">
                        {searchResults.map(user => (
                            <div key={user.id} className="flex justify-between items-center p-2 bg-body rounded-lg">
                                <span>{user.username}</span>
                                <Button onClick={() => sendFriendRequest(user.id)}>Add Friend</Button>
                            </div>
                        ))}
                    </div>
                )}

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

                            <Button onClick={() => statusFriendRequest(request.id, "accepted")} className={"px-2!"}>
                                {/*<i className="fa-solid fa-ellipsis-vertical"></i>*/}
                                Accept
                            </Button>
                            <Button onClick={() => statusFriendRequest(request.id, "rejected")} className={"px-2!"}>
                                {/*<i className="fa-solid fa-ellipsis-vertical"></i>*/}
                                Decline
                            </Button>
                            <Button onClick={() => statusFriendRequest(request.id, "blocked")} className={"px-2!"}>
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
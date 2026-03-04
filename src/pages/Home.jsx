import Button from "../components/Button.jsx";

function Home() {
    return (
        <>
            <Button variant={"primary"} aria-label={"Button"} size={"sm"}>Button </Button>
            <Button variant={"secondary"} size={"md"}>Button </Button>
            <Button variant={"outline"} size={"lg"}>Button </Button>

            <Button variant={"secondary"} to={"/"} size={"md"}>Button </Button>


        </>
    );
}

export default Home;
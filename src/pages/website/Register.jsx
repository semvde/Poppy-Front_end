import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";
import {Link} from "react-router";
import Toggle from "../../components/Toggle.jsx";

function Register() {
    return (
        <section className={"flex flex-col gap-5 min-h-[calc(100dvh-104px)] py-10"}>
            <h1 className={"text-3xl! text-center"}>Let's create an account</h1>
            <h2 className={"text-xl! text-center"}>Import from</h2>
            <Button><i className={"fa-brands fa-spotify"}></i> Spotify</Button>
            <Button><i className={"fa-brands fa-youtube"}></i> YouTube Music</Button>
            <Button><i className="fa-brands fa-itunes-note"></i> Apple Music</Button>
            <hr/>
            <h2 className={"text-xl! text-center"}>Or start from scratch</h2>
            <form onSubmit={(e) => e.preventDefault()} className={"flex flex-col grow gap-2.5"}>
                <FormField id={"username"} label={"Username"}/>
                <FormField id={"email"} label={"Email"}/>
                <FormField id={"password"} label={"Password"}/>
                <FormField id={"password_confirm"} label={"Confirm Password"}/>
                <Toggle id={"tos"} label={"I accept the Terms & Conditions"}/>
                <Button size={"lg"} type={"submit"} className={"mt-auto"}>Register</Button>
                <Link to={"/login"} className={"text-outline text-center"}>I already have an account</Link>
            </form>
        </section>
    );
}

export default Register;
import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";
import {Link} from "react-router";

function Login() {
    return (
        <section className={"flex flex-col gap-5 min-h-[calc(100dvh-104px)] py-10"}>
            <h1 className={"text-3xl! text-center"}>Login to your account</h1>
            <form onSubmit={(e) => e.preventDefault()} className={"flex flex-col grow gap-2.5"}>
                <FormField id={"email"} label={"Email"}/>
                <FormField id={"password"} label={"Password"}/>
                <Button size={"lg"} type={"submit"} className={"mt-auto"}>Login</Button>
                <Link to={"/forgot-password"} className={"text-outline text-center"}>Forgot password</Link>
            </form>
        </section>
    );
}

export default Login;
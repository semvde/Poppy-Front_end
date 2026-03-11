import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {fetchAPI} from "../../services/Fetch.js";

function Login() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState({
        invalid: ""
    });

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {message, token, user} = await fetchAPI('/auth/login', 'POST', {
            username: form.username,
            password: form.password
        });

        if (message) {
            setErrorMessage(prev => ({
                invalid: message
            }));
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);

        navigate('/app');
    };

    return (
        <section className={"flex flex-col gap-5 min-h-[calc(100dvh-104px)] py-10"}>
            <h1 className={"text-3xl! text-center"}>Login to your account</h1>
            <form onSubmit={handleSubmit} className={"flex flex-col grow gap-2.5"}>
                <FormField id={"username"} label={"Username"} value={form.username}
                           onChange={handleInputChange} required error={errorMessage.invalid}/>
                <FormField id={"password"} label={"Password"} type={"password"} value={form.password}
                           onChange={handleInputChange} required error={errorMessage.invalid}/>
                <Button size={"lg"} type={"submit"} className={"mt-auto"}>Login</Button>
                <Link to={"/forgot-password"} className={"text-outline text-center"}>Forgot password</Link>
            </form>
        </section>
    );
}

export default Login;
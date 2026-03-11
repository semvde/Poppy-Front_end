import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";
import {Link, useNavigate} from "react-router";
import Toggle from "../../components/Toggle.jsx";
import {useState} from "react";
import {fetchAPI} from "../../services/Fetch.js";

function Register() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState({
        username_email: "",
        password: ""
    });

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: ""
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

        if (form.password !== form.password_confirm) {
            setErrorMessage(prev => ({
                ...prev,
                password: 'Passwords don\'t match'
            }));
            return;
        }

        const {message} = await fetchAPI('/auth/signup', 'POST', {
            username: form.username,
            email: form.email,
            password: form.password
        });

        if (message) {
            setErrorMessage(prev => ({
                username_email: message
            }));
            return;
        }

        navigate('/login');
    };

    return (
        <section className={"flex flex-col gap-5 min-h-[calc(100dvh-104px)] py-10"}>
            <h1 className={"text-3xl! text-center"}>Let's create an account</h1>
            <form onSubmit={handleSubmit} className={"flex flex-col grow gap-2.5"}>
                <FormField id={"username"} label={"Username"} value={form.username} onChange={handleInputChange}
                           required error={errorMessage.username_email}/>
                <FormField id={"email"} label={"Email"} type={"email"} value={form.email} onChange={handleInputChange}
                           required error={errorMessage.username_email}/>
                <FormField id={"password"} label={"Password"} type={"password"} value={form.password}
                           onChange={handleInputChange} required error={errorMessage.password}/>
                <FormField id={"password_confirm"} label={"Confirm Password"} type={"password"}
                           value={form.password_confirm} onChange={handleInputChange} required
                           error={errorMessage.password}/>
                <Toggle id={"tos"} label={"I accept the Terms & Conditions"} required/>
                <Button size={"lg"} type={"submit"} className={"mt-auto"}>Register</Button>
                <Link to={"/login"} className={"text-outline text-center"}>I already have an account</Link>
            </form>
        </section>
    );
}

export default Register;
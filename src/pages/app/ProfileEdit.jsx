import {useEffect, useState} from "react";
import {fetchAPI} from "../../services/Fetch.js";
import FormField from "../../components/FormField.jsx";
import Button from "../../components/Button.jsx";

function ProfileEdit() {
    const [user, setUser] = useState({});
    const [image, setImage] = useState('/placeholder.jpg');

    const [form, setForm] = useState({
        username: "",
        email: "",
        image: null
    });

    const getProfile = async () => {
        const res = await fetchAPI('/auth/me');

        setUser(res);

        setForm({
            username: res.username ?? "",
            email: res.email ?? "",
            image: null
        });

        if (res.imageUrl) {
            const img = new Image();

            img.onload = () => setImage(res.imageUrl);
            img.onerror = () => setImage('/placeholder.jpg');

            img.src = res.imageUrl;
        } else {
            setImage('/placeholder.jpg');
        }
    }

    const handleInputChange = (e) => {
        const {name, value, files, type} = e.target;

        if (type === "file" && files[0]) {
            const previewUrl = URL.createObjectURL(files[0]);
            setImage(previewUrl);
        }

        setForm(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("username", form.username);
        data.append("email", form.email);
        data.append("role", user.role);
        data.append("status", 'active');

        if (form.image instanceof File) {
            data.append("image", form.image);
        }

        const res = await fetchAPI(`/users/${user.id}`, 'PUT', data)
        console.log(res);
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <>
            <section className={"py-10"}>
                <h1 className={"text-3xl! text-center mb-2.5!"}>Edit Profile</h1>
                <form onSubmit={handleSubmit} className={"flex flex-col gap-5"}>
                    <FormField id={'username'} label={'Username'} value={form.username} onChange={handleInputChange}
                               required/>
                    <FormField id={'email'} label={'Email'} value={form.email} onChange={handleInputChange} required/>
                    <FormField type={'file'} id={'image'} name={'image'} label={'Profile Picture'}
                               onChange={handleInputChange}/>
                    <span className={"text-sm text-outline"}>Leave empty if you don't want to change your picture</span>
                    <Button type={'submit'}>Update</Button>
                </form>
            </section>
        </>
    );
}

export default ProfileEdit;
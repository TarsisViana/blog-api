import { Form, redirect, useActionData } from "react-router-dom";
import fetcher from "../config/fetcher";

import InputField from "../components/InputField";
import Button from "../components/Button";


// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    try {
        const res = await fetcher(
            `${import.meta.env.VITE_SERVER_HOST}/auth/login`,
            {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        
        if (res.status === 400 || res.status === 401) {
            return "Invalid email or password."
        }
        const payload = await res.json()
        console.log(payload.success)

        //save the jwt in localStorage
        localStorage.setItem('jwt', JSON.stringify(payload.token))

        return redirect('/')
    } catch (err) {
        console.log(`Error: ${err}`)
        return redirect("/")
    }

}

export default function Login() {
    const loginErr = useActionData()
    return (
        <>
            <p>{loginErr}</p>
            <Form method="post">
                <InputField
                    type="email"
                    name="email"
                >Email address: <br />
                </InputField>
                <InputField
                    type="password"
                    name="password"
                >
                    <br />Password:<br />
                </InputField>
                <br />
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
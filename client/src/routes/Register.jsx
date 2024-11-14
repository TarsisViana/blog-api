import { Form, redirect, useActionData } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button"

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    try {
        const res = await fetch(
      `${import.meta.env.VITE_SERVER_HOST}/users`,
      {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      }
        )
        if (res.status === 400 || res.status === 401) {
            const payload = await res.json()
            const errors = objFromArr(payload.errors)
            return errors;
        }
        return redirect('/');
        
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

export default function Register() {
    const errors = useActionData();
    return (
        <>
            <Form method="post">
                <InputField
                    name="firstname"
                    type="text"
                >First Name:
                    {errors && errors.firstname &&
                        <i style={{ color: "red" }}>
                            {errors.firstname.msg}
                        </i>
                    }
                    <br />
                </InputField>

                <InputField
                    name="lastname"
                    type="text"
                ><br />Last Name:
                    {errors && errors.lastname &&
                        <i style={{ color: "red" }}>
                            {errors.lastname.msg}
                        </i>
                    }
                    <br />
                </InputField>

                <InputField
                    name="email"
                    type="email"
                ><br />Email: {errors && errors.email &&
                        <i style={{ color: "red" }}>
                            {errors.email.msg}
                        </i>
                    }<br />
                </InputField>

                <InputField
                    name="password"
                    type="password"
                ><br />Enter Password:
                    {errors && errors.password &&
                        <i style={{ color: "red" }}>
                            {errors.password.msg}
                        </i>
                    }
                    <br />
                </InputField>

                <InputField
                    name="confirmPw"
                    type="password"
                ><br />Confirm Password:
                    {errors && errors.confirmPw &&
                        <i style={{ color: "red" }}>
                            {errors.confirmPw.msg}
                        </i>
                    }
                    <br />
                </InputField>
                <br/>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

function objFromArr(arr) {
    let obj = {};
    arr.forEach( item => {
    obj = {... obj, [item.path]: item}
    });
    console.log(obj)
    return obj;
    
}
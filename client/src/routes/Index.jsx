import { Link,Form, redirect } from "react-router-dom";
import Article from "../components/Article";

// eslint-disable-next-line react-refresh/only-export-components
export async function action() {
  await fetch(`${import.meta.env.VITE_SERVER_HOST}/session/logout`,
    { credentials: "include" });
  
  return redirect("/")
}

export default function Index() {
  return (
    <>
      <Link to="/login">Login</Link>
      <br/>
      <Link to="/register">Register</Link>
      <br/>
      <Link to="/home">HomePage</Link>
      
      <Form method="post">
        <button>log out</button>
      </Form>
      <Article />
    </>
  );
}
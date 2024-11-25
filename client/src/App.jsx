import { Outlet, useLoaderData, Link,Form, redirect } from "react-router-dom"
import fetcher from "./config/fetcher";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return checkLogIn();
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action() {
  localStorage.removeItem('jwt');
  return redirect('/');
}

export default function App() {
  const admin = useLoaderData();

  return (
    <>
      <div>
        <Link to="/">Estudo Covilhã</Link>
          {admin
            ? <Form method="post"><button>LogOut</button></Form>
            : <Link to="/login">Login</Link>
          }
        {admin? <Link to="/home">Drive</Link>:null}  
      </div>
      <Outlet/>
    </>
    
  )
}

async function checkLogIn() {
  const token = localStorage.getItem('jwt');
  if (!token) return false;

  const url = `${import.meta.env.VITE_SERVER_HOST}/users`
  const res = await fetcher(url);
  if (res.status == 200) {
    const user = await res.json()
    return user;
  }
  else {
    localStorage.removeItem('jwt');
    return false;
  };
}

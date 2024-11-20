import { Outlet, useLoaderData } from "react-router-dom";
import fetcher from "../config/fetcher";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const res = await fetcher(
    `${import.meta.env.VITE_SERVER_HOST}/protected`,
        {    
          headers: {
            "Content-Type": "application/json",
          }
    }
  )

  const payload = await res.json();
  return payload;
}

export default function HomePage() {
  const data = JSON.stringify(useLoaderData())

  return (
    <>
      {data}
      <Outlet/>
    </>
)
}
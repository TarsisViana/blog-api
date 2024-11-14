import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const getToken = JSON.parse(localStorage.getItem('userJwt'))
  console.log(getToken)
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_HOST}/protected`,
        {    
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken}`
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
    </>
)
}
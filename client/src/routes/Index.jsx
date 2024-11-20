import { redirect, useLoaderData } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import fetcher from '../config/fetcher.js'

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const res = await fetcher(
    `${import.meta.env.VITE_SERVER_HOST}/posts/post-list`
  )
  const data = await res.json();
  console.log(data)
  return data;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action() {
  await fetch(`${import.meta.env.VITE_SERVER_HOST}/session/logout`,
    { credentials: "include" });
  
  return redirect("/")
}


export default function Index() {
  const arr = useLoaderData();

  return (
    <>
      <ArticleList articleArr= {arr} />
    </>
  );
}
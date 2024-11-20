import { redirect } from "react-router-dom";
import ArticleList from "../components/ArticleList";

// eslint-disable-next-line react-refresh/only-export-components
export async function action() {
  await fetch(`${import.meta.env.VITE_SERVER_HOST}/session/logout`,
    { credentials: "include" });
  
  return redirect("/")
}

export default function Index() {
  return (
    <>
      <ArticleList articleArr= {[{name:"one"},{name:"two"}]} />
    </>
  );
}
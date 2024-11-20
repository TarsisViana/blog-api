import { useLoaderData } from "react-router-dom";
import fetcher from "../config/fetcher"
import Article from "../components/Article";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}){
  const res = await getArticle(params.postId)
  const data = await res.json()
  return data;
}

export default function BlogPost() {
  const data = useLoaderData()
  console.log(data)
  return (
    <>
      <Article text={data.text} title={data.title} />
    </>
  )
}

async function getArticle(postId) {
  const res = await fetcher(`http://localhost:3000/posts/article/${postId}`)
  return res;
}
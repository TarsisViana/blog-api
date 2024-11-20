import fetcher from "../config/fetcher"

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}){
  return getArticle(params.postId)
}

export default function BlogPost(){
  return (
    <>
    </>
  )
}

async function getArticle() {
  const res = fetcher()
  return res
}
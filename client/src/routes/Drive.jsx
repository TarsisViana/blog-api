import { Link, Outlet, useLoaderData } from "react-router-dom"
import fetcher from "../config/fetcher"
import ArticleListItem from "../components/ArticleListItem";


// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  if (intent === 'delete') {
      console.log('hey');
      return null;
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return getFileList();
}

export default function Drive() {
  const files = useLoaderData();
  

  return (
    <>
      <h1>Admin Drive</h1>
      <Link to='/home/new-article'>Upload</Link>
      <p>Files</p>
      {files.length == 0 ? null
        : files.map(file => 
          <ArticleListItem key={file.id} file={file}/>
        )
      }
      <Outlet />
      </>
  )
}

async function getFileList() {
  try {
    const res = await fetcher(
    `${import.meta.env.VITE_SERVER_HOST}/posts/article-list`
    )
    const data = await res.json();
    return data;

  } catch (err) {
    console.log(err);
    return null;
  }
}


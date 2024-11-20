import { Form, redirect, useLoaderData } from "react-router-dom"
import fetcher from "../config/fetcher"

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}) {
  const formData = await request.formData()

  try {
    const res = await fetcher(
      `${import.meta.env.VITE_SERVER_HOST}/files/upload`,
      {
        method: 'post',
        body: formData,
        credentials: "include",
      }
    )
    const data = await res.json()
    console.log(data)

  } catch (err) {
    console.log(err)
  }
  return {ok:true}
  
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let user;
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_HOST}/users`,
    { credentials: "include" });
    user = await res.json()
    if (!user.isAuth) {
      return redirect('/login')
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  
  const { files } = await getFileList();
  const { folders } = await getFolderList()

  return { user, files, folders }
}

export default function HomePage() {
  const { user, files, folders}  = useLoaderData();
  return (
    <>
      <h1>Hello {user.firstname}</h1>
      <Form method="post"  encType="multipart/form-data">
        <input type="file" name="upload" />
        <input type="text" name="intent" style={{display:"none"}} value="file" readOnly/>
        <button type="submit">Submit</button>
      </Form>
      <Form method="post">
        <input type="text" name="folderName" />
        <input type="text" name="intent" style={{display:"none"}} value="folder" readOnly/>
        <button type="submit">New Folder</button>
      </Form>
      <p>folders</p>
        {folders.length == 0 ? null
          : folders.map(file => <p key={file.id}>{file.name}</p>)
        }
      <p>files</p>
      {files.length == 0 ? null
        : files.map(file => <p key={file.id}>{file.name}</p>)
      }
    </>
  )
}

async function getFileList(parentFolder) {
  const url = `${import.meta.env.VITE_SERVER_HOST}/files?parentFolder=${parentFolder}`
  try {
    const res = await fetch(
      url,
      { credentials: "include" }
    );

    const {fileList} = await res.json()
    return fileList;

  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getFolderList(parentFolder) {
  const url = `${import.meta.env.VITE_SERVER_HOST}/folders?parentFolder=${parentFolder}`
  try {
    const res = await fetch(
      url,
      { credentials: "include" }
    );

    const { folderList } = await res.json()
    return folderList;

  } catch (err) {
    console.log(err);
    return null;
  }
}
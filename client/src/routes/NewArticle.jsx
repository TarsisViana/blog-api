import { Form, useNavigate } from "react-router-dom"
import Modal from "../components/Modal";
import fetcher from "../config/fetcher";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}) {
  const formData = await request.formData()
  const response = await uploadFile(formData)
  console.log(response);
  return null;
}


export default function NewArticle() {
  const modal = true;
  const navigate = useNavigate();

  return (
    <>
      <Modal
        openModal={modal}
        closeModal={()=>navigate('/home')}
      >
        <h1>New Article</h1>
      <Form method="post" encType="multipart/form-data">
        <label>
          Title:
          <input type="text" name="articleTitle" />
        </label>
        <input type="file" name="upload" />
        <label>
          Number:
          <input type="number" name="number"/>
        </label>
        <button type="submit">Submit</button>
      </Form>
      </Modal>
    </>
    
  )
}


async function uploadFile(formData) {
  try {
    const res = await fetcher(
      `${import.meta.env.VITE_SERVER_HOST}/posts/upload`,
      {
        method: 'post',
        body: formData,
      }
    )
    const data = await res.json()
    return {data};

  } catch (err) {
    return {err}
  }
}
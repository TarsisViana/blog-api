import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function App() {
  const [post,setPost] = useState('')

  useEffect(() => {
    async function getPost() {
      const res = await fetch('http://localhost:3000/posts');
      const txt = await res.text()
      console.log(txt)
      setPost(txt)
    }
    getPost()
  })

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {post}
    </ReactMarkdown>
  )
}

export default App

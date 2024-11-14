import { useEffect, useState } from 'react'

//Markdown imports
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkFlexibleMarkers from 'remark-flexible-markers'

import "../assets/Joplin.css"

function Article() {
  const [post,setPost] = useState('')

  useEffect(() => {
    async function getPost() {
      const res = await fetch('http://localhost:3000/posts');
      const txt = await res.text()
      setPost(txt)
    }
    getPost()
  })

  return (
    <div style={{
      maxWidth: 600 + "px",
      margin: "auto"
    }}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkFlexibleMarkers]}>
      {post}
    </ReactMarkdown>
    </div>
  )
}

export default Article;

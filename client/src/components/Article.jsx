import PropTypes from 'prop-types'

//Markdown imports
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkFlexibleMarkers from 'remark-flexible-markers'

import "../assets/Joplin.css"


export default function Article({text,title}) {
  return (
    <div style={{
      maxWidth: 600 + "px",
      margin: "auto"
    }}>
      <h1>{title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkFlexibleMarkers]}>
      {text}
    </ReactMarkdown>
    </div>
  )
}



Article.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string
} 
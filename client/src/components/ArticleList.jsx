import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default function ArticleList({ articleArr }) {
  
  if (articleArr) {
    return (
      <>
        {
        articleArr.map((article) => {
          return <><Link
            to= {`/post/${article.id}`}
            key={article.id}
          >{article.title}</Link><br/></>
        })
      }
    
      </>
    )
      
  }
  return null
}

ArticleList.propTypes = {
  articleArr: PropTypes.array,
} 
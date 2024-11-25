import PropTypes from "prop-types"
import { Form } from "react-router-dom"

export default function ArticleListItem({file}) {
  return (
    <>
      <span>{file.title}</span>
      <Form style={{display:'inline-block'}} method='post'>
        <input
          name='intent'
          style={{ display: 'none' }}
          value='delete'
          readOnly
        />
        <input
          type="text"
          name="id"
          value={file.id}
          style={{ display: 'none' }}
          readOnly
        />
        <button type='submit'>delete</button>
      </Form>
    </>
  )
}

ArticleListItem.propTypes = {
  file: PropTypes.object
}
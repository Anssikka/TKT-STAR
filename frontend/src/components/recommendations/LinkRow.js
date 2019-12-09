import React from 'react'
import { Link } from 'react-router-dom'
import Row from '../common/Row'
import '../../styles/Button.css'

function LinkRow() {
  return (
    <Row>
      <Link className="button-reverse" to="/recommendations/books">
        Add a Book
      </Link>
      <Link className="button-reverse" to="/recommendations/videos">
        Add a Video
      </Link>
      <Link className="button-reverse" to='/recommendations/blogs'>
        Add A Blog
        </Link>
    </Row>
  )
}

export default LinkRow

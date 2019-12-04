import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <main>
      <p>Front page</p>
      <Link to="/recommendations/books">Books</Link>
      <br/>
      <Link to="/recommendations/videos">Videos</Link>
    </main>
  )
}

export default HomePage

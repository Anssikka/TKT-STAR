import React from 'react'
import Blog from './Blog'
import '../../styles/RecommendationList.css'

function BlogList({ blogs }) {
  const mapToBlogs = () => {
    return blogs.map(blog => <Blog key={blog.id} {...blog} />)
  }

  return <div className="recommendation-list">{Array.isArray(blogs) && mapToBlogs()}</div>
}

export default BlogList

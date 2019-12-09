import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import AddBlogForm from '../components/blogs/AddBlogForm'
import PageTitle from '../components/PageTitle'
import PageSubtitle from '../components/PageSubtitle'
import BlogList from '../components/blogs/BlogList'
import '../styles/RecommendationPage.css'

function BlogPage() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogs()
  },[])

  const getBlogs = async () => {
    try {
      const savedBlogs = await blogService.getBlogs()
      setBlogs(savedBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const addBlog = async blog => {
    try {
      const createdBlog = await blogService.createBlog(blog)
      setBlogs(blogs.concat(createdBlog))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="recommendation-page">
      <PageTitle title="Blog Recommendations" />
      <PageSubtitle title="Add a Blog" />
      <AddBlogForm handleSubmit={addBlog} />
      <BlogList blogs={blogs} />
    </main>
  )
}

export default BlogPage

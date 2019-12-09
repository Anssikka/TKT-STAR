import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import VideoPage from './pages/VideoPage'
import BlogPage from './pages/BlogPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/recommendations/books" render={() => <BookPage />} />
        <Route path="/recommendations/videos" render={() => <VideoPage />} />
        <Route path="/recommendations/blogs" render={() => <BlogPage />} />
      </Router>
    </div>
  )
}

export default App

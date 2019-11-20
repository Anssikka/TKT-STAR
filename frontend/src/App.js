import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/recommendations/books" render={() => <BookPage />} />
      </Router>
    </div>
  )
}

export default App
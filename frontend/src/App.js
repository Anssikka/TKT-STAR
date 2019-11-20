import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={() => <HomePage />} />
      </Router>
    </div>
  )
}

export default App

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/about' element={<h1>Hello about</h1>}/>
      </Routes>
    </Router>
  )
}

export default App

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
<<<<<<< HEAD
import Feed from './pages/Feed'
=======
>>>>>>> 7831cf6 (add files pages  folder)

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/create-post' element={<CreatePost/>}/>
<<<<<<< HEAD
        <Route path='/feed' element={<Feed/>}/>
=======
        <Route path='/about' element={<h1>Hello about</h1>}/>
>>>>>>> 7831cf6 (add files pages  folder)
      </Routes>
    </Router>
  )
}

export default App

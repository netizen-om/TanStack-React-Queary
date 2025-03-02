import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { fetchPosts } from './api/api'
import PostList from './components/postList';
import './App.css';

function App() {

  const [toggle, setToggle] = useState(true)
  
  return <div>
    
  <h2 className='title'>My Posts</h2>
  <button onClick={() => setToggle(!toggle)}> Toggle List </button>
  {  toggle && <PostList />}
    
    
  </div>
  
}

export default App
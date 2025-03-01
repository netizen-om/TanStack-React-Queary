import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchPosts } from './api/api'
import PostList from './components/postList';


function App() {

  // const {data, isLoading, error, isError, status} = useQuery({
  //   queryKey : "posts",
  //   queryFn : fetchPosts,
  // });

  // console.log(data,isLoading);
  // console.log("status : ", status);
  // console.log("isError : " , isError);
  
  return <div>
    
  <h2 className='title'>My Posts</h2>
  <PostList />
    
    
  </div>
  
}

export default App
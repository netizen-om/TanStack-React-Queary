import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { addPost, fetchPosts, fetchTags } from '../api/api'

function PostList() {

    const quearyClient = useQueryClient()

    const {data:postData ,isError, error , isLoading} = useQuery({
        queryKey : ["posts"],
        queryFn : fetchPosts
    });

    const { mutate, isError: isPostError, isPending, reset } = useMutation({
        mutationFn: addPost,
        onMutate : () => {
            return {id : 1}
        },
        onSuccess : (data, variable, context) => {
            quearyClient.invalidateQueries({
                queryKey : ["posts"],
                exact : ture
            })
        },
        onError : (error, variable, context) => {},
        onSettled : (data, error, variable, context) => {}
    })

    const { data:tagsData } = useQuery({
        queryKey : ["tags"],
        queryFn : fetchTags
    })

    const HandleSubmit = async(e) => {
        e.preventDefault()
        
        const fromData = new FormData(e.target)
        const title = fromData.get("title")
        const tags = Array.from(fromData.keys("tags"))?.filter(
            (key) => fromData.get(key) === "on"
        )

        if(!title || !tags) return

        mutate({id: postData.length+1, title, tags})

        e.target.reset
    }

  return <div className='container'>

    <form onSubmit={HandleSubmit}>
        <input 
        type="text" 
        placeholder='Enter your post...'
        className='postbox'
        name='title'
        />

        <div className='tags'>
            {tagsData?.map((tag) => {
                return (
                    <div key={tag}>
                        <input type="checkbox" id={tag} name={tag}/>
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                )
            })}
        </div>
        <button>Post</button>
    </form>

    {(isLoading || isPending) && <p>Loading.......</p>}
        {isError && <p>{error?.message}</p>}
        {isPostError && <p onClick={() => reset()}>Unable to post</p>}

            {postData?.map((post) => {
                return <div key={post.id} className='post'>
                    <div>{post.title}</div>
                    {post.tags.map((tag) => {
                        return <span key={tag}>{tag}</span>
                    })}
                </div>
            })}

  </div>
}

export default PostList
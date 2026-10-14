import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Feed() {

    const [posts,setPosts]=useState([
    //    {
    //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBB4LQTn0vRq4ydPLp-uTj_lEUHOHYWUU18JlCq5KuMw&s=10",
    //     caption:"Butterfly",
    //     _id:1

    //    } 
    
    ])

    useEffect(()=>{
    const fetchPost =async()=>{

    try{
        const res=await axios.get('http://localhost:3000/posts')
       
        
        setPosts(res.data.posts)

    }
    catch(err)  {
      console.log('Error fething posts',err);
    }
}
    fetchPost()
 },[])
  return (
    <div>
        <section className='feed-section'>
         { posts.length>0? (
                posts.map((post)=>(
                   <div key={post._id} className='post-card'>
                    <img src={post.image} alt="" />
                    <h3>{post.caption}</h3>
                   </div> 

                ))
            ):(
                <h1>No post Available</h1>
            )
        

         }
        </section>
      
    </div>
  )
}

export default Feed

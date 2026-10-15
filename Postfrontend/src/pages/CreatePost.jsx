import axios from 'axios'
import React, { useState } from 'react'


function CreatePost() {
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData=new FormData(e.target)
    try{
       const setPost=axios.post('http://localhost:3000/create-post',formData)
      console.log('post created successfully',formData);
      e.target.reset()
    }
       catch(err){
        console.log('Error in creating post',err);
        

       }
      

  }

  
  return (
    <div>
        <section className='create-post-section'>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}
                >
                <input type="file" name="image" accept='image/*' placeholder='Enter Image File' />
                <input type="text" name="caption" required placeholder='Enter Caption' />
                <button  type='submit'>Submit</button>

            </form>

        </section>
      
    </div>
  )
}

export default CreatePost

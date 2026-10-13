import React from 'react'
import { Form } from 'react-router-dom'

function CreatePost() {
  return (
    <div>
        <section className='create-post-section'>
            <h1>Create Post</h1>
            <form>
                <input type="file" name="image" accept='image/*' placeholder='Enter Image File' />
                <input type="text" name="caption" required placeholder='Enter Caption' />
                <button type='submit'>Submit</button>

            </form>

        </section>
      
    </div>
  )
}

export default CreatePost

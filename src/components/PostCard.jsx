import React from 'react'
import {Link} from 'react-router-dom';
import service from '../appwrite/config';

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 p-4 rounded-md'>
            <div className='mb-4 w-full justify-center'>
                <img className='rounded-xl' src={service.getPreviewFile(featuredImage)} alt={title} />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
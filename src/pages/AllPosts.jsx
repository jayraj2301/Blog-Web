import React from 'react'
import service from '../appwrite/config';
import Container from '../components/container/Container';
import {PostCard} from '../components/index';

function AllPosts() {

    const [posts, setPosts] = React.useState([])

    React.useEffect(()=>{
        service.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-2'>
                    {posts.map(post => (
                        <div key={post.$id} className='py-2 w-1/3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
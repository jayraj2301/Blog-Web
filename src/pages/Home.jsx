import React from 'react'
import service from '../appwrite/config';
import Container from '../components/container/Container';
import {PostCard} from '../components/index';

function Home() {

    const [posts, setPosts] = React.useState([])

    React.useEffect(()=>{
        service.getPosts([]).then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])

    if (posts.length == 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl text-black font-bold hover:text-gray-500'>No Posts yet</h1>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home
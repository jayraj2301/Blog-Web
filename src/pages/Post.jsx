import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import Container from '../components/container/Container';
import { Button } from '../components';
import parse from 'html-react-parser';

function Post() {

    const [post, setPost] = React.useState(null);
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const {slug} = useParams()

    const isAuthor = post && userData ? userData.$id === post.userId : false;

    React.useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((post)=>{
                if (post) {
                    setPost(post)
                }else{
                    navigate("/")
                }
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])

    const deletePost = async ()=>{
        await service.deletePost(slug).then((status)=>{
            if (status) {
                service.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img 
                        src={service.getPreviewFile(post.featuredImage)}
                        alt={post.title}
                        className='rounded-xl'
                    />
                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className='bg-green-500'>Edit</Button>
                            </Link>
                            <Button className='bg-red-500' onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
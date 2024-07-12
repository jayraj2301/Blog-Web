import React from 'react'
import {PostForm} from '../components/index';
import Container from '../components/container/Container';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';

function EditPost() {

    const [post, setPost] = React.useState(null);
    const navigate = useNavigate()
    const {slug} = useParams()

    React.useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((post)=>{
                if (post) {
                    setPost(post)
                }
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
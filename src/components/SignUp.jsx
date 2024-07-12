import React from 'react';
import {Link , useNavigate} from 'react-router-dom';
import authService from '../appwrite/auth';
import {Button , Input,Logo} from './index';
import {useForm} from 'react-hook-form';
import {login} from '../store/authSlice';
import {useDispatch} from 'react-redux';

function SignUp() {

    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = React.useState("")
    const dispatch = useDispatch()

    const createAccount = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='flex w-full justify-center items-center'>
        <div className='bg-gray-300 max-w-lg rounded-lg p-5 w-full mx-auto'>
            <div className='mb-2 flex justify-center'>
                <span className='w-full max-w-[100px] inline-block'>
                    <Logo />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
            Already have an Account?&nbsp;
            <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign In
            </Link> 
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(createAccount)}>
            <Input 
                label="Full Name"
                placeholder="Enter your name"
                {...register("name", {
                required:true
                })}
            />
            <Input 
                type="email"
                label="Email"
                placeholder="Enter your email"
                {...register("email", {
                required: true,
                validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                }
                })}
            />
            <Input 
                type="password"
                label="Password"
                placeholder="Enter your password"
                {...register("password", {
                required:true
                })}
            />
            <Button type='submit' className='w-full'>
                Sign up
            </Button>
            </form>
        </div>
        </div>
    )
}

export default SignUp
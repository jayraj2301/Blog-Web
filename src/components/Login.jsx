import React from 'react';
import {Link , useNavigate} from 'react-router-dom';
import authService from '../appwrite/auth';
import {Button , Input,Logo} from './index';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {login as authLogin} from '../store/authSlice';

function Login() {

  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const [error, setError] = React.useState("")
  const dispatch = useDispatch()

  const login = async(data)=> {
    setError("")
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          navigate("/")
        }
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
          Don&apos;t have an Account?&nbsp;
          <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign Up
          </Link> 
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
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
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
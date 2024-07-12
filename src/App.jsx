import { useEffect, useState } from 'react'
import { Footer, Header } from './components/index'
import { useDispatch } from 'react-redux'
import {login,logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import authService from './appwrite/auth';

function App() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      authService.getCurrentUser()
        .then((userData)=>{
          if (userData) {
            dispatch(login({userData}))
          }else{
            dispatch(logout())
          }
        })
        .finally(()=>{
          setLoading(false)
        })
    },[])

    return !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-rose-400'>
        <div className='w-full block'>
          <Header />
          <main>
          <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : null
}

export default App

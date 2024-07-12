import  Container  from '../container/Container'
import React from 'react';
import {Logo} from '../index';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LogoutBtn from './LogoutBtn';

function Header() {

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    }
  ]

  return (
    <header>
      <Container>
        <nav className='sm:flex sm:justify-between mb-5'>
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="sm:hidden inline-block float-end">
            <button onClick={()=>{setOpen((prev)=>!prev)}} type='button' className='block'>
              <svg className={`${open ? "block": "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className={`${!open ? "block": "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className={`${!open ? "block": "hidden"} px-2 pt-2 sm:flex`}>
            {navItems.map((item) => 
              item.active ? (
              <li key={item.name} className='mr-2'>
                <button
                  onClick={() => navigate(item.slug)}
                  className='block px-6 py-2 duration-200 w-full rounded mb-2 sm:bg-gray-400 hover:bg-blue-100 bg-gray-300'
                  >{item.name}</button>
              </li>) : null
            )}
            <li>
              {authStatus && (
                <LogoutBtn />
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
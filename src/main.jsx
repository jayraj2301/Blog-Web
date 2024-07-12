import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js';
import { AuthLayout } from './components/index.js'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AddPost from './pages/AddPost.jsx';
import AllPosts from './pages/AllPosts.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          )
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
            {" "}
              <AllPosts />
            </AuthLayout>
          )
      },
      {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
            {" "}
              <AddPost />
            </AuthLayout>
          )
      },
      {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
            {" "}
              <EditPost />
            </AuthLayout>
          )
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>,
)
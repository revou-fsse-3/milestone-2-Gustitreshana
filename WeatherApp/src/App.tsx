import './App.css'
import { useState, useEffect } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { HomeContainer } from './containers'
import LoginContainer from './containers/LoginContainer'
import RegisterContainer from './containers/RegisterContainer'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = window.sessionStorage.getItem('token');
  //   setIsLoggedIn(!!token);
  // }, []);

  // const token = window.sessionStorage.getItem('token')
  // console.log(token)
  // const isLoggedIn = !!token

  const [isLoggedIn, setIsLoggedIn] = useState(!!window.sessionStorage.getItem('token'));

  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    // Listen for login event
    window.addEventListener('login', handleLogin);

    return () => {
      // Cleanup the event listener
      window.removeEventListener('login', handleLogin);
    };
  }, []);


  const routes = createBrowserRouter([{
    element: <MainLayout/>,
    children: [{
      path: '/',
      element: <LoginContainer/>
    },
    {
      path: '/home',
      element: isLoggedIn ? <HomeContainer/> : <Navigate to="/login"/>,
    },
    {
      path: '/login',
      element: <LoginContainer/>
    },
    {
      path: '/register',
      element: <RegisterContainer/>
    },
    {
      path: '*',
      element: <h1>Page Not Found</h1>
    }
  ]
  }])

  return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App

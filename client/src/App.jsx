import React from 'react'
import {createBrowserRouter, RouterProvider, Route, Link} from 'react-router-dom';
import Routes from './routes/Routes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Routes />
    }
])
const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
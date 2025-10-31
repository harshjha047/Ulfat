import React from 'react'
import Dashboard from './Pages/Dashboard'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster/>
      <Outlet/>
    </>
  )
}

export default App
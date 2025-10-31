import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigationBar from './Components/Nav/MainNavigationBar'
import MainFooter from './Components/Footer/MainFooter'
import { Toaster } from 'react-hot-toast'
import Menu from './Components/Menu/Menu'

function App() {
  return (<>
  <div className="bg-[#fffdfa]">
    <MainNavigationBar/>
      <Toaster />
      <Menu/>
    <Outlet/>
    <MainFooter/>
    </div>

    </>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Home from './pages/share/Home'
import Account from './pages/user/Account'
import UserNavbar from './componants/UserNavbar'
import AdminNavbar from './componants/AdminNavbar'
import Dashboard from './pages/admin/Dashboard'
import Protected from './pages/share/Protected'
import Visit from './pages/share/Visit'
import AdminProtected from './pages/share/AdminProtected'

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return <>
    {/* <div className="text-center">
      <button type="button" className="btn btn-primary">Primary</button>
    </div> */}


    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/visit/:id' element={<Visit />} />
        <Route path='/user' element={<Protected compo={<><UserNavbar /><Outlet /></>} />}>
          <Route index element={<Account />} />
        </Route>
        <Route path='/admin' element={<AdminProtected compo={<><AdminNavbar /><Outlet /></>} />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
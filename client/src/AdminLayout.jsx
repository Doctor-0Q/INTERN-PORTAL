import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import AddminAddIntern from './components/AddminAddIntern'
import Navbar from './components/AdminTopBar'
import AdminSidebar from './components/AdminSideBar'
import Settings from './components/AdminSettings'

const AdminLayout = () => {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className='flex flex-row'>

      <AdminSidebar />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/add-intern" element={<AddminAddIntern />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
      </div>
    </div>
  )
}

export default AdminLayout
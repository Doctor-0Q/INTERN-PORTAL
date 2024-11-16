import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminLogin from './components/AdminLogin'
import AddminAddIntern from './components/AddminAddIntern'
import AdminInternList from './components/AdminInternList'
import AdminDashboard from './components/AdminDashboard'
import Navbar from './components/AdminTopBar'
import AdminSidebar from './components/AdminSideBar'
import Settings from './components/AdminSettings'
import AdminEditIntern from './components/AdminEditIntern'
import AdminMessages from './components/AdminMessages'
import AdminCareer from './components/AdminCareer'

const AdminLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin" ||location.pathname === "/admin/";

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className='flex flex-col'>
      {!isLoginPage && <Navbar />}
      <div className='flex flex-row'>
        {!isLoginPage && <AdminSidebar />}
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          {/* Restrict access to the other routes based on isAdmin */}
          {isAdmin ? (
            <>
              <Route path="/add-intern" element={<AddminAddIntern />} />
              <Route path="/interns-list" element={<AdminInternList />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Messages" element={<AdminMessages />} />
              <Route path="/Edit-Interns/:internId" element={<AdminEditIntern />} />
              <Route path="/Edit-Interns" element={<AdminEditIntern />} />
              <Route path="/Career" element={<AdminCareer />} />
            </>
          ) : (
            // Redirect to login if not admin
            <Route path="*" element={<Navigate to="/admin" replace />} />
          )}
        </Routes>
      </div>
    </div>
  )
}

export default AdminLayout
import React, { useState } from 'react';
import maintenanceImg from '../assets/Maintenance.png'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_URL } from "../../config/config";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const username=localStorage.getItem('admin')

  const handlePasswordChange = async(e) => {
    e.preventDefault();
    
    try {
      
      const response= await axios.post(`${API_URL}/api/v1/changeAdminPassword/${username}`, {
        currentPassword:currentPassword,
        newPassword:newPassword
      })
  
      if(response.data.success){
        toast.success("Password changed successfully")
      }else{
        toast.error("There was some problem please try again")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 w-screen md:w-[80%]">
        

      {/* Change Password Section */}
      <div className="bg-white shadow-lg pr-[10%] pl-[10%] pt-6 pb-6 mb-8 w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Value"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Value"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#302c2c] text-white py-2 rounded-lg hover:bg-gray-900"
          >
            Change
          </button>
        </form>
      </div>

      {/* Under Maintenance Section */}
      <div className="bg-white shadow-lg rounded-[25px] w-full max-w-2xl flex flex-col items-center mb-2">
        <img
          src={maintenanceImg}
          alt="Under Maintenance"
          className="h-[40vw] object-contain"
        />
        
      </div>
    </div>
  );
};

export default Settings;

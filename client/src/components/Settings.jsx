import React, { useState } from 'react';
import ToggleCheckbox from '../ToggleCheckbox';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from "../../config/config";

const Settings = () => {

  const internID=localStorage.getItem('internID');

  const [passMatch,setPassMatch]=useState(true)

  

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    alerts: true,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });

    setPassMatch(true) 
  };

  

  const handleToggle = (e) => {
    setIsChecked(!isChecked);
    const { name } = e.target;
    setNotifications({
      ...notifications,
      [name]: !notifications[name],
    });
    console.log({name})
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(passwordData.confirmPassword!=passwordData.newPassword){
      setPassMatch(false)
    }else{
      setPassMatch(true)
    }
    
    try {
      const response =await axios.post(`${API_URL}/api/v1/changePassword/${internID}`,passwordData);

      if(response.data.success){
          toast.success("Password changed successfully")
      }
      else{
        toast.error("Please check the details again")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }

  };

  const handleNotificationsSave = (e) => {
    e.preventDefault();
    console.log('Notification Preferences:', notifications);
  };

  return (
    <>
    <div className='overflow-x-hidden'>
    <div className='w-screen h-full flex justify-center items-center flex-col'>
        <div className='bg-gradient-to-r from-[#015bbb] via-[#6d9cf5] to-[#72a0f8] p-2 md:p-3 mt-[20%] md:mt-[12%] font-bold text-md md:text-2xl text-black rounded-full text-center'>
        Manage Account Settings and Notifications
        </div>
        <br />
        <div className='w-screen flex items-center justify-center'>
        <p className='text-gray-600 text-sm md:w-[35%] text-center'>
        Manage personal information, change passwords, and set
        notification preferences for email, SMS, and in-app alerts.
        </p>
        </div>
        
    </div>
    <div className="min-h-screen flex justify-center items-center bg-[#f7fbff] p-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-[7%]">
        {/* Change Password Section */}
        <div className="bg-[#76a2f8] p-6 rounded-[50px] shadow-lg">
          <h3 className="text-2xl  font-semibold text-center mb-4">Change Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
            <p>
            Current Password
            </p>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder=""
              className="w-full p-2 border border-gray-300 rounded-md"
            />
             <p>
             New Password            </p>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder=""
              className="w-full p-2 border border-gray-300 rounded-md"
            />
             <p>
             Re-Enter            </p>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder=""
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div>
              <p className={`${passMatch?"hidden":""} text-xl text-red-900 font-bold`}>
              Password & Confirm Password do not match
              </p>
            </div>
            <div className='w-full flex justify-center items-center'>
            <button
              type="submit"
              className="w-[30%] bg-gray-700 text-white p-1 rounded-md hover:bg-gray-900 border border-white "
            >
              Save
            </button>
            </div>
            
            
          </form>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-[#76a2f8] p-6 rounded-[50px] shadow-lg">
          <h3 className="text-2xl font-semibold text-center mb-4">Notification Preferences</h3>
          <form onSubmit={handleNotificationsSave} className="space-y-6 font-bold text-lg">
            <div className="flex items-center justify-between mt-[3vw]">
              <label>Email Notifications</label>

              <ToggleCheckbox name="email"
                checked={notifications.email}
                onChange={handleToggle}/>
            </div>

            <div className="flex items-center justify-between">
              <label>SMS Notifications</label>
              <ToggleCheckbox name="email"
                checked={notifications.email}
                onChange={handleToggle}/>
            </div>
            <div className="flex items-center justify-between">
              <label>Alerts</label>
              <ToggleCheckbox name="email"
                checked={notifications.email}
                onChange={handleToggle}/>
            </div>
            <p className="text-center text-gray-400 w-full text-sm mt-4">These preferences can be changed anytime</p>
            <div className='w-full flex justify-center items-center'>
            <button
              type="submit"
              className="w-[30%] bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 border border-black "
            >
              Save
            </button>
            </div>
          </form>
          
        </div>

        {/* Coming Soon Section */}
        <div className="bg-[#76a2f8] p-6 rounded-[50px] shadow-lg flex justify-center items-center">
          <h3 className="text-3xl font-bold text-center">COMING SOON</h3>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Settings;

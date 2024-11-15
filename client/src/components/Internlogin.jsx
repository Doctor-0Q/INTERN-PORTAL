// src/components/Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../config/config";

const Login = () => {
  const [internID, setInternID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response=await axios.post(`${API_URL}/api/v1/internLogin`,{
        internID:internID,
        password:password
      });

      if(response.data.success){
        localStorage.setItem('internID',internID);
        localStorage.setItem('gender',response.data.gender);
        localStorage.setItem('internName',response.data.internName);
        localStorage.setItem('certificateId',response.data.certificateId);
        localStorage.setItem('dateOfJoining',response.data.dateOfJoining);
        localStorage.setItem('role',response.data.role);
        localStorage.setItem('role',response.data.role);
        toast.success("Login success")
        navigate(`../`);
      }
      else{
          toast.error("There is some error")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    

    
  };

  const handleAdminRedirect = () => {
    navigate('/admin');
  };

  const clearInput = (setter) => {
    setter('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-700">Intern Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="internID" className="block text-sm font-medium text-gray-700">
              Intern ID
            </label>
            <input
              type="text"
              id="internID"
              value={internID}
              onChange={(e) => setInternID(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {internID && (
              <button
                type="button"
                onClick={() => clearInput(setInternID)}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {password && (
              <button
                type="button"
                onClick={() => clearInput(setPassword)}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={handleAdminRedirect}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

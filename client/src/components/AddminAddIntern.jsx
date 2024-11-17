import { Calendar, X, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../config/config';

const AddminAddIntern = () => {
  const [formData, setFormData] = useState({
    internID: '',
    password: '',
    forename: '',
    contactNo: '',
    email: '',
    dateOfJoining: '',
    gender: '',
    performance: '',
    role: '',
    certificateId: '',
    canDownloadCertificate: false,
    canDownloadLOR: false,
    
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    performance: ''
  });


  const roleOptions = [
    { value: 'web developer', label: 'Web Developer' },
    { value: 'python developer', label: 'Python Developer' },
    { value: 'app developer', label: 'App Developer' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'HR' },
    { value: 'ux-designer', label: 'UX Designer' }
  ];


  const performanceOptions = [
    { value: 'NA', label: 'NA', bgColor: 'bg-gray-200' },
    { value: 'Bad', label: 'Bad', bgColor: 'bg-red-200' },
    { value: 'Average', label: 'Average', bgColor: 'bg-yellow-200' },
    { value: 'Good', label: 'Good', bgColor: 'bg-blue-200' },
    { value: 'Perfect', label: 'Perfect', bgColor: 'bg-green-200' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };


  const handleRoleChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, role: value }));
    if (!value) {
      setErrors(prev => ({ ...prev, role: 'Role selection is required' }));
    } else {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const handleCertificateIdChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, certificateId: value }));
    if (!value) {
      setErrors(prev => ({ ...prev, certificateId: 'Certificate ID is required' }));
    } else {
      setErrors(prev => ({ ...prev, certificateId: '' }));
    }
  };

  const handleDownloadPermissionChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handlePerformanceSelect = (value) => {
    setFormData(prev => ({ ...prev, performance: value }));
    if (!value) {
      setErrors(prev => ({ ...prev, performance: 'Performance rating is required' }));
    } else {
      setErrors(prev => ({ ...prev, performance: '' }));
    }
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email, password strength, and performance
    const isEmailValid = validateEmail(formData.email);
    const isPerformanceValid = !!formData.performance;

    if (!isPerformanceValid) {
      setErrors((prev) => ({ ...prev, performance: 'Performance rating is required' }));
    }


    if (isEmailValid && isPerformanceValid) {
      try {

        const response = await axios.post(`${API_URL}/api/v1/addIntern`, formData);
        if (response.data.success) {

          toast.success("Intern added successfully")
          resetForm()
        }
        else {
          toast.error("Failed to add intern")
        }


        setErrors({});


      } catch (error) {
        toast.error(error.response.data.message)
        setErrors((prev) => ({ ...prev, api: 'Failed to submit form. Please try again later.' }));
      }
    } else {
      console.log('Form has errors');
    }
  };


  const resetForm = () => {
    setFormData({
      internID: '',
      password: '',
      forename: '',
      contactNo: '',
      email: '',
      dateOfJoining: '',
      gender: '',
      role: '',
      certificateId: '',
      canDownloadCertificate: false,
      canDownloadLOR: false,
      
    });
    setErrors({
      email: '',
      password: '',
      role: '',
      certificateId: ''
    });
    setPasswordStrength({
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    });
    setUploadedFiles({
      offerLetter: '',
      certificate: '',
      recommendation: ''
    });
  };


  return (
    <div className="w-full mx-auto p-6 bg-slate-50 flex justify-center items-center flex-col">
      <div className="flex justify-between items-center mb-6 gap-2 md:w-[90%] bg-white p-2">
        <h1 className="text-xl font-semibold">Add New Intern</h1>
        <div className="space-x-2 space-y-2">
          <button
            type="button"
            className="px-4 py-2 border rounded hover:bg-gray-50"
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>

      <form className="w-[110%] md:w-[80%] space-y-6 bg-white rounded-lg p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-6">
          {/* Intern ID */}
          <div className="md:flex items-center space-x-4">
            <label className="w-24 text-sm font-medium">Intern ID</label>
            <input
              type="text"
              className="flex-1 border rounded p-2"
              value={formData.internID}
              onChange={(e) => setFormData({ ...formData, internID: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="md:flex items-center space-x-4">
            <label className="w-24 text-sm font-medium">Password</label>
            <div className="flex-1">
              <input
                type="password"
                className={`md:w-full border rounded p-2 ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />

            </div>
          </div>
        </div>

        {/* Forename */}
        <div className="md:flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Forename</label>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-[70%] border rounded p-2 pr-8"
              value={formData.forename}
              onChange={(e) => setFormData({ ...formData, forename: e.target.value })}
            />
            {formData.forename && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, forename: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Contact No */}
        <div className="md:flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Contact No</label>
          <div className="flex-1 relative">
            <input
              type="tel"
              className="w-[70%]  border rounded p-2 pr-8"
              value={formData.contactNo}
              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            />
            {formData.contactNo && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, contactNo: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="md:flex items-center space-x-4 ">
          <label className="w-24 text-sm font-medium">Email</label>
          <div className="flex-1">
            <input
              type="email"
              className={`w-[60%]  border rounded p-2 ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Date of Joining */}
        <div className="md:flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Date of Joining</label>
          <div className="flex-1 relative">
            <input
              type="date"
              className="md:w-full border rounded p-2 cursor-pointer"
              value={formData.dateOfJoining}
              onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
            />
            <Calendar className="hidden md:absolute right-[110px] md:right-2 top-[10px] md:top-2.5 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Gender */}
        <div className="md:flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Gender</label>
          <div className="flex-1">
            <div className="space-x-2">
              {['male', 'female'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`px-4 py-2 rounded ${formData.gender === gender
                    ? 'bg-gray-200'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  onClick={() => setFormData({ ...formData, gender })}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Rating */}
        <div className="md:flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Performance</label>
          <div className="flex-1">
            <div className="grid grid-cols-2 w-[230px] md:flex space-x-2">
              {performanceOptions.map(({ value, label, bgColor }) => (
                <button
                  key={value}
                  type="button"
                  className={`px-4 py-2 rounded transition-colors ${bgColor} ${formData.performance === value
                    ? 'ring-2 ring-offset-2 ring-blue-500'
                    : 'hover:opacity-80'
                    }`}
                  onClick={() => handlePerformanceSelect(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.performance && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.performance}
              </div>
            )}
          </div>
        </div>

        {/* Role Selection */}
        <div className="md:flex items-center space-x-4">
          <label className="text-sm font-medium w-32">Role</label>
          <div className="flex-1">
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="md:w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              {roleOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {errors.role && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.role}
              </div>
            )}
          </div>
        </div>

        {/* Certificate ID  */}
        <div className="md:flex items-center space-x-4">
          <label className="text-sm font-medium w-32">Certificate ID</label>
          <div className="flex-1">
            <input
              type="text"
              value={formData.certificateId}
              onChange={handleCertificateIdChange}
              className="md:w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter certificate ID"
            />
            {errors.certificateId && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.certificateId}
              </div>
            )}
          </div>
        </div>

        {/* Download Permissions  */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-32">Certificate Download</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadCertificate}
                onChange={() => handleDownloadPermissionChange('canDownloadCertificate', true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!formData.canDownloadCertificate}
                onChange={() => handleDownloadPermissionChange('canDownloadCertificate', false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-32">LOR Download</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadLOR}
                onChange={() => handleDownloadPermissionChange('canDownloadLOR', true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!formData.canDownloadLOR}
                onChange={() => handleDownloadPermissionChange('canDownloadLOR', false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>



      </form>
    </div>
  );
};

export default AddminAddIntern;
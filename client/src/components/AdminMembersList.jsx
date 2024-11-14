import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import {X, AlertCircle } from 'lucide-react';
import { IoMdAdd } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { MdWifiCalling3 } from "react-icons/md";
import { VscMail } from "react-icons/vsc";
import { IoCloseCircleOutline } from "react-icons/io5";
import { API_URL } from "../../config/config";


const AdminMembersList = () => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldFetchMembers, setShouldFetchMembers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: ""
  });
  const [passwordError, setPasswordError] = useState("");

  const [errors, setErrors] = useState({
    email: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: '',
    gender: ' '
  });

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchTerm) ||
      member.memberID.toLowerCase().includes(searchTerm) ||
      member.role.toLowerCase().includes(searchTerm)
    );
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/member-list`); 
        const data = await response.json();
        setMembers(data.data);
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching members data:", error);
      }
    };

    fetchMembers();

    if (shouldFetchMembers) {
      fetchMembers();
      setShouldFetchMembers(false);
    }
  }, [shouldFetchMembers]);

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCallClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleAddMemberClick = () =>{
    setShowAddMember(true);
  }

  const handleAddMemberClose = () =>{
    setShowAddMember(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      mobile: '',
      gender: '',
      email: '',
    });
  }  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email, password strength, and performance
    const isEmailValid = validateEmail(formData.email);
    
    if (isEmailValid) {
      try {
        
        const response = await axios.post(`${API_URL}/api/v1/member-list`, formData);
        console.log("Received data:", formData);
        console.log("Response:", response);
        if(response && response.data.success){
          const memberID = response.data.data.memberID;
          toast.success("Member added successfully")
          toast.success("Member Added with ID: "+memberID);
          resetForm()
          setShouldFetchMembers(true); // Set flag to fetch members on close
          setShowAddMember(false);  
        }
        else{
          toast.error("Failed to add member")
        }
  
        
        setErrors({});
       
  
      } catch (error) {
        toast.error(error.message)
        setErrors((prev) => ({ ...prev, api: 'Failed to submit form. Please try again later.' }));
      }
    } else {
      console.log('Form has errors');
    }
  };  

  const openDeleteModal = () => {
    if (selectedMembers.length === 0) {
      toast.error("Please select members from the list to delete");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmationClose = () => {
    setShowDeleteModal(false);
    setAdminCredentials({ username: "", password: "" });
  }
  
  const handleDeleteConfirmation = async () => {
    if (!adminCredentials.username || !adminCredentials.password) {
      setPasswordError("Username and password are required.");
      return;
    }
  
    try {
      // First verify admin credentials
      const loginResponse = await axios.post(`${API_URL}/api/v1/adminLogin`, {
        username: adminCredentials.username,
        password: adminCredentials.password
      });
      
      if (loginResponse.data.success) {
        // If admin verification successful, proceed with deletion
        const deleteResponse = await axios.delete(`${API_URL}/api/v1/delete-members`, {
          data: { 
            memberIds: selectedMembers,
            username: adminCredentials.username,
            password: adminCredentials.password
          }
        });
  
        if (deleteResponse.data.success) {
          toast.success("Members deleted successfully.");
          setShouldFetchMembers(true);
          setShowDeleteModal(false);
          setSelectedMembers([]); // Reset selected members after successful deletion
          setAdminCredentials({ username: "", password: "" });
        } else {
          toast.error(deleteResponse.data.message || "Failed to delete members.");
        }
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  if (loading) return <div>Loading Members data...</div>;
  
  return (
    <div className="bg-white md:p-4 h-auto rounded-lg w-full">
        <div className='flex flex-row md:justify-between'>
          <div className="flex flex-row md:gap-[6.7vw]">
          <h3 className="text-lg font-bold font-mukta">Doc-Q Team Members List</h3>
          <h3 className='text-lg font-bold font-mukta'>Role</h3>
          </div>
            <div className='flex flex-row justify-end md:gap-3'>
              <button onClick={handleAddMemberClick}>
                <IoMdAdd size={20}/>
              </button>
              <button onClick={() => setShowSearch(!showSearch)}>
                <IoSearchSharp size={20} />
              </button>
              <button onClick={openDeleteModal}>
                <FaRegTrashAlt size={20} />
              </button>
              <button>
                <MdOutlineInfo size={20} />
              </button>
            </div>
        </div>
        {showSearch && (
        <div className="mt-4 mb-2">
          <input
            type="text"
            placeholder="Search by name or role..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}
      <ul className="mt-4 md:space-y-2">
        {filteredMembers?.map((member, idx) => (
          <li key={member.memberID} className="flex justify-start">
            <div className="w-[40vw] md:w-[20vw] align-middle">
            <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.memberID)}
                  onChange={() => handleCheckboxChange(member.memberID)}
                  className="form-checkbox h-4 w-4 mr-1 text-purple-600 border-gray-300 rounded"
                />
            <span className=''>{member.name}</span>
            </div>
            <span className='md:w-1/3'>{member.role}</span>
            <div className="md:w-1/5 hidden md:flex flex-row justify-around ml"> 
              <button onClick={() => handleCallClick(member)}>
                <MdWifiCalling3 size={20}/>
              </button>
              <button onClick={() => {
                console.log(`mailto:${member.email}`); // Log email
                window.open(`mailto:${member.email}`);
              }}>
                <VscMail size={20}/>
              </button>
           </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Member Info</h3>
            {selectedMember && (
              <>
                <p className="text-lg">Name: {selectedMember.name}</p>
                <p className="text-lg">Phone: {selectedMember.mobile}</p>
              </>
            )}
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p>Enter admin credentials to delete selected members.</p>
            <input
              type="text"
              placeholder="Admin Username"
              className="border rounded p-2 w-full mt-2"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials(prev => ({...prev, username: e.target.value}))}
            />
            <input
              type="password"
              placeholder="Admin Password"
              className="border rounded p-2 w-full mt-2"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials(prev => ({...prev, password: e.target.value}))}
            />
            {passwordError && <div className="text-red-500 mt-1">{passwordError}</div>}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteConfirmationClose}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmation}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="flex flex-row justify-end">
              <button onClick={handleAddMemberClose}>
                <IoCloseCircleOutline color="red" size={25}/>
              </button>
            </div>
          <form className="space-y-6 bg-white rounded-lg p-6 shadow-sm" onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold mb-4 flex justify-center">Add New Member</h1>

        {/* Forename */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Forename</label>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-[100%] border rounded p-2 pr-8"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {formData.name && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, name: '' })}
              > 
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Role */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Role</label>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-[100%] border rounded p-2 pr-8"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>
        </div>

        {/* Contact No */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Contact No</label>
          <div className="flex-1 relative">
            <input
              type="tel"
              className="w-[100%]  border rounded p-2 pr-8"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            {formData.mobile && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, mobile: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Email</label>
          <div className="flex-1">
            <input
              type="email"
              className={`w-[100%]  border rounded p-2 ${errors.email ? 'border-red-500' : ''}`}
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

        {/* Gender */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Gender</label>
          <div className="flex-1">
            <div className="space-x-2">
              {['male', 'female'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`px-4 py-2 rounded ${formData.gender === gender
                      ? 'bg-gray-400'
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
      </form>
      <div className="flex flex-row justify-end gap-5  ">
            <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Save
          </button>
      </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembersList;
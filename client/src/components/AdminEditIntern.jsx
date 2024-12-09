import { API_URL } from '../../config/config';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Search, Download, AlertCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import DownloadPermissionModal from '@/components/DownloadPermissionModal';

const EditIntern = () => {

  const { internId } = useParams();
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({
    certificateId: ''
  });
    
    // Add this to your existing state
    const fetchInternData = async (id) => {
      try {
          const response = await axios.get(`${API_URL}/api/v1/interns/${id}`);
          if (response.data) {
              setFormData({
                  forename: response.data.forename || '',
                  contactNo: response.data.contactNo || '',
                  email: response.data.email || '',
                  gender: response.data.gender || '',
                  status: response.data.status || '',
                  role: response.data.role || '',
                  performance: response.data.performance || '',
                  certificateId: response.data.certificateId || '',
                  position: response.data.position || '',
                  department: response.data.department || '',
                  projects: response.data.projects || '',
                  canDownloadCertificate: response.data.canDownloadCertificate,
                  // canDownloadLOR: response.data.canDownloadLOR,
                  // canDownloadAppreciation: response.data.canDownloadAppreciation
              });
          }
      } catch (error) {
          toast.error('Failed to fetch intern data');
      }
  };
  
  useEffect(() => {
      if (internId) {
          setInternId(internId);
          fetchInternData(internId);
      }
  }, []);

  const handleCloseModal = () => {
    setShowDocumentModal(false);
    setDocumentType('');
  };

  const openDocumentModal = (type) => {
    setDocumentType(type);
    setShowDocumentModal(true);
  };

  useEffect(() => {
    if (showDocumentModal) {
      // Push a new state to prevent URL changes while modal is open
      window.history.pushState(null, '', location.pathname);
    }
  }, [showDocumentModal]);
  

  const handleDocumentPermissionSave = async (selectedIds, type) => {
  try {
    console.log('Saving permissions:', { selectedIds, type });
    const response = await axios.post(`${API_URL}/api/v1/updateDocumentAccess`, {
      internIds: selectedIds,
      documentType: type
    });
    
    if (response.data.success) {
      toast.success('Document access updated successfully');
      handleCloseModal();
    }
  } catch (error) {
    toast.error('Failed to update document access');
    console.log('Error details:', error);
  }
};

  const [internID, setInternId] = useState('');
  const [formData, setFormData] = useState({
    forename: '',
    contactNo: '',
    email: '',
    gender: '',
    status: '',
    performance: '',
    role: '',
    canDownloadCertificate: false,
    // canDownloadLOR: false,
    // canDownloadAppreciation:false,
    position: '',
    department: '',
    certificateId: '',
    projects: '',
    leaveDate:''
  });
  const [documents, setDocuments] = useState({
    offerLetter: null,
    certificate: null,
    letterOfRecommendation: null
  });

  const roleOptions = [
    { value: 'web-developer', label: 'Web Developer' },
    { value: 'python-developer', label: 'Python Developer' },
    { value: 'app-developer', label: 'App Developer' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'HR' },
    { value: 'ux-designer', label: 'UX Designer' }
  ];

  // Handler for searching intern by ID

  const handleSearch = async () => {
    try {
      if (!internID.trim()) {
        alert('Please enter an Intern ID');
        return;
      }

      // Use Axios to fetch intern data
      const response = await axios.get(`${API_URL}/api/v1/interns/${internID}`);

      // Update form data with the received intern data
      setFormData({
        forename: response.data.forename || '',
        contactNo: response.data.contactNo || '',
        email: response.data.email || '',
        gender: response.data.gender || '',
        status: response.data.status || '',
        role: response.data.role || '',
        performance: response.data.performance || '',
        certificateId: response.data.certificateId || '',
        position: response.data.position || '',
        department: response.data.department || '',
        projects: response.data.projects || '',
        canDownloadCertificate: response.data.canDownloadCertificate,
        // canDownloadLOR: response.data.canDownloadLOR,
  
        // here for add (position,department,project)
      });

      // Update documents if they exist
      if (response.data.documents) {
        setDocuments(response.data.documents);
      }
    } catch (error) {
      console.error('Error fetching intern data:', error);
      alert('Failed to fetch intern data. Please try again.');
    }
  };


  // Handler for input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for gender selection
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  // Handler for status selection
  const handleStatusSelect = (status) => {
    setFormData(prev => ({
      ...prev,
      status,
      leaveDate: status === 'left' ? new Date().toISOString().split('T')[0] : prev.leaveDate
    }));
  };

  // Handler for performance selection
  const handlePerformanceSelect = (performance) => {
    setFormData(prev => ({
      ...prev,
      performance
    }));
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

  
  const handleDownloadPermissionChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'canDownloadCertificate' && !value) {
      setErrors(prev => ({ ...prev, certificateId: '' }));
    }
  };

  const handleCertificateIdChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, certificateId: value }));

    if (formData.canDownloadCertificate && !value.trim()) {
      setErrors(prev => ({ ...prev, certificateId: 'Certificate ID is required when certificate download is enabled' }));
    } else {
      setErrors(prev => ({ ...prev, certificateId: '' }));
    }
  };


  

  const handleDepartmentSelect = (department) => {
    setFormData(prev => ({
      ...prev,
      department
    }));
  };

  // Handler for saving form data
  const handleSubmit = async () => {
    try {

      if (formData.canDownloadCertificate && !formData.certificateId.trim()) {
        setErrors(prev => ({ ...prev, certificateId: 'Certificate ID is required when certificate download is enabled' }));
        toast.error('Please fill in all required fields');
        return;
      }

      // Update the intern data via the editIntern endpoint
      const response = await axios.post(`${API_URL}/api/v1/editIntern/${internID}`, formData);

      if (response.status !== 200) {
        toast.error("Failed to update details")
      }

      toast.success("Intern edited successfully")
    } catch (error) {
      console.error('Error saving intern data:', error);
      toast.error("Internal error")
    }
  };


  // Handler for canceling/resetting form
  const resetForm = () => {
    setInternId('');
    setFormData({
      forename: '',
      contactNo: '',
      email: '',
      gender: '',
      status: '',
      performance: '',
      role: '',
      position: '',
      department: '',
      projects: '',
      certificateId:'',
      // canDownloadAppreciation:false,
      canDownloadCertificate: false,
      // canDownloadLOR: false,
    });

  };



  return (
    <div className='w-full mx-auto md:bg-slate-50 flex items-center justify-center flex-col'>
      <div className="md:w-[85%] flex justify-between bg-white items-center md:mb-6 p-2 mt-4">
        <h1 className="text-xl font-semibold">Add New Intern</h1>
        <div className="flex flex-col md:flex-row gap-2 md:space-x-2">
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

      {/* <div className="flex mt-2 md:justify-center justify-start md:flex-row flex-col gap-4 mb-6">
        <button 
          onClick={() => openDocumentModal('appreciation')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Appreciation Letter Access
        </button>
        <button 
          onClick={() => openDocumentModal('lor')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          LOR Access
        </button>
        <button 
          type="button"
          onClick={() => openDocumentModal('certificate')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Certificate Download Access
        </button>
      </div> */}
    <form className="w-[210mm] min-h-[297mm] mx-auto md:p-8 bg-white md:shadow-lg"  >
      {/* Header with Title and Buttons */}

      {/* Search Section */}
      <div className="flex flex-col md:items-center mb-8">
        <p className="text-sm text-gray-600 mb-2">Enter Intern ID to Update Details</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="DTA38"
            className="w-48 border rounded px-2 py-1 text-sm"
            value={internID}
            onChange={(e) => setInternId(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="md:max-w-3xl mx-auto space-y-8">
        {/* Personal Details Section */}
        <div>
          <h2 className="text-blue-800 text-sm font-medium mb-6">Personal Details:</h2>
          <div className="space-y-4">
            {[
              { label: 'Forename', name: 'forename', type: 'text' },
              { label: 'ContactNo', name: 'contactNo', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' }, 
              { label: 'Position/Opportunity Pursuing', name: 'position', type: 'text' }
            ].map(field => (
              <div key={field.name} className="flex md:items-center flex-col md:flex-row">
                <label className="w-48 text-sm">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-[70vw] flex-1 border rounded px-2 py-1"
                />
              </div>
            ))}

            <div className="md:flex items-center">
              <label className="w-48 text-sm">Gender</label>
              <div className="flex gap-2">
                {['Male', 'Female'].map((gender) => (
                  <button
                    type="button"
                    key={gender}
                    onClick={() => handleGenderSelect(gender.toLowerCase())}
                    className={`px-6 py-1 rounded text-sm transition-colors
                      ${formData.gender === gender.toLowerCase()
                        ? 'bg-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:flex items-center">
              <label className="w-48 text-sm">Status</label>
              <div className="grid grid-cols-2 w-1/4 md:flex gap-2">
                {[
                  { label: 'Working', value: 'working', bgColor: 'green' },
                  { label: 'Left', value: 'left', bgColor: 'blue' },
                  { label: 'Terminated', value: 'terminated', bgColor: 'red' },
                  { label: 'On Leave', value: 'onLeave', bgColor: 'yellow' }
                ].map(({ label, value, bgColor }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => handleStatusSelect(value)}
                    className={`px-4 py-1 rounded text-sm transition-colors
                      ${formData.status === value
                        ? `bg-${bgColor}-200`
                        : `bg-${bgColor}-100 hover:bg-${bgColor}-200`
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:flex items-center">
              <label className="w-48 text-sm">Performance</label>
              <div className="grid grid-cols-2 w-1/4 md:flex gap-2">
                {[
                  { label: 'NA', value: 'na', bgColor: 'gray' },
                  { label: 'Bad', value: 'bad', bgColor: 'red' },
                  { label: 'Average', value: 'average', bgColor: 'yellow' },
                  { label: 'Good', value: 'good', bgColor: 'blue' },
                  { label: 'Perfect', value: 'perfect', bgColor: 'green' }
                ].map(({ label, value, bgColor }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => handlePerformanceSelect(value)}
                    className={`px-4 py-1 rounded text-sm transition-colors
                      ${formData.performance === value
                        ? `bg-${bgColor}-200`
                        : `bg-${bgColor}-100 hover:bg-${bgColor}-200`
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
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
            {formData.role && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {formData.role}
              </div>
            )}
          </div>
        </div>
        {/* Certificate ID  */}
        <div className="md:flex items-center space-x-4">
          <label className="text-sm font-medium w-32">
              Certificate ID
              {String(formData.canDownloadCertificate)==="true" && <span className="text-red-500">*</span>}
            </label>

          <div className="flex-1">
            <input
              type="text"
              value={formData.certificateId}
              onChange={handleCertificateIdChange}
              className={`md:w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.certificateId ? 'border-red-500' : ''
              }`}
              placeholder="Enter certificate ID"
            />
            {String(formData.canDownloadCertificate)==="true" && (
              <p className="text-red-500 text-xs mt-1">Certificate ID is mandatory</p>
            )}
            {errors.certificateId && (
              <p className="text-red-500 text-sm mt-1">{errors.certificateId}</p>
            )}
          </div>
        </div>

         {/* Date of Leaving */}
    <div className="flex md:items-center flex-col md:flex-row">
      <label className="w-48 text-sm">Date of Leaving</label>
      <input
        type="date"
        name="leaveDate"
        value={formData.leaveDate}
        onChange={handleInputChange}
        className="w-[70vw] flex-1 border rounded px-2 py-1"
      />
    </div>

        {/* Download Permissions  */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-32">Certificate Download</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={String(formData.canDownloadCertificate)==="true"}
                onChange={() => handleDownloadPermissionChange('canDownloadCertificate', true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={String(formData.canDownloadCertificate)==="false"}
                onChange={() => handleDownloadPermissionChange('canDownloadCertificate', false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-32">LOR Download</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadLOR==="true"&&formData.canDownloadLOR}
                onChange={() => handleDownloadPermissionChange('canDownloadLOR', true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadLOR==="false"||!formData.canDownloadLOR}
                onChange={() => handleDownloadPermissionChange('canDownloadLOR', false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-32">Appreciation letter Download</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadAppreciation==="true"&&formData.canDownloadAppreciation}
                onChange={() => handleDownloadPermissionChange('canDownloadAppreciation', true)}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.canDownloadAppreciation==="false"||!formData.canDownloadAppreciation}
                onChange={() => handleDownloadPermissionChange('canDownloadAppreciation', false)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div> */}

        <div className="md:flex items-center">
          <label className="w-48 text-sm">Working Department</label>
          <div className="grid grid-cols-2 w-1/3 md:flex gap-2">
            {['Web Development', 'Marketing', 'Business Development'].map((dept) => (
              <button
                type="button"
                key={dept}
                onClick={() => handleDepartmentSelect(dept.toLowerCase())}
                className={`px-4 py-1 rounded text-sm transition-colors
                      ${formData.department === dept.toLowerCase()
                    ? 'bg-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
          
        <div className="md:flex items-start">
          <div>

          <label className="w-48 text-sm pt-2">Projects</label>
          <p className="w-[70vw] md:w-[15vw] text-xs text-gray-500">Enter the projects done by intern, and separate them with a comma</p>
          </div>
          <div className="flex-1 space-y-1">
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleInputChange}
              className=" md:w-full border rounded px-2 py-1 h-24 resize-none"
              placeholder="Enter projects separated by commas"
            />
           
          </div>
        </div>

      </div>
    </form>

    <DownloadPermissionModal 
      isOpen={showDocumentModal}
      onClose={handleCloseModal}  // Now using our defined handler
      type={documentType}
      onSave={handleDocumentPermissionSave}
    />
    </div>
  );
};

export default EditIntern;

import React, { useState, useEffect, useRef } from "react";
import plusicon from "@/assets/plusicon.png";
import searchicon from "@/assets/searchicon.png";
import filtericon from "@/assets/filtericon.png";
import questionicon from "@/assets/questionicon.png";
import NotificationModal from './AdminNotificationModal';
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "config/config";

const InternsDashboard = () => {
  const [toEmail, setEmail] = useState('');
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [internsPerPage] = useState(8);
  const [allInterns, setAllInterns] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBar,setShowBar]=useState(false)
  const [showTwoOptions, setShowOptions] = useState(false);
  const [selectedInternId, setSelectedInternId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const optionsRef = useRef(null);

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedInterns, setSelectedInterns] = useState([]);
  const [showBulkEmailButton, setShowBulkEmailButton] = useState(false);

  const handleInternSelection = (internEmail) => {
    setSelectedInterns(prevSelected => {
      const newSelected = prevSelected.includes(internEmail)
        ? prevSelected.filter(email => email !== internEmail)
        : [...prevSelected, internEmail];
      
      // Update showBulkEmailButton based on whether any interns are selected
      setShowBulkEmailButton(newSelected.length > 0);
      
      return newSelected;
    });
  };
  

  const handleBulkEmail = () => {
    // Ensure emails are passed as an array
    const emailArray = selectedInterns.map(email => email.trim());
    setSelectedEmail(emailArray);
    setIsModalVisible(true);
  };

  const showMessageModal = (selectedEmail) => {
    handleSendEmail(selectedEmail);
  };

  const handleSendEmail = (email) => {
    setSelectedEmail(email);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setShowMessageBox(false);
    setEmail('');
  };

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/internList`);
        const result = await response.json();
        if (result.success) {
          setInterns(result.data);
          setAllInterns(interns);
          setFilteredInterns(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching intern data:", error);
        setLoading(false);
      }
    };

    fetchInterns();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const initiateDelete = (internId) => {
    console.log('Deleting intern with ID:', internId);
    setSelectedInternId(internId);
    setShowDeleteModal(true);
  };
  
  const handleDeleteConfirmation = async () => {
    if (!adminCredentials.username || !adminCredentials.password) {
      setPasswordError("Username and password are required.");
      return;
    }
  
    try {
      // Verify admin credentials
      const loginResponse = await axios.post(`${API_URL}/api/v1/adminLogin`, {
        username: adminCredentials.username,
        password: adminCredentials.password
      });
      
      if (loginResponse.data.success) {
        console.log(`${API_URL}/api/v1/deleteIntern/${selectedInternId}`);
        // Proceed with intern deletion
        const deleteResponse = await axios.delete(`${API_URL}/api/v1/deleteIntern/${selectedInternId}`, {
          data: { 
            username: adminCredentials.username,
            password: adminCredentials.password
          }
        });
  
        if (deleteResponse.data.success) {
          const updatedInterns = interns.filter(intern => intern.internID !== selectedInternId);
          setInterns(updatedInterns);
          setFilteredInterns(updatedInterns);
          toast.success("Intern deleted successfully.");
          setShowDeleteModal(false);
          setAdminCredentials({ username: "", password: "" });
        }
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (error) {
      console.log('Full error object:', error);
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };
  

  const showOptions=(internId)=>{
    setSelectedInternId(internId);
    setShowOptions(true);
  }

  const showSearchbar=()=>{
    setShowBar(true)
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    
    const filtered = interns.filter((intern) =>
      intern.forename.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredInterns(filtered);
    setCurrentPage(1); // Reset to the first page when a search is made
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredInterns(interns);
    // Reset the filtered results or any other state if needed
  };

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = filteredInterns.slice(indexOfFirstIntern, indexOfLastIntern);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(interns.length / internsPerPage);

  const isCurrentOne=() => {
    if(currentPage===1){
        return "font-bold";
    }
  };

  // Create pagination buttons
  const renderPagination = () => {
    const paginationButtons = [];
  
    // Always show the first page
    paginationButtons.push(
      <h1 key={1} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer ${isCurrentOne()}  `} onClick={() => paginate(1)}>
        1
      </h1>
    );
  
    // Determine how many pages to show around the current page
    if (currentPage === 1) {
      // On the first page, show the next two pages
      for (let i = 2; i <= Math.min(3, totalPages); i++) {
        paginationButtons.push(
          <h1 key={i} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer`} onClick={() => paginate(i)}>
            {i}
          </h1>
        );
      }
      if (totalPages > 3) paginationButtons.push(<span key="dots1" className="mx-2">...</span>);
      if (totalPages > 3) {
        paginationButtons.push(
          <h1 key={totalPages} className="page-font-mukta number py-2 px-3 hover:cursor-pointer" onClick={() => paginate(totalPages)}>
            {totalPages}
          </h1>
        );  
      }
    } else if (currentPage === 2) {
      // On the second page, show pages 1, 2 (bold), and 3
      paginationButtons.push(
        <h1 key={2} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer font-bold`} onClick={() => paginate(2)}>
          2
        </h1>
      );
      paginationButtons.push(<span key="dots1" className="mx-2">...</span>);
      if (totalPages > 3) {
        paginationButtons.push(
          <h1 key={totalPages} className="page-number font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(totalPages)}>
            {totalPages}
          </h1>
        );
      }
    } else if (currentPage === 3) {
      // On the third page, show pages 1, 2, 3 (bold), and ellipsis
      paginationButtons.push(
        <h1 key={3} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer font-bold`} onClick={() => paginate(3)}>
          3
        </h1>
      );
      paginationButtons.push(<span key="dots1" className="mx-2">...</span>);
      if (totalPages > 3) {
        paginationButtons.push(
          <h1 key={totalPages} className="page-number font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(totalPages)}>
            {totalPages}
          </h1>
        );
      }
    } else if (currentPage >= 4 && currentPage <= totalPages - 3) {
      // For pages 4 to (totalPages - 3), show: 1, ..., current (bold), next, ..., totalPages
      paginationButtons.push(<span key="dots1" className="mx-2">...</span>);
      paginationButtons.push(
        <h1 key={currentPage} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer font-bold`} onClick={() => paginate(currentPage)}>
          {currentPage}
        </h1>
      );
      // Show the next page
      if (currentPage + 1 <= totalPages) {
        paginationButtons.push(
          <h1 key={currentPage + 1} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer`} onClick={() => paginate(currentPage + 1)}>
            {currentPage + 1}
          </h1>
        );
      }
      // Show last page
      paginationButtons.push(<span key="dots2" className="mx-2">...</span>);
      if (totalPages > 3) {
        paginationButtons.push(
          <h1 key={totalPages} className="page-number font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(totalPages)}>
            {totalPages}
          </h1>
        );
      }
    } else {
      // Last few pages
      for (let i = totalPages - 2; i <= totalPages; i++) {
        if (i === currentPage) {
          paginationButtons.push(
            <h1 key={i} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer font-bold`} onClick={() => paginate(i)}>
              {i}
            </h1>
          );
        } else {
          paginationButtons.push(
            <h1 key={i} className={`page-number font-mukta py-2 px-3 hover:cursor-pointer`} onClick={() => paginate(i)}>
              {i}
            </h1>
          );
        }
      }
    }
  
    return paginationButtons;
  };  

  const addIntern=()=>{
    navigate('../add-intern')
  }

  if (loading) return <div>Loading interns data...</div>;

  return (
    <div className="w-full p-6 bg-slate-50 rounded-lg shadow-md">
      <h2 className="font-mukta text-xl font-normal mb-4">Interns Data</h2>

      <div className="flex md:flex-row flex-col h-auto md:h-16 justify-between bg-white items-center mb-4">
        <h2 className="font-mukta text-xl font-medium md:ml-5 md:mt-0 mt-5">
          Total Interns <span className="font-mukta text-slate-500">({filteredInterns.length})</span>
        </h2>
        
           {/* Search bar */}
        <div className="md:mt-0 mt-4 md:mb-0 mb-4 flex flex-col md:flex-row space-x-4 mr-5">
          {showBar && <div className="relative md:w-52">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search interns..."
            className="border border-gray-300 rounded-md py-1 md:py-2 px-1 md:px-3 md:w-52 font-mukta"
          />
          {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-3 text-gray-500"
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}
          </div>}
          <div className="md:space-x-4 md:mr-5 flex items-center justify-center">
          <button>
          <img
          onClick={addIntern} src={plusicon} alt="Add Icon" className="" />
          </button>
          <button>
          <img
          onClick={showSearchbar} src={searchicon} alt="Search Icon" className="" />
          </button>
          <button>
          <img src={filtericon} alt="Filter Icon" className="" />
          </button>
          <button>
          <img src={questionicon} alt="More Info" className="" />
          </button>
          {showBulkEmailButton && (
            <button
              onClick={handleBulkEmail}
              className="bg-blue-900 text-white px-4 py-2 rounded-md ml-4"
            >
              Send Email
            </button>
          )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p>Enter admin credentials to delete the intern.</p>
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
                onClick={() => {
                  setShowDeleteModal(false);
                  setAdminCredentials({ username: "", password: "" });
                }}
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


      {/* Interns Table */}
      <div className="overflow-x-auto md:mt-0 mt-10">
  <table className="min-w-full table-auto border-collapse bg-white hidden md:table">
    <thead>
      <tr>
        <th className="text-left px-4 py-2">
        <input
          type="checkbox"
          onChange={(e) => {
            const allEmails = currentInterns.map(intern => intern.email);
            const newSelected = e.target.checked ? allEmails : [];
            setSelectedInterns(newSelected);
            setShowBulkEmailButton(newSelected.length > 0);
          }}
        />
        </th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Intern ID</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Name</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Role</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Status</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Year Of Joining</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Completion Date</th>
        <th className="text-left font-mukta font-normal text-gray-500 px-4 py-2">Options</th>
      </tr>
    </thead>
    <tbody>
      {currentInterns.map((intern, index) => (
        <tr key={index} className="border-b">
          <td className="px-4 py-2">
        <input
          type="checkbox"
          checked={selectedInterns.includes(intern.email)}
          onChange={() => handleInternSelection(intern.email)}
        />
      </td>
          <td className="px-4 font-mukta font-normal text-black py-2">{intern.internID}</td>
          <td className="px-4 font-mukta font-normal text-black py-2">{intern.forename}</td>
          <td className="px-4 font-mukta py-2">{intern.role}</td>
          <td className="px-4 font-mukta py-2">
            <span className={`w-[90px] font-mukta inline-flex items-center justify-center px-3 py-1 rounded-full text-sm ${getStatusClass(intern.status)}`}>
              {intern.status}
            </span>
          </td>
          <td className="px-4 font-mukta py-2">{formatDate(intern.dateOfJoining)}</td>
          <td className="px-4 font-mukta py-2">{intern.completionDate || 'NA'}</td>
          <td className="px-4 font-mukta py-2 relative options-container">
            <button 
              onClick={() => showOptions(intern.internID)}
              className="px-2 py-1 font-mukta text-lg rounded-lg"
            >
              ...
            </button>
            {showTwoOptions && selectedInternId === intern.internID && (
              <div ref={optionsRef} className="relative right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => navigate(`../edit-interns/${intern.internID}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Intern
                  </button>
                  <button
                    onClick={() => showMessageModal(intern.email)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => initiateDelete(intern.internID)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete Intern
                  </button>
                </div>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile View */}
  <div className="md:hidden">
    {currentInterns.map((intern, index) => (
      <div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
        <p className="font-mukta text-sm text-gray-500 mb-1"><strong>Name:</strong> {intern.forename}</p>
        <p className="font-mukta text-sm text-gray-500 mb-1"><strong>Role:</strong> {intern.role}</p>
        <p className="font-mukta text-sm text-gray-500 mb-1"><strong>Status:</strong>
          <span className={`w-[90px] font-mukta inline-flex items-center justify-center px-3 py-1 rounded-full text-sm ${getStatusClass(intern.status)}`}>
            {intern.status}
          </span>
        </p>
        <p className="font-mukta text-sm text-gray-500 mb-1"><strong>Year Of Joining:</strong> {formatDate(intern.dateOfJoining)}</p>
        <p className="font-mukta text-sm text-gray-500 mb-1"><strong>Completion Date:</strong> {intern.completionDate || 'NA'}</p>
        <button
          onClick={() => showOptions(intern.internID)}
          className="px-2 py-1 font-mukta text-lg rounded-lg">
          ...
        </button>
        {showTwoOptions && selectedInternId === intern.internID && (
              <div ref={optionsRef} className="relative right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <button
                    onClick={() => navigate(`../edit-interns/${intern.internID}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Intern
                  </button>
                  <button
                    onClick={() => showMessageModal(intern.email)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => initiateDelete(intern.internID)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete Intern
                  </button>
                </div>
              </div>
            )}
      </div>
    ))}
  </div>
</div>


      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <div className="pagination flex items-center">
          <button className="prev font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}> &lt; Prev </button>
          {renderPagination()}
          <button className="next font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next &gt; </button>
        </div>
      </div>

     {/* Your existing code */}
     <NotificationModal 
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedEmail(null);
        }}
        toEmail={selectedEmail}
      />
    </div>
  );
};

// Helper function to get the Tailwind class for status with exact styling
const getStatusClass = (status) => {
  switch (status) {
    case "Working":
      return "bg-green-100 text-green-500";
    case "Left":
      return "bg-blue-100 text-blue-400";
    case "Terminated":
      return "bg-red-100 text-red-500";
    case "On Leave":
      return "bg-yellow-100 text-yellow-500";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export default InternsDashboard;
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import SlideToReply from './SlideToReply';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from "../../config/config";

const TicketDetails = ({ ticket, selectTicket }) => {
  const malePic="https://i.pinimg.com/originals/22/f8/1f/22f81f5c4011da6a803d997260b2c772.jpg"
  const femalePic="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-girl-avatar-png-image_4492903.jpg"
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  const handleConfirm = () => {
    if (currentAction === "Solved") {
      console.log("Ticket marked as Solved.");
    } else if (currentAction === "Pending") {
      console.log("Ticket marked as Pending.");
    } else if (currentAction === "Closed") {
      console.log("Ticket marked as Closed.");
    }
    setPopupVisible(false);
    handleUpdateTicket();
  };
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); 
  };
  
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
  };
  
  

  const goBack=()=>{
    selectTicket(null)
  }



  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleUpdateTicket = async(e) => {
    console.log("Close ticket clicked");

    try {
      const response=await axios.post(`${API_URL}/api/v1/ticketUpdating/${ticket.ticketID}`,{
        status:currentAction,
        name:ticket.name,
        email: ticket.email
      })
  
      if(response.data.success){
        toast.success("Ticket Updated successfully")
        window.location.reload()
      }
      else{
        toast.error("please try again")
      }
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    toast.error(errorMessage);
    }

    setIsDropdownVisible(false);
    
    
  };

  const handleDeleteTicket = async(e) => {
    e.preventDefault();
    console.log("Delete ticket clicked");

    try {
      const response=await axios.post(`${API_URL}/api/v1/ticketDelete/${ticket.ticketID}`,{
        status:"closed"
      })
      if(response.data.success){
        toast.success("Ticket Deleted successfully")
        window.location.reload()
      }
      else{
        toast.error("please try again")
      }
    } catch (error) {
      
    toast.error(error.response.data.message);
    }

    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col space-y-2 items-center justify-center'>
    <div className="bg-white p-6 rounded-md shadow-md w-[90%]" ref={dropdownRef}>
      {/* Ticket Header */}
      <div className="flex items-center justify-between mb-6 border-b-4 pb-4"  >
        <div className="flex items-center space-x-3">
          <div className='flex justify-between space-x-3'>
          <p className='text-2xl hover:cursor-pointer' onClick={goBack}>{'<'}</p>
          <img
            src={ticket.gender=='male'?`${malePic}`:`${femalePic}`}
            alt={ticket.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          </div>
        
          <div>
            
            <h3 className="text-lg font-bold">{ticket.name}</h3>
          </div>
        </div>
        <div>
          <HiOutlineDotsHorizontal
           onClick={handleToggleDropdown}
            className='hover:text-black hover:cursor-pointer h-5 w-5'/>
        </div>
        {isDropdownVisible && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md">
          <button
            onClick={handleDeleteTicket}
            className="block px-4 py-2 text-gray-700 text-red-500 hover:bg-gray-100 w-full text-left"
          >
            Delete Ticket
          </button>
        </div>
      )}
      </div>


      {/* Conversation Section */}
      <div className="mb-6">
            <p className="text-xl text-black font-semibold">Ticket #{ticket.ticketID}</p>
    <div className='w-full flex items-center justify-center flex-col'>

    <p className="text-sm text-blue-400">{formatDate(ticket.date)}</p> 
    <p className="text-sm text-blue-400">{formatTime(ticket.date)}</p>
    </div>

        <div className="mt-[1vw] flex flex-col space-y-[2vw]">
          <div className="bg-gray-200 p-4 rounded-md text-sm text-gray-800 w-max">
             {ticket.message}
          </div>
         {/* { <div className="bg-blue-100 p-3 rounded-md text-sm text-gray-800 w-max self-end">
            Support: 
          </div>} */}
        </div>
      </div>

      {/* Slide to Reply Section */}
      <div className='w-full flex justify-center items-center'>

      <SlideToReply ticket={ticket.ticketID} email={ticket.email} name={ticket.name}/>
      </div>

     

      {/* Ticket Status Section */}
      
    </div>
    <div className="bg-gray-50 pt-5 pl-6 pr-6 pb-5 rounded-md w-full bg-white shadow-lg">
    <div className="flex justify-between items-center mb-2 space-x-6">
      <div className='w-[80%]'>
        <p className="font-semibold text-lg">Ticket #{ticket.ticketID}</p>
        <p className="text-sm text-gray-500 mt-1">Details:</p>
        <p className="text-sm text-gray-600 mt-3">
      The ticket has been raised by {ticket.name} from the email address <span className='text-black'>
      {ticket.email}
        </span>.{' '}They have concerns regarding{' '}
      {ticket.subject} and are seeking a resolution.
      Please address the issue accordingly.
    </p>
      </div>
      <div className="flex flex-col w-[20%] space-y-2 bg-[#f7f7f7] rounded-[25px] shadow-lg p-3 relative">
      <p className="text-black text-md font-semibold text-center">Option</p>

      <button
        onClick={() => {
          setCurrentAction("Solved");
          setPopupVisible(true);
        }}
        className={`text-sm px-1 py-1 rounded-full text-black ${
          ticket.status.toLowerCase() === "solved"
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      >
        Solved
      </button>

      <button
        onClick={() => {
          setCurrentAction("Pending");
          setPopupVisible(true);
        }}
        className={`text-sm px-1 py-1 rounded-full text-black ${
          ticket.status.toLowerCase() === "pending"
            ? "bg-red-500"
            : "bg-gray-300"
        }`}
      >
        Pending
      </button>

      <button
        onClick={() => {
          setCurrentAction("Closed");
          setPopupVisible(true);
        }}
        className={`text-sm px-1 py-1 rounded-full text-black ${
          ticket.status.toLowerCase() === "closed"
            ? "bg-blue-500"
            : "bg-gray-300"
        }`}
      >
        Closed
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="absolute top-0 right-20 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4 w-[90%] sm:w-[400px]">
            <p className="text-gray-800 text-center">
              Are you sure you want to mark this ticket as{" "}
              <span className="font-bold">{currentAction}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setPopupVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-md text-white ${
                  currentAction === "Solved"
                    ? "bg-green-500 hover:bg-green-600"
                    : currentAction === "Pending"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

    {/* Ticket Description */}
    
  </div>
  </div>
  );
};

export default TicketDetails;

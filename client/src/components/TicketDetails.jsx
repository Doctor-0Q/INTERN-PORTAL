import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import SlideToReply from './SlideToReply';

const TicketDetails = ({ ticket, selectTicket }) => {
  const malePic="https://i.pinimg.com/originals/22/f8/1f/22f81f5c4011da6a803d997260b2c772.jpg"
  const femalePic="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-girl-avatar-png-image_4492903.jpg"
  
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

  return (
    <div className='flex flex-col space-y-2 items-center justify-center'>
    <div className="bg-white p-6 rounded-md shadow-md w-[90%]">
      {/* Ticket Header */}
      <div className="flex items-center justify-between mb-6 border-b-4 pb-4">
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
          <HiOutlineDotsHorizontal className='hover:text-black hover:cursor-pointer h-5 w-5'/>
        </div>
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

      <SlideToReply ticket={ticket.ticketID} email={ticket.email}/>
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
      <div className="flex flex-col w-[20%] space-y-2 bg-[#f7f7f7] rounded-[25px] shadow-lg p-3">
        <p className='text-black text-md font-semibold text-center'>
          Option
        </p>
        <button
          className={`text-sm px-1 py-1 rounded-full text-black ${
            ticket.resolved? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          Solved
        </button>
        <button
          className={`text-sm px-1 py-1 rounded-full text-black ${
            !(ticket.resolved)? 'bg-red-500' : 'bg-gray-300'
          }`}
        >
          Pending
        </button>
      </div>
    </div>

    {/* Ticket Description */}
    
  </div>
  </div>
  );
};

export default TicketDetails;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import totalGraph from "@/assets/totalTickets.png";
import solved from "@/assets/solved.png"
import pending from "@/assets/pending.png"
import chatBubble from "@/assets/chat_bubble.png"
import { API_URL } from "../../config/config";

const AdminSupportTickets = () => {
    const navigate = useNavigate();

    const handleTicketClick = (ticket) => {
      navigate('/admin/messages', { state: { selectedTicket: ticket } });
    };

    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketsPerPage] = useState(7); // Number of tickets per page
    const [loading, setLoading] = useState(true); // Track loading state
    
    const totalTickets = tickets?.length || 0;
    const solvedTickets = tickets?.filter(i => i.resolved === true)?.length || 0;
    const pendingTickets = tickets?.filter(i => i.resolved === false)?.length || 0;

    const malePic="https://i.pinimg.com/originals/22/f8/1f/22f81f5c4011da6a803d997260b2c772.jpg"
    const femalePic="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-girl-avatar-png-image_4492903.jpg"

  useEffect(() => {
    const fetchTickets = async () => {
        try {
          const response = await fetch(`${API_URL}/api/v1/supporttickets`); // Assuming the JSON is served from the public folder
          const data = await response.json();
          console.log('API Response:', data);
          setTickets(data.data || []);
        } catch (error) {
          console.error("Error fetching ticket data:", error);
        } finally {
          setLoading(false);
      }
      };
      fetchTickets();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets?.slice(indexOfFirstTicket, indexOfLastTicket) || [];

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

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

  if (loading) return <div>Loading tickets data...</div>;

  return (
    <div className="p-4 rounded-lg w-max">
        <div className='flex flex-row  ml-7 gap-5'> 
            <div className='h-[107px] w-[90px] bg-[#E7E9F6] rounded-xl'>
                <div className='flex-col flex'>
                    <h1 className='text-xs mt-2 ml-2 font-mukta font-semibold'>Total Support Tickets <span className='text-slate-700'> ({totalTickets}) </span> </h1>
                    <img src={totalGraph} height={85} width={130} alt=""/>
                </div>
            </div>
            
            <div className='flex-col flex gap-2'>
                <div className='h-[49px] w-[91px] bg-[#FBEBD2] rounded-sm'>
                    <div className='flex flex-row gap-2 mt-2 ml-2'>
                        <h1 className='font-mukta font-semibold text-xs '>Solved <br /> <span className='text-slate-600'> ({solvedTickets}) </span> </h1>
                        <img src={solved} height={32} width={40} alt="" className='mt-1 -ml-1'/>
                    </div>
                </div>
                <div className='h-[49px] w-[91px] bg-[#E6EEEC] rounded-sm'>
                    <div className='flex flex-row gap-2 mt-2 ml-2'>
                        <h1 className='font-mukta font-semibold text-xs '>Pending <br /> <span className='text-slate-600'> ({pendingTickets}) </span> </h1>
                        <img src={pending} height={65} width={65} alt="" className='-mt-4 -ml-5'/>
                    </div>
                </div>
            </div>
        </div>
    <div className='border-black min-h-[450px] h-auto md:w-[300px] mt-4 border-solid border-[1px] rounded-xl overflow-x-auto'> 
        <h3 className="text-lg font-semibold mt-4 ml-4">Support Tickets</h3>
        <div className='flex flex-row mr-3 gap-5 justify-end'>
            <div className='bg-[#a0ccff] rounded-full w-[22px] h-[10px] text-center text-white text-[6px]'> Date </div>
            <div className='bg-[#fd8686] rounded-full w-[22px] h-[10px] text-center text-white text-[6px]'> Time </div>
        </div>
        <ul className="mt-4 ml-4 space-y-2 flex flex-col gap-4 justify-start">
            {currentTickets.map((ticket, idx) => (
                <div key={ticket.ticketID} onClick={() => handleTicketClick(ticket)}
                className="cursor-pointer hover:bg-gray-50" >
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row'>
                            <img src={ticket.gender=='male'?`${malePic}`:`${femalePic}`} height={30} width={30} className='rounded-full' alt="" />
                            <div className='flex flex-col justify-center'>
                                <h1 className='ml-2 font-mukta font-semibold text-xs'> Ticket #{ticket.ticketID}</h1>
                                <h1 className='ml-2 text-slate-400 font-mukta font-normal text-[7px]'>{ticket.subject}</h1>
                            </div>
                        </div>
                        <div className='flex flex-row my-auto gap-5 mr-4'>
                            <div>
                                <img src={chatBubble} height={12} width={12} alt="" />
                            </div>
                            <h1 className='font-normal text-[4px] my-auto font-inter'>{formatDate(ticket.date)}</h1>
                            <h1 className='font-normal text-[4px] my-auto font-inter'>{formatTime(ticket.date)}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </ul>
            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <div className="pagination flex items-center">
                <button className="prev font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}> &lt; Prev </button>
                {renderPagination()}
                <button className="next font-mukta py-2 px-3 hover:cursor-pointer" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next &gt; </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminSupportTickets;
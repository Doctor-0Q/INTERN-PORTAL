import React, { useEffect, useState } from 'react';
import SupportTicket from './SupportTicket';
import Pagination from './Pagination';
import TicketDetails from './TicketDetails';
import { useLocation } from 'react-router-dom';


const AdminMessages = () => {
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(location.state?.selectedTicket || null);
  const [isMobileView, setIsMobileView] = useState(false); // State to track if it's mobile view
  const ticketsPerPage = 6;
    useEffect(() => {
        if (location.state?.selectedTicket) {
            setSelectedTicket(location.state.selectedTicket);
        }
    }, [location]);


  useEffect(() => {
    fetch('/tickets.json')
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets));

    // Event listener to handle window resize for mobile view detection
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Mobile if screen width is 768px or less
    };

    // Initial check and event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current tickets
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBackClick = () => {
    setSelectedTicket(null); // Set selected ticket to null to go back to ticket list
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-50 w-full">
      <div className="w-full flex justify-start p-4">
        <p className="w-full font-semibold text-gray-900 text-md text-left">
          Messages
        </p>
      </div>

      <div className="flex flex-row w-full">
        {/* Conditional rendering based on mobile view */}
        {isMobileView ? (
          <>
            {!selectedTicket ? (
              // Mobile view: Show tickets list if no ticket is selected
              <div className="w-full bg-white p-3 rounded-md">
                <h2 className="text-2xl font-bold mt-4 mb-4">Support Tickets</h2>
                {currentTickets.map((ticket) => (
                  <SupportTicket
                    key={ticket.ticketId}
                    name={ticket.name}
                    issue={ticket.issue}
                    status={ticket.status}
                    onClick={() => handleTicketClick(ticket)}
                  />
                ))}

                {/* Pagination Component */}
                <Pagination
                  ticketsPerPage={ticketsPerPage}
                  totalTickets={tickets.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              // Mobile view: Show ticket details if a ticket is selected
              <div className="w-full bg-white p-3 rounded-md">
                <TicketDetails
                  ticket={selectedTicket}
                  selectTicket={setSelectedTicket}
                />
              </div>
            )}
          </>
        ) : (
          // Desktop view: Show both tickets and details side-by-side
          <>
            <div className="mt-[3vw] ml-[5vw] bg-white p-3 rounded-md w-1/2">
              <h2 className="text-3xl font-bold mt-4 mb-4">Support Tickets</h2>
              {currentTickets.map((ticket) => (
                <SupportTicket
                  key={ticket.ticketId}
                  name={ticket.name}
                  issue={ticket.issue}
                  status={ticket.status}
                  onClick={() => handleTicketClick(ticket)}
                />
              ))}

              {/* Pagination Component */}
              <Pagination
                ticketsPerPage={ticketsPerPage}
                totalTickets={tickets.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>

            <div className="mt-[1vw] w-1/2 ml-[1vw]">
              {selectedTicket ? (
                <TicketDetails
                  ticket={selectedTicket}
                  selectTicket={setSelectedTicket}
                />
              ) : (
                <p className="text-gray-500 mt-[25vw]">Click on a ticket to view details</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

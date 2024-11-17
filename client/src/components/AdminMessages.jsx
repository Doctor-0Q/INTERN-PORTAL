import React, { useEffect, useState } from 'react';
import SupportTicket from './SupportTicket';
import Pagination from './Pagination';
import TicketDetails from './TicketDetails';
import { useLocation } from 'react-router-dom';
import { API_URL } from "../../config/config";

const AdminMessages = () => {
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(location.state?.selectedTicket || null);
  const [isMobileView, setIsMobileView] = useState(false); 
  const [filter, setFilter] = useState("Pending"); 
  const ticketsPerPage = 6;

    useEffect(() => {
    if (location.state?.selectedTicket) {
      setSelectedTicket(location.state.selectedTicket);
    }
  }, [location]);

  useEffect(() => {
    // Fetch tickets from the backend API
    fetch(`${API_URL}/api/v1/tickets`)  // Adjust this if you need to specify the full URL or add a port number
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error("Error fetching tickets:", error));

    // Event listener for resizing
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredTickets =
    filter === "All Tickets"
      ? tickets
      : tickets.filter((ticket) => ticket.status.toLowerCase() === filter.toLowerCase());

  // Get current tickets
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBackClick = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="flex flex-col  items-center bg-slate-50 w-full">
      <div className="flex flex-row justify-center items-center p-4 gap-16">
        {["All Tickets", "Pending", "Resolved", "Closed"].map((status) => (
          <p
            key={status}
            onClick={() => {
              setFilter(status);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className={` font-semibold text-gray-900 text-md  bg-gray-300 p-2 rounded-3xl shadow-md hover:cursor-pointer ${
              filter === status ? "bg-gray-400" : ""
            }`}
          >
            {status}
          </p>
        ))}
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
                    gender={ticket.gender}
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
                  key={ticket.ticketID}
                  name={ticket.name}
                  issue={ticket.message}
                  status={ticket.resolved}
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
                <p className="text-gray-500 mt-auto">Click on a ticket to view details</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

import React, { useState } from 'react';
import AdminInternStats from './AdminInternStats';
import AdminMembersList from './AdminMembersList';
import AdminSupportTickets from './AdminSupportTickets';
import NotificationModal from './AdminNotificationModal';

function AdminDashboard() {
  const [showMessageBox, setShowMessageBox] = useState(false);

  const showMessageModal = () => {
    setShowMessageBox(true);
  };

  const handleCloseModal = () => {
    setShowMessageBox(false);
  };

  return (
    <div className="md:p-6 w-full bg-slate-50 rounded-lg shadow-md">

      <div className="flex md:flex-row flex-col h-auto md:h-16 justify-between bg-white items-center mb-4">
        <h2 className="font-mukta text-slate-400 text-lg font-medium md:ml-5 md:mt-0 mt-5">
          {`Dashboard>Overview`}
        </h2>
        <button
        type="button"
        className="px-4 py-2 md:mr-5 mt-3 md:mt-0 mb-3 md:mb-0 bg-blue-700 text-white rounded hover:bg-blue-800"
        onClick={showMessageModal}
        >
          Send Notification
        </button>
      </div>
      <div className="flex md:flex-row flex-col w-[100%] mx-auto h-auto justify-end shadow-2xl bg-white mb-4">
        <div className='flex flex-col mt-8 ml-6 w-3/4'>
            <div>
                <AdminInternStats/>
            </div>
            <div className='mt-8'>
                <AdminMembersList/>
            </div> 
        </div>
          <div className='w-1/4 mr-24 mt-4 mb-4'>
              <AdminSupportTickets/>
          </div>
        
      </div>

      {/* Notification Modal */}
      <NotificationModal 
        visible={showMessageBox}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default AdminDashboard;

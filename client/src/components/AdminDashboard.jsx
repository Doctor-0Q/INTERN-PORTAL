import React from 'react';
import AdminInternStats from './AdminInternStats';
import AdminMembersList from './AdminMembersList';
import AdminSupportTickets from './AdminSupportTickets';

function AdminDashboard() {

  return (
    <div className="md:p-6 w-full bg-slate-50 rounded-lg shadow-md">

      <div className="flex md:flex-row flex-col h-auto md:h-16 justify-between bg-white items-center mb-4">
        <h2 className="font-mukta text-slate-400 text-lg font-medium ml-5 md:mt-0 mt-5">
          {`Dashboard>Overview`}
        </h2>
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
    </div>
  );
}

export default AdminDashboard;

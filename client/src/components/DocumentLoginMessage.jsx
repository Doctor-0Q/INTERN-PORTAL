import React from "react";
import { useNavigate } from 'react-router-dom';

const DocumentLoginMessage = () => {
  const navigate = useNavigate();
    return (
      <div className="flex items-center justify-center min-w-screen flex-col overflow-x-hidden mt-[23px] md:mt-0">
        <div className="mt-[10%] md:mt-[10%] lg:mt-[10%]">
        <h1 className="font-kantumruy text-custom-33 md:text-5xl font-bold text-black w-screen flex items-center justify-center">
          Download Documents
        </h1>

        <h1 className="w-screen text-customGray text-sm leading-5 text-center md:text-base font-geologica font-light mt-3 md:mt-6 flex items-center justify-center">
        Login To see available documents and Other Details Regarding <br/>
        Your Internship 
        </h1>

        <div className="w-80 mt-2 md:mt-10 mb-2 md:mb-10 justify-center mx-auto min-w-80 h-40 items-center flex flex-col bg-white rounded-[27px] border-black border">

            <button onClick={()=>{
                navigate('../login')
            }}  className="bg-black w-72 h-10 text-white px-4 py-2 rounded-[10px] mt-4">
                Login Here
            </button>

            <button onClick={()=>{
                navigate('../contact-us')
            }}  className="bg-white shadow-y-4 underline text-black px-4 py-2 rounded-[70px] mt-4">
                Support Box
            </button>
        </div>
      </div>
      </div>
        
    );
};

export default DocumentLoginMessage;

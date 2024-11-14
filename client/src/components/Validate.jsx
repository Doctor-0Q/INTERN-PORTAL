import React, { useState } from 'react';
import validateImg from '@/assets/validateImg.png'
import CertificateValidationMessage from './CertificateValidationMessage';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../config/config";


const Validate = () => {
  const navigate=useNavigate()
  const [valid, setValid] = useState(false);
  const [certificateID, setCertificateID] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!certificateID) {
      toast.error("Please enter certificate ID");
    } else {
      try {
        const response = await axios.post(`${API_URL}/api/v1/validateCertificate`, {
          id: certificateID,
        },{ withCredentials: true });
        if (response.data.success) {
          toast.success("Validation successfull")
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (error) {
        setValid(false);
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    // top part
    <div className="flex items-center justify-center min-w-screen flex-col overflow-x-hidden md:h-auto mt-[20px] md:mt-[0px]">
        <div className="overflow-x-hidden border border-b-[#BFD1E4] border-b-[0.2vw] border-t-transparent">
        <div className="flex flex-col md:flex-row mt-[10%]">
          <div className="flex flex-col gap-[7vw] md:gap-[10%] ml-[5%] md:w-[50%]">
            <div className=" text-3xl md:text-4xl font-bold text-gray-800">
              <h1>
              Certificate Validation: Confirm 
              It's Authenticity 
              </h1>
            </div>
            <div>
              <p className="w-[95%] text-lg text-gray-600 font-semibold">
              "Ensure the authenticity of your certificate with the 
 DOC-Q Intern Portal. Simply enter your unique 14-digit 
 certificate ID to verify its validity. This user-friendly feature 
 allows you to confirm the legitimacy of your credentials quickly
 and easily, providing peace of mind and assurance of your 
 accomplishments."
              </p>
            </div>
            <div>
              <button onClick={() => document.getElementById("form").scrollIntoView({ behavior: "smooth" })} className="bg-blue-600 text-white p-2 md:w-[13vw] rounded-md">
                Check Now
              </button>
            </div>
          </div>

          <div className="flex flex-end">
            <img src={validateImg} alt="" className="w-[80vw] md:w-[40vw] ml-[12%]" />
          </div>
        </div>
      </div>

    {/* second part */}
    <div className="flex flex-col mt-[10%] md:mt-[7%] md:h-[50vw]">
    <div className="min-w-screen flex flex-col items-center justify-center" id='form'>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 w-[90%] md:w-[40%] text-center">
          Validate Your Certificate
with Us !
          </h1>
          <p className="mt-[3%] md:mt-[2%] w-[70%] text-center text-md font-semibold text-gray-600">
          Validate your certificate with us! Simply enter your 14-digit certificate ID below to confirm its authenticity.
          Ensure that your credentials are recognized and verified in just a few easy steps.
          </p>
        </div>
    {/* {Form} */}
        <div className="flex justify-center items-center mt-[4%] bg-gray-50 flex-col">
      <div className={`${valid?'hidden':''} flex flex-col items-center space-y-4 p-6 w-[300px]`}>
        <form onSubmit={submitHandler} className={`${valid?'hidden':''} flex flex-col items-center space-y-4 w-full`}>
          
          <div className="flex flex-col items-start w-full">
            <label htmlFor="certificate-id" className="text-gray-700 font-medium mb-2">
              Certificate ID
            </label>
            <input
              id="certificate-id"
              value={certificateID}
              onChange={(event)=>{setCertificateID(event.target.value)}}
              type="text"
              placeholder="husbdh-uhd-3ta1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 border border-black hover:underline"
          >
            Validate
          </button>
        </form>

        <button onClick={(event)=>{
          event.preventDefault();
          navigate('/contact-us')
        }} className="w-full text-start text-md text-gray-700  underline hover:text-blue-500">
          Need Help?
        </button>
       
      </div>

      
    </div>

    {/* {Validate or not} */}
    <div className={`${valid?'':'hidden'}`}>
    <CertificateValidationMessage />

    </div>
    </div>
    </div>
  )
}

export default Validate
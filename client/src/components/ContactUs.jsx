import React, { useState } from 'react';
import documentImg from '@/assets/document.png'
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from "../../config/config";

const ContactUs = () => {
  const gender=localStorage.getItem('gender')
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    subject:'',
    message: '',
    gender:gender
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to the backend using axios
      const response = await axios.post(`${API_URL}/api/v1/createTicket`, formData);
      
      // Display success message from the server response
      setResponseMessage(response.data.message);
      toast.success("Ticket created")
      
      // Clear form fields
      setFormData({
        name: '',
        surname: '',
        email: '',
        subject: '',
        message: '',
        gender:'male'
      });
    } catch (error) {
      toast.error("Error. Please try again")
      console.error("Error submitting the support ticket:", error);
      setResponseMessage("Failed to submit the support ticket. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-w-screen flex-col overflow-x-hidden mt-[23px] md:mt-0">
      {/* {Top portion} */}

      <div className="overflow-x-hidden border-b-[0.7vw] border-gray-400">
        <div className="flex flex-col md:flex-row mt-[10%]">
          <div className="flex flex-col gap-[7vw] md:gap-[10%] ml-[5%] md:w-[50%]">
            <div className=" text-4xl md:text-5xl font-bold text-gray-800">
              <h1>
              Contact Us!
              </h1>
            </div>
            <div>
              <p className=" text-md text-gray-600 font-semibold">
              If you have any questions or need support, you can reach out to us anytime at support@docq.in. 
Our team is available 24/7 to assist you, and we guarantee a response within 24 hours. 
Whether it’s about document verification, technical issues, or general inquiries, 
we are always here to help. Your satisfaction and seamless experience are our top priorities. <br /><br />
"Got Questions? We're Here 24/7 to Help!"
              </p>
            </div>
            <div>
              <button  onClick={() => document.getElementById("contactForm").scrollIntoView({ behavior: "smooth" })} className="bg-blue-600 text-white p-2 md:w-[13vw] rounded-md">
              Contact Us!
              </button>
            </div>
          </div>

          <div className="flex flex-end">
            <img src={documentImg} alt="" className=" w-[70vw] md:w-[40vw] ml-[12%]" />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Form */}
      <section className="flex flex-col items-center py-12" id='contactForm'>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">CONTACT US</h2>
        <p className="text-center text-gray-600 mb-8">
          "Fill out the form below to reach us directly—we're here to assist you!"
        </p>

        <div className="w-full max-w-md bg-white p-[5%] rounded-[25px] shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4" >
            {/* Name Field */}
            <div>
              <label className="block text-gray-700" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Surname Field */}
            <div>
              <label className="block text-gray-700" htmlFor="surname">
                Surname:
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* {Subject} */}
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-700" htmlFor="message">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
            >
              Submit
            </button>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p className="text-center text-green-500 mt-4">{responseMessage}</p>
          )}
          <p className="text-center text-lg font-semibold mt-6 text-gray-500">
          "Got Questions? We're Here 24/7 to Help!"
          <br />
          <span className='text-sm font-normal'>
          This will be directly shared in the Admin Support Box

          </span>
          <br />
          <span className='text-md'>
          support@docq.in

          </span>
        </p> 
        </div>
        
      </section>
    </div>
  );
};

export default ContactUs;

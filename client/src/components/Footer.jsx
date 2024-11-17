import React from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 flex items-center justify-center border border-t-[#BFD1E4] border-[0.2vw]">
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-8 md:space-y-0 w-full">
        
        <div className="flex flex-col justify-center text-center md:text-start items-center md:mr-[10%]">
          <img src={Logo} alt="DOC-Q Logo" className="h-[10vw] md:h-[10vw]" />
          <p className="text-black text-sm mt-2 w-[90%] w-full">
            © 2024 DOC-Q INTERN PORTAL. <br /> All rights reserved.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center md:text-left w-full">
          
          <div>
            <h4 className="font-bold text-gray-600 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-blue-500">Career</a></li>
              <li><Link to="/contact-us" className="text-black hover:text-blue-500">Support</Link></li>
              <li><a href="#" className="text-black hover:text-blue-500">About</a></li>
              <li><Link to="/admin" className="text-black hover:text-blue-500">Admin Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-600 mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-blue-500">LinkedIn</a></li>
              <li><a href="#" className="text-black hover:text-blue-500">Instagram</a></li>
              <li><a href="#" className="text-black hover:text-blue-500">Twitter</a></li>
              <li><a href="#" className="text-black hover:text-blue-500">YouTube</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-600 mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/validate-certificate" className="text-black hover:text-blue-500">Validation</Link></li>
              <li><Link to="/profile" className="text-black hover:text-blue-500">Profile</Link></li>
              <li><a href="#" className="text-black hover:text-blue-500">Attendance & Leave</a></li>
              <li><a href="#" className="text-black hover:text-blue-500">Learning & Development</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold text-2xl text-gray-600 mb-3">Contact Us</h4>
            <p className="text-black mt-2">support@docq.in</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

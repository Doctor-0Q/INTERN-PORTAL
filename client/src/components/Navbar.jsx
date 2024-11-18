import React, { useEffect, useState } from 'react';
import Logo from '@/assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const malePic="https://i.pinimg.com/originals/22/f8/1f/22f81f5c4011da6a803d997260b2c772.jpg"
  const femalePic="https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-girl-avatar-png-image_4492903.jpg"

  
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); 
  const navigate = useNavigate();
  const gender=localStorage.getItem('gender')

  const [internName,setInternName]=useState(null)
  useEffect(() => {
    const storedInternID = localStorage.getItem('internName');
    
    
    if (storedInternID) {
      setInternName(storedInternID);
    }
  }, []);

  const goToHome = () => {
    navigate('./');
  };

  // Toggles the profile dropdown menu
  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  // Close the profile menu when clicked outside
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.profile-menu')) {
      setProfileOpen(false);
    }
  };

  const logout=()=>{
    localStorage.removeItem("internID");
    localStorage.removeItem("gender");
    localStorage.removeItem("internName");
    localStorage.removeItem("certificateId");
    localStorage.removeItem("dateOfJoining");
    localStorage.removeItem("role");
    navigate('../login')
  }

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className=" bg-[#f7fbff] fixed top-0 left-0 w-full z-10 flex justify-between items-center p-3 flex-col">
      <div className='container mx-auto px-1 flex justify-between items-center'>
        <img
          onClick={goToHome}
          src={Logo}
          alt="DOC-Q"
          className="hover:cursor-pointer h-[25vw] h-[8vw] md:h-[4vw] pl-2 p-1"
        />

        <div className="hidden md:flex items-center justify-center space-x-6 bg-blue-500 w-[50%] rounded-full h-[3.5vw]">
          <div className="text-lg text-gray-600 cursor-pointer pr-3">
            <i className="fas fa-search"></i>
          </div>
          <ul className="flex space-x-8 items-center">
            <li>
              <Link to="/" className="text-black font-semibold hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/intern-performance" className="text-black font-semibold hover:underline">
                Performance
              </Link>
            </li>
            <li>
              <Link to="/Validate-certificate" className="text-black font-semibold hover:underline">
                Validation
              </Link>
            </li>
            <li>
              <Link to='/documents' className="text-black font-semibold hover:underline">
                Documents
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-600 focus:outline-none ml-auto"
          >
            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
        </div>

        {/* Profile Icon and Dropdown */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="text-2xl text-gray-600 cursor-pointer">
            <i className="fas fa-bell"></i>
          </div>
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer profile-menu relative"
            onClick={toggleProfileMenu}
          >
            <img
              src={gender=='male'?`${malePic}`:`${femalePic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            
          </div>
          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg py-4 z-50">
              <p className="text-center text-sm mb-4">Signed in as <br /><strong>{internName?`${internName}`:"No one"}</strong></p>
              <hr />
              <ul className="flex flex-col space-y-3 px-[20%] py-3 font-semibold text-black">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-user text-xl"></i>
                  <Link to="/profile" className=" hover:underline">Profile</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-cog text-xl"></i>
                  <Link to="/Settings" className=" hover:underline">Settings</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-question-circle text-xl"></i>
                  <Link to="/contact-us" className=" hover:underline">Support</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-globe text-xl"></i>
                  <a href="#" className=" hover:underline">Language</a>
                </li>
              </ul>
              <div className="text-center mt-2 flex-start">
                <button
                onClick={logout} 
                className="bg-gray-200 text-gray-700 px-1 rounded hover:bg-gray-300">Login/Signout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden h-[200px]">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link  onClick={() => setIsOpen(!isOpen)}
                to="/"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link  onClick={() => setIsOpen(!isOpen)}
                to="/intern-performance"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                Performance
              </Link>
            </li>
            <li>
              <Link  onClick={() => setIsOpen(!isOpen)}
                to="/Validate-Certificate"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                Validation
              </Link>
            </li>
            <li>
              <Link  onClick={() => setIsOpen(!isOpen)}
                to="/documents"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                Documents
              </Link>
            </li>

            <li>
            <div className="md:flex items-center space-x-6">
          
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer profile-menu relative"
            onClick={toggleProfileMenu}
          >
            <img
              src={gender=='male'?`${malePic}`:`${femalePic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            
          </div>
          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg py-4 z-50">
              <p className="text-center text-sm mb-4">Signed in as <br /><strong>{internName?`${internName}`:"No one"}</strong></p>
              <hr />
              <ul className="flex flex-col space-y-3 px-[20%] py-3 font-semibold text-black">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-user text-xl"></i>
                  <Link  onClick={() => setIsOpen(!isOpen)} to="/profile" className=" hover:underline">Profile</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-cog text-xl"></i>
                  <Link  onClick={() => setIsOpen(!isOpen)} to="/Settings" className=" hover:underline">Settings</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-question-circle text-xl"></i>
                  <Link  onClick={() => setIsOpen(!isOpen)} to="/contact-us" className=" hover:underline">Support</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-globe text-xl"></i>
                  <a  onClick={() => setIsOpen(!isOpen)} href="#" className=" hover:underline">Language</a>
                </li>
              </ul>
              <div className="text-center mt-2 flex-start">
                <button 
                onClick={logout} 
                className="bg-gray-200 text-gray-700 px-1 rounded hover:bg-gray-300">Login/Signout</button>
              </div>
            </div>
          )}
        </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

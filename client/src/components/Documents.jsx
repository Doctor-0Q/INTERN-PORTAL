import React, { useEffect, useState } from 'react'
import offerLetterImg from '@/assets/OfferLetterImg.jpg';
import lorImg from '@/assets/LOR.jpg'
import certificateImg from '@/assets/certificate.png'
import DocumentLoginMessage from "./DocumentLoginMessage";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../config/config";

const Documents = () => {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [offerLetterPath, setOfferLetterPath] = useState("");
    const [role, setRole] = useState(""); // Use state for role
    const [internID, setInternID] = useState(null);
    const [downloadCertificate, setDownloadCertificate] = useState(false);
    const [downloadLOR, setDownloadLOR] = useState(false);

    useEffect(() => {

    const handleStorageChange = () => {
    const internId = localStorage.getItem('internID');
    console.log('Fetching data for intern:', internId);
    setIsLoggedIn(!!internId);
    };

    // Initial check
    const internId = localStorage.getItem('internID');
    setIsLoggedIn(!!internId);

    // Listen for changes
    window.addEventListener('storage', handleStorageChange);

        if (internId) {
            setInternID(internId);
        }

    if (internId) {
        setInternID(internId);
            const storedRole = localStorage.getItem('role');
            if (storedRole) {
                setRole(storedRole.trim().toLowerCase()); 
                 if (storedRole === "web developer") {
                    console.log("Role:", storedRole);
                    setOfferLetterPath("/view-OfferLetter-Web-Developer");
                } else if (storedRole === "app developer") {
                    console.log("Role:", storedRole);
                    setOfferLetterPath("/view-OfferLetter");
                } else if (storedRole === "python developer") {
                    console.log("Role:", storedRole);
                    setOfferLetterPath("/view-OfferLetter-Python-Developer");
                }else{
                    console.log("The code isnt working")
                }
            }

        const fetchDownloadPermissions = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/interns/${internId}`);
                
                if (response.data.canDownloadCertificate === "true") {
                    setDownloadCertificate(true);
                } else {
                    setDownloadCertificate(false);
                }
                
                if (response.data.canDownloadLOR === "true") {
                    setDownloadLOR(true);
                } else {
                    setDownloadLOR(false);
                }
            } catch (error) {
                console.error('Error fetching download permissions:', error);
            }
        };

        fetchDownloadPermissions();
        }

        return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
}, []);

    if (!isLoggedIn) {
    return <DocumentLoginMessage />;
  }

  return (
    <div className='w-screen text-center flex flex-col justify-center items-center p-4'>
        <div className='mt-[18%] md:mt-[12%]'>
            <h1 className='text-5xl font-bold text-gray-900'>
            View Your Documents
            </h1>

                <div className='mt-[4%] md:mt-[2%] flex justify-center items-center w-full text-gray-600 text-lg'>

            <p className='md:w-[60%]'>
            "Explore and access your personal documents, such as certificates, offer letters, 
performance reviews, and more. All your files are securely stored and easily accessible 
in one place for quick reference and verification."
            </p>
                </div>
        </div>

        {internID?(<div className='flex flex-col md:flex-row justify-center items-center mt-[7%] gap-6 md:gap-[7%] ml-[5%] mr-[5%]'>
        {/* {First div} */}
            <div className='bg-[#186cec] p-4 pr-10 pl-6 pb-6 rounded-[25px] border border-black md:w-[25%]'>
                <div className='flex flex-col '>
                <h1 className='text-white font-bold text-2xl text-start'>
                Your Offer 
                Letter
                </h1>
                <p className='text-white mt-[4%] text-start'>
                Click Below to View Or Download
                Your Offer Letter
                </p>
                <div className='hidden md:flex justify-center items-center mt-4'>
                    <img src={offerLetterImg} alt="" className='w-[20vw] h-[20vw]'/>
                </div>
                </div>
                <div className='mt-[4%] flex flex-row gap-[30%] ml-[4%]'>
                    <Link to={offerLetterPath} className='bg-transparent text-lg text-gray-800 font-semibold text-lg'>
                        View
                    </Link>
                    <Link to={`${offerLetterPath}?download=true`}  
                    target='_blank'
                    className='bg-white border border-black p-2 rounded-lg text-lg text-gray-800 font-semibold text-lg'>
                        Download
                    </Link>
                </div>
               
            </div>
{/* {Second div} */}
            <div className='bg-[#186cec] p-4 pr-8 pl-4 pb-6 rounded-[25px] border border-black md:w-[25%]'>
                <div className='flex flex-col '>
                <h1 className='text-white font-bold text-2xl text-start '>
                Letter Of 
Recommendation
                </h1>
                <p className='text-white mt-[4%] text-start w-full text-sm'>
                Click Below to View Or Download
Letter Of Recommendation
                </p>
                <div className='hidden md:flex justify-center items-center mt-4 flex-col'>
                    <img src={lorImg} alt="" className='w-[15vw] h-[15vw]'/>
                    <p className='text-white mt-[2%] text-sm'>
                    Here Belongs Your Letter 
                    Of Recommendation
                    </p>
                </div>
                </div>
                {downloadLOR && <div className='mt-[2.3vw] flex flex-row gap-[30%] ml-[4%]'>
                    <Link to="/Letter-Of-Recommendation" className='bg-transparent text-lg text-gray-800 font-semibold text-lg'>
                        View
                    </Link>
                    <Link to="/Letter-Of-Recommendation?download=true" className='bg-white border border-black p-2 rounded-lg text-lg text-gray-800 font-semibold text-lg'>
                        Download
                    </Link>
                </div>}
               
            </div>

            {/* {Third div} */}
            <div className='bg-[#186cec] p-4 pr-10 pl-6 pb-6 rounded-[25px] border border-black md:w-[25%]'>
                <div className='flex flex-col '>
                <h1 className='text-white font-bold text-2xl text-start w-[70%]'>
                Your Internship
Certificate
                </h1>
                <p className='text-white mt-[4%] text-start'>
                Click Below to View Or Download
InternShip Certificate
                </p>
                <div className='hidden md:flex justify-center items-center mt-4'>
                    <img src={certificateImg} alt="" className='w-[20vw] h-[17vw]'/>
                </div>
                </div>
                {downloadCertificate && <div className='mt-[4%] flex flex-row gap-[30%] ml-[4%]'>
                    <Link to="/view-certificate" className='bg-transparent text-lg text-gray-800 font-semibold text-lg'>
                        View
                    </Link>
                    <Link to='/view-certificate?download=true'
                    target="_blank" 
                    
                    className='bg-white border border-black p-2 rounded-lg text-lg text-gray-800 font-semibold text-lg'>
                        Download
                    </Link>
                </div>}
               
            </div>

             {/* {Appreciation certificate} */}
             <div className='bg-[#186cec] p-4 pr-10 pl-6 pb-6 rounded-[25px] border border-black md:w-[25%]'>
                <div className='flex flex-col '>
                <h1 className='text-white font-bold text-2xl text-start w-[70%]'>
                Certificate of Appreciation
                </h1>
                <p className='text-white mt-[4%] text-start'>
                Click Below to View Or Download
Appreciation Certificate
                </p>
                <div className='hidden md:flex justify-center items-center mt-4'>
                    <img src={certificateImg} alt="" className='w-[20vw] h-[17vw]'/>
                </div>
                </div>
                {downloadCertificate && <div className='mt-[4%] flex flex-row gap-[30%] ml-[4%]'>
                    <Link to="/Appreciation-certificate" className='bg-transparent text-lg text-gray-800 font-semibold text-lg'>
                        View
                    </Link>
                    <Link to='/Appreciation-certificate?download=true'
                    target="_blank" 
                    
                    className='bg-white border border-black p-2 rounded-lg text-lg text-gray-800 font-semibold text-lg'>
                        Download
                    </Link>
                </div>}
               
            </div>
            
        </div>):(<div className='h-[10vw] flex justify-center items-center text-4xl'>
            Please login first to access the documents
        </div>)}
        <div className='text-gray-500 text-md flex text-start flex-col pl-[10%] mt-[10%] md:mt-[5%]'>
            <p>
                Note
            </p>
            <br />

            <p className='md:w-[50%]'>
             
If you notice any discrepancies in your documents, please reach out to us 
at  support@docq.in . We’re here to assist you and will resolve the issue 
as quickly as possible.
            </p>
        </div>
        <div className='w-screen flex items-center justify-center mt-[7%]'>
            <button onClick={()=>{
                navigate('../contact-us')
            }} className='bg-[#186cec] md:w-[12vw] p-2 rounded-[10px] border border-black text-white'>
                Need Help?  
            </button>
        </div>
    </div>
  )
}

export default Documents

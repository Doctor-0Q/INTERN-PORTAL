import React, { useState, useEffect } from "react";
import graph from "@/assets/performance_graph.jpg";
import Bottom1 from '@/assets/bottom1.png'  
import Bottom2 from "@/assets/bottom2.png"
import Bottom3 from "@/assets/bottom3.png"
import GradientLineChart from "./GradientLineChart";
import PerformanceLoginMessage from "./PerformanceLoginMessage";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config/config";

const Performance = () => {
  const navigate=useNavigate();
  const [timeframe, setTimeframe] = useState('Weekly');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update the login check in useEffect
  useEffect(() => {
    // Add event listener for localStorage changes
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

    // Fetch data if logged in
    if (internId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/v1/interns/${internId}/performance`);
          console.log('API Response:', response.data);
          setPerformanceData(response.data);
        } catch (error) {
          console.error('Error fetching performance:', error);
        }
        setLoading(false);
      };
      fetchData();
    } 
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  if (!isLoggedIn) {
    return <PerformanceLoginMessage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }



    return (
      <div className="flex items-center justify-center min-w-screen flex-col overflow-x-hidden mt-[23px] md:mt-0">
      {/* {Top portion} */}

      <div className="overflow-x-hidden h-screen">
        <div className="flex flex-col lg:flex-row mt-[75px] md:mt-[200px]">
          <div className="flex flex-col gap-[7vw] lg:gap-[10%] ml-[5%] lg:ml-[5%] lg:w-[50%]">
            <div className=" text-2xl font-kantumruy md:text-custom-41 md:leading-custom-74 md:font-bold md:font-kantumruy font-bold text-black">
              <h1 className="md:text-left md:justify-start">
              DOC-Q User Performance <br className="md:hidden lg:block"/> Overview
              </h1>
            </div>
            <div className="">
              <p className="w-[80%] text-customGray text-base font-geologica font-light md:text-left md:justify-start ">
              A detailed dashboard where users can track their performance metrics 
              on a weekly or monthly basis. Visual charts and graphs display key
              indicators such as task completion, project contributions, and received
              feedback, providing a clear overview of growth and achievements over time.
              </p>
            </div>
            <div>
              <button onClick={() => document.getElementById("performance").scrollIntoView({ behavior: "smooth" })}  className="bg-blue-600 text-white p-2 max-w-max px-2 py-2 md:w-[230px] md:h-[50px] rounded-md mt-1 md:mt-2 border-x border-y border-black">
                Check Performance
              </button>
            </div>
          </div>

          <div className="flex flex-end">
            <img src={graph} alt="Placeholder Graph" className=" w-[70%] mt-10 md:mt-16 lg:mt-5 lg:w-[40vw] lg:-mr-10 ml-[12%]" />
          </div>
        </div>
      </div>
      <div className="mt-0 md:mt-0 lg:mt-[4%]" id="performance">
        <h1 className="text-custom-33 md:text-5xl font-semibold text-gray-800 w-screen flex items-center justify-center">
          Performance  Overview
        </h1>

        <h1 className="w-screen text-customGray text-sm leading-5  md:text-base font-geologica font-light mt-3 md:mt-6 flex items-center justify-center">
            Here is your Performance system where <br className="visible md:hidden" />you can see your overall performance
        </h1>

        {/* <div className="w-3/4 mt-3 mx-auto">
          <h1 className="">
            Dashboard
          </h1>
        </div> */}
        <h1 className="sm:hidden mt-7 text-3xl mb-4 font-bold justify-center items-center flex">DashBoard</h1>
          <div className=" w-9/12 mx-auto flex sm:flex-col flex-col-reverse items-center sm:items-start sm:space-y-4">
          
          <div className="text-center md:mt-16 sm:text-left sm:flex sm:items-center sm:space-x-4 mb-4 md:-mb-2 sm:mb-0 w-full">
            <h1 className="text-2xl font-bold hidden sm:block mr-5">Dashboard</h1>

            
            <div className="flex justify-center sm:justify-start space-x-2 mt-4 sm:mt-0">
              <button 
                className={`px-4 py-2 rounded-[100px] ${timeframe === 'Weekly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setTimeframe('Weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-4 py-2 rounded-[100px] ${timeframe === 'Monthly' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setTimeframe('Monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-4 py-2 rounded-[100px] ${timeframe === 'Overall' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => setTimeframe('Overall')}
              >
                Overall
              </button>
            </div>
          </div>

          
          <div className="w-full h-auto bg-gray-200 p-4">
            <GradientLineChart timeframe={timeframe} performanceData={performanceData}/>
          </div>
        </div>
        <div className=" text-xs font-kantumruy md:text-xs mt-2 md:mt-10 md:leading-6 md:font-bold md:font-kantumruy font-bold text-black justify-center text-center">
              <h1 className="mx-2 ">
              This is your overall performance. If you notice any discrepancies or need assistance, please feel free to connect with us regarding your concerns. We're here to help!
              </h1>

              <button onClick={()=>{
                navigate('../contact-us')
            }} 
            className="bg-white shadow-y-4 underline text-black px-4 py-2 rounded-[70px] mt-4">
                Support Box
              </button>
        </div>

        <div className=" w-[80%] mt-12 mb-8 md:mt-16 mx-auto flex justify-center space-x-6 md:space-x-16">
          <div className="w-1/3">
            <img src={Bottom1} alt="Image 1" className="w-full h-auto object-cover" />
          </div>
          <div className="w-1/3">
            <img src={Bottom2} alt="Image 2" className="w-full h-auto object-cover" />
          </div>
          <div className="w-1/3">
            <img src={Bottom3} alt="Image 3" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
      </div>
        
    );
  };
  
export default Performance;
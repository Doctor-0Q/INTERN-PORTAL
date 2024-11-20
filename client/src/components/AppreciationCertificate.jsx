import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import appreciationPng from '@/assets/appriciationCertificate.png'

const AppreciationCertificate = () => {
    const internName = localStorage.getItem("internName");
    const location = useLocation();
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const [downloaded, setDownloaded] = useState(false);
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      if (params.get("download") === "true" && !downloaded) {
        handleDownload();
      }
    }, [downloaded, location.search]); 
  
    const handleDownload = async () => {
      const element = document.getElementById("appreciation-letter-div");
  
      if (!element) {
        console.error("Offer letter element not found");
        return;
      }
  
      try {
        const dataUrl = await domtoimage.toJpeg(element, {
          quality: 0.95,
          width: 1000,
          height: 650,
          scale: 2,
          bgcolor: "#ffffff",
          style: {
            overflow: "hidden",
            border: "none",
          },
        });
  
        window.close(); 
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "Intern-appreciation-letter.jpg";
        link.click();
  
        setDownloaded(true);
      } catch (error) {
        console.error("Error capturing element:", error);
      }
    };
  
  
    return (
      <div className="flex justify-center items-center flex-col p-6 mt-[5%]">
        <div
          id="appreciation-letter-div"
          className="w-[1050px] h-[650px] bg-white p-6 border-white flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${appreciationPng})`,
      backgroundSize: '1000px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
            overflow: "hidden",
            border: "none",
            boxShadow: "none",
          }}
        >
          <p className="border-transparent mt-[160px] font-serif font-semi-bold text-5xl">{internName}</p>
          <p className="w-full border-transparent font-sans text-lg ml-[510px] mt-[200px]">
            {formattedDate}
          </p>
  
        </div>
        <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-blue-500 text-white rounded-full"
      >
        Download
      </button>
      </div>
    );
}

export default AppreciationCertificate
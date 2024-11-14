import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import signature from '@/assets/signatue2.png'

const OfferLetterWebDeveloper = () => {
  const internName = localStorage.getItem("internName");
  const location = useLocation();
  
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("download") === "true" && !downloaded) {
      handleDownload();
    }
  }, [downloaded, location.search]); 

  const handleDownload = async () => {
    const element = document.getElementById("offer-letter-div");

    if (!element) {
      console.error("Offer letter element not found");
      return;
    }

    try {
      const dataUrl = await domtoimage.toJpeg(element, {
        quality: 0.95,
        width: 550,
        height: 850,
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
      link.download = "Intern-offer-letter.jpg";
      link.click();

      setDownloaded(true);
    } catch (error) {
      console.error("Error capturing element:", error);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(); 
  };
  const startDate =formatDate(localStorage.getItem('dateOfJoining')) 

  return (
    <div className="flex justify-center items-center flex-col p-6 mt-[5%]">
      <div
        id="offer-letter-div"
        className="w-[550px] h-[650px] bg-white p-6 border-white"
        style={{
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
        }}
      >
        {/* Offer Letter Content */}
        <h2 className="text-center text-3xl font-bold mt-1 text-[#1e62cb] border-white">{internName}</h2>
        <h3 className="text-center text-sm mt-2 border-white">INTERNSHIP IN DOC-Q</h3>
        <h4 className="text-center text-md font-semibold mt-4 text-[#1e62cb] border-2 border-r-white border-l-white border-t-black border-b-black border-white">
          SUBJECT: Offer Letter
        </h4>
        
        <p className="mt-2 text-sm border-white">Dear {internName},</p>
        <p className="mt-3 text-sm border-white">
        We are pleased to offer you the opportunity to join DOCQ as a Web Developer. We
believe your skills and potential align well with our goals, and we are excited about
the possibility of you contributing to our projects.

        </p>
        
        <p className="mt-5 border-white text-sm">
        Benefits: This role offers invaluable experience and growth opportunities. Successful
performance may lead to future full-time employment with a competitive salary,
based on evaluation and availability.
Your employment with DOCQ will be based on performance. We believe in rewarding
excellence, and outstanding performance in this role may lead to further
opportunities within our company.

        </p>
        <p className="mt-5 border-white text-sm">
        We are excited about the potential of having you join our team and are confident that
your contributions will be instrumental in our success. We look forward to working
with you and exploring future possibilities together.


        </p>
        <div className="flex border-white">
          <div className="flex flex-col text-start w-[30%] ml-[60%] border-white">
          <p className="mt-5 text-sm border-white">Sincerely,</p>
        <img src={signature} alt=""  className="border-white"/>
        <p className="border-white">Co Founder And CEO</p>
          </div>
        
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-blue-500 text-white rounded-full"
      >
        Download Offer Letter
      </button>
    </div>
  );
};

export default OfferLetterWebDeveloper;

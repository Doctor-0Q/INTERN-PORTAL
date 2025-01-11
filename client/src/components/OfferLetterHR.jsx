import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import signature from '@/assets/signatue2.png'

const OfferLetterHR = () => {
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
        width: 650,
        height: 1050,
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
        className="w-[650px] h-[1050px] bg-white p-6 border-white"
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
          SUBJECT: OFFER LETTER FOR HR MANAGER POSITION
        </h4>
        
        <p className="mt-2 text-sm border-white">Dear {internName},</p>
        <p className="mt-3 text-sm border-white">
        We are pleased to extend this offer to you for the position of HR Manager at DOC-Q. We
are confident that your skills and expertise will contribute significantly to our ongoing
projects and success.
        </p>
        
        <h4 className="mt-4 font-semibold text-sm border-white">Position Details:</h4>
        <ul className="list-disc ml-8 mt-1  text-sm border-white">
          <li className="border-white">Title: HR Manager</li>
          <li className="border-white">Joining: {startDate}</li>
          <li className="border-white">Location: Remote</li>
        </ul>

        <h4 className="mt-4 font-semibold text-sm border-white">Responsibilities:</h4>
        <p className="mt-1 text-sm border-white">
        As an HR Manager, you will be responsible for overseeing recruitment, onboarding, and employee relations while fostering
        a positive and inclusive work environment. You will manage performance evaluations, training programs, and compensation strategies 
        to support employee growth and satisfaction. Additionally, you will ensure compliance with company policies and labor laws, 
        analyze workforce trends, and align HR initiatives with organizational objectives to drive overall success.
        </p>

        <h4 className="mt-4 font-semibold text-sm border-white">Benefits and Growth Opportunities:</h4>
        <p className="mt-2 text-sm border-white">
        At DOC-Q, we value growth and potential. While this is an contractual position, there are
numerous opportunities for advancement, contingent on your performance. Here are some of
the benefits you can expect:

        </p>
        <ul className="list-disc ml-8 mt-2 text-sm border-white">
          <li className="border-white"><span className="border-white text-sm underline">
          Experience and Learning:
            </span> You will gain hands-on experience in a collaborative and
innovative environment.
</li>
          <li className="border-white"><span className="border-white text-sm underline">
          Growth Potential: 
            </span>  Based on your performance, there may be opportunities for fulltime employment with a competitive salary package.</li>
          <li className="border-white"><span className="border-white text-sm underline">
          Skill Development:
            </span> This role offers exposure to real-world projects and learning
            opportunities in development, and other relevant fields</li>
        </ul>

        
        <p className="mt-2 text-sm border-white">
        We are excited to welcome you as an HR Manager at Docq. Your expertise will play a crucial
role in fostering a collaborative and innovative work environment. We are confident that
your contributions will help us achieve our goals and enhance the overall success of our
team. Welcome aboard!

        </p>

        
        <div className="flex border-white mt-[60px]">
          <div className="flex flex-col text-start w-[30%] ml-[60%] border-white">
          
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

export default OfferLetterHR;

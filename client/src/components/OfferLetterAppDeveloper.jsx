import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import signature from '@/assets/signatue2.png'

const OfferLetterAppDeveloper = () => {
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
          SUBJECT: Internship Offer Letter for App Developer
        </h4>
        
        <p className="mt-2 text-sm border-white">Dear {internName},</p>
        <p className="mt-3 text-sm border-white">
          We are pleased to extend to you an offer to join DOC-Q Technologies Pvt. Ltd. as an App
          Development Intern. Congratulations on your selection! We were impressed with your
          skills and potential, and we are confident that you will make a valuable addition to our
          team.
        </p>
        
        <h4 className="mt-4 font-semibold text-sm border-white">Position Details:</h4>
        <ul className="list-disc ml-8 mt-1  text-sm border-white">
          <li className="border-white">Position: App Developer</li>
          <li className="border-white">Location: Remote</li>
        </ul>

        <h4 className="mt-4 font-semibold text-sm border-white">Responsibilities:</h4>
        <p className="mt-1 text-sm border-white">
          You'll design, develop, and test app features based on project needs, integrating backend
          APIs and optimizing performance for efficiency. Collaborating with UI/UX designers, you’ll
          ensure the app is visually appealing and user-friendly. Additionally, you’ll debug issues
          promptly and participate in code reviews to enhance functionality.
        </p>

        <h4 className="mt-4 font-semibold text-sm border-white">Benefits and Growth Opportunities:</h4>
        <p className="mt-1 text-sm border-white">
          At DOC-Q, we value growth and potential. While this is an internship/contractual position,
          there are numerous opportunities for advancement, contingent on your performance.
          Here are some of the benefits you can expect:
        </p>
        <ul className="list-disc ml-8 mt-2 text-sm border-white">
          <li className="border-white">Gain hands-on experience in app development.</li>
          <li className="border-white">Opportunity to work alongside skilled professionals in a fast-paced environment.</li>
          <li className="border-white">Access to resources and mentorship for skill development and future job opportunities.</li>
        </ul>

        <p className="mt-2 text-sm border-white">
          As an App Developer Intern, you will have the opportunity to work on various aspects of
          app development, which include, but are not limited to, designing and implementing app
          features, fixing bugs, optimizing performance, and collaborating closely with our tech
          and design teams to ensure a seamless user experience. We are committed to providing you
          with a supportive and enriching learning environment that will allow you to grow and
          refine your skills.
        </p>

        <h4 className="mt-4 font-semibold text-sm border-white">Stipend:</h4>
        <p className="mt-1 text-sm border-white">
          Your role as an intern is unpaid initially; however, there are incentives for exceptional
          performance, and you may receive a stipend based on project milestones or successful
          onboarding of clients or users onto the platform.
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

export default OfferLetterAppDeveloper;

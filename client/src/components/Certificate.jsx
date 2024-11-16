import React, { useEffect } from "react";
import domtoimage from "dom-to-image-more";
import logo from '@/assets/Logo.png'
import signature from '@/assets/signature.png'
import { useLocation } from "react-router-dom";

const Certificate = () => {
  const internName = localStorage.getItem("internName");
  const certificateId = localStorage.getItem("certificateId");
  const location = useLocation();
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const nameElement = document.getElementById("name-placeholder");
    const dateElement = document.getElementById("date-placeholder");

    if (nameElement && dateElement) {
      nameElement.textContent = internName;
      dateElement.textContent = currentDate;
    }

    const params = new URLSearchParams(location.search);
    if (params.get("download") === "true") {
      handleDownload();
    }
  }, [internName, currentDate]);

  const handleDownload = async () => {
    const element = document.getElementById("certificate-div");

    if (!element) {
      console.error("Certificate element not found");
      return;
    }

    try {
      const dataUrl = await domtoimage.toJpeg(element, {
        quality: 0.95,
        width: 595,
        height: 900,
        scale: 2,
        bgcolor: "#ffffff",
        style: {
          overflow: "hidden",
          border: "none",
        },
      });
      window.close()
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Intern-certificate.jpg";
      link.click();
      
    } catch (error) {
      console.error("Error capturing element:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-6 mt-[5%]">
      <div
        id="certificate-div"
        className="w-[595px] h-[900px] bg-white p-6 border-white"
        style={{
          overflow: "hidden",
          border: "none", 
          boxShadow: "none", 
        }}
      >
        {/* Top docq logo */}
        <div className="text-center border-4 border-t-white border-l-white border-r-white border-b-black">
          <img
            src={logo}
            alt="docq logo"
            className="mx-auto w-[17vw] border-white"
          />
        <h4 className="text-center text-lg font-semibold border-white">(Certificate No. {certificateId})</h4>
        </div>


        <p className="text-center my-1 text-sm border-white">
          01 Puttenahall Gramatana, Puttenahall, V NAYAK NAGAR, Bangalore 560078
        </p>

        <p className="mt-[10%] border-white">
          Date: <span id="date-placeholder" className="border-white">{currentDate}</span>,
        </p>

        <p className="my-4 text-center font-bold border-white">TO WHOM IT MAY CONCERN</p>

        <p className="my-4 border-white">
          This is to certify that Mr. <span id="name-placeholder" className="border-white"> {internName}</span> has successfully completed
          his internship in <strong className="border-white">Development at DOC-Q</strong> starting from <strong className="border-white">6th February 2024</strong>.
        </p>

        

  {/* Content layer */}
  <div style={{ position: 'relative', zIndex: 2, padding: '1rem' }}>
    <p className="my-4 border-white" style={{ textIndent: '6rem' }}>
      He has worked on a project titled 'DOC Q'. This project was aimed to build a healthcare management system (HMS)
      for doctors and patients to ease their appointment scheduling, record-keeping, and the consultations. As part of
      the project, he has developed the backend of the platform from scratch with his team.
    </p>

    <p className="my-4 border-white" style={{ textIndent: '6rem' }}>
      During the internship, he demonstrated excellent developer skills with a self-motivated attitude to learn new
      skills. His performance exceeded expectations and he was able to complete the project successfully on time.
    </p>
  </div>

  <div
    style={{
      position: 'absolute',
      top: 100,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${logo})`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.2, // Adjust the background opacity
      zIndex: 1,
    }}
  ></div>

        <p className="my-4 w-[70%] border-white">We wish him all the best for his future endeavors <br /> from the team at DOC-Q</p>

        {/* Signature */}
        
        <div className="flex flex-col w-full items-end border-white">
          <div className="flex flex-col justify-center items-center border-white">

        <p className="text-center mt-4 font-bold text-lg border-white">Founder and CEO</p>
        <div className="text-center border-white">
          <img
            src={signature}
            alt="Signature"
            className="mx-auto border-white"
            style={{ width: "200px" }}
          />
        </div>
          </div>
        </div>
        
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 p-2 bg-blue-500 text-white rounded-full"
      >
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;

import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import certificateImg from '@/assets/CERTIFICATE-1.png'

const Certificate = () => {
  const internName = localStorage.getItem("internName");
  const certificateId = localStorage.getItem("certificateId");
  const [role, setRole] = useState(localStorage.getItem("role") || 'development');
  const location = useLocation();
  const currentDate = new Date().toLocaleDateString();

  if(role.toLowerCase()==='web developer'){
    setRole("Web development")
  }
  else if(role.toLowerCase()==='python developer'){
    setRole("Python development")
  }
  else if(role.toLowerCase()==='app developer'){
    setRole("App development")
  }

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
        width: 1050,
        height: 650,
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
      className="w-[1050px] h-[650px] bg-white p-6 border-white flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${certificateImg})`,
  backgroundSize: '1000px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
        overflow: "hidden",
        border: "none",
        boxShadow: "none",
      }}
    >
      <p className="border-transparent -mt-[305px] font-serif font-semi-bold text-5xl">{internName}</p>
      <p className="w-[200px] border-transparent font-serif mt-[60px] ml-[230px] font-semi-bold text-md">{role}</p>
      <p className="w-full border-transparent font-sans text-lg ml-[590px] mt-[90px]">
        {currentDate}
      </p>
      <div className="border-transparent w-full flex justify-center mt-[70px] -mb-[570px]">
    <p className="w-[150px] border-transparent font-sans text-[10px]">
      Certificate ID: {certificateId}
    </p>
  </div>

    </div>
    <button
    onClick={handleDownload}
    className="mt-4 p-2 bg-blue-500 text-white rounded-full"
  >
    Download
  </button>
  </div>
  );
};

export default Certificate;

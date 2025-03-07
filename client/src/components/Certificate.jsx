import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import certificateImg from '@/assets/CERTIFICATE-1.png'

const Certificate = () => {
  const internName = localStorage.getItem("internName");
  const certificateId = localStorage.getItem("certificateId");
  const leaveDate = localStorage.getItem("leaveDate") || "No date";
  const [role, setRole] = useState(localStorage.getItem("role") || 'development');
  const location = useLocation();

  if(role.toLowerCase()==='web-developer'){
    setRole("Web development")
  }
  else if(role.toLowerCase()==='python-developer'){
    setRole("Python development")
  }
  else if(role.toLowerCase()==='app-developer'){
    setRole("App development")
  }
  else if(role.toLowerCase()==='hr'){
    setRole("Hr Manager")
  }

  useEffect(()=>{
    if(role.toLowerCase()==='web-developer'){
      setRole("Web development")
    }
    else if(role.toLowerCase()==='python-developer'){
      setRole("Python development")
    }
    else if(role.toLowerCase()==='app-developer'){
      setRole("App development")
    }
    else if(role.toLowerCase()==='hr'){
      setRole("Hr Department")
      setMarginLeft('250px')
    }
  },[])

  useEffect(() => {
    const nameElement = document.getElementById("name-placeholder");

    if (nameElement) {
      nameElement.textContent = internName;
    }

    const params = new URLSearchParams(location.search);
    if (params.get("download") === "true") {
      handleDownload();
    }
  }, [internName]);

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
      <p className="w-full text-center border-transparent -mt-[315px] font-serif font-semi-bold text-5xl">{internName}</p>
      <p className={`w-[555px] bg-white border-transparent font-serif mt-[60px]  font-arimo text-gray-500 text-md text-center`}>has successfully completed an internship in 
        <span className="font-semibold border-transparent">
          {' '}
        {role}
        {'. '}
        </span> Throughout the
program you demonstrated exceptional dedication, technical proficiency, and a strong
commitment to learning and growth. Your ability to innovate, adapt, and apply creative
solutions has been truly commendable.
</p>
      <p className="w-full border-transparent font-sans text-md ml-[590px] mt-[20px]">
        {leaveDate}
      </p>
      <div className="border-transparent w-full flex justify-center mt-[70px] -mb-[570px]">
    <p className="w-full text-center border-transparent font-sans text-[10px]">
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

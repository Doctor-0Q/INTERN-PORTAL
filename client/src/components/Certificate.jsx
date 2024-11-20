import React, { useEffect } from "react";
import domtoimage from "dom-to-image-more";
import { useLocation } from "react-router-dom";
import certificateImg from '@/assets/certificate-1.png'

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
      <p className="border-transparent -mt-[240px] font-serif font-semi-bold text-5xl">{internName}</p>
      <p className="w-full border-transparent font-sans text-lg ml-[590px] mt-[170px]">
        {currentDate}
      </p>
      <p className="w-full border-transparent font-sans text-lg ml-[865px] mt-[50px] -mb-[500px]">
        Certificate ID: {certificateId}
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
};

export default Certificate;

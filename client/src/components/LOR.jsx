import React, { useEffect } from "react";
import domtoimage from "dom-to-image-more";
import signature from '@/assets/signatue2.png'
import background from '@/assets/LORbg.png'

const LOR = () => {
  const internName = localStorage.getItem("internName") || "Intern's Name";
  const projects = localStorage.getItem("projects") || "";
  const department = localStorage.getItem("role") || "Development";
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    const nameElement = document.getElementById("lor-name-placeholder");
    const dateElement = document.getElementById("lor-date-placeholder");

    if (nameElement && dateElement) {
      nameElement.textContent = internName;
      dateElement.textContent = currentDate;
    }
  }, [internName, currentDate]);

  const handleDownload = async () => {
    const element = document.getElementById("lor-div");

    if (!element) {
      console.error("LOR element not found");
      return;
    }

    try {
      const dataUrl = await domtoimage.toJpeg(element, {
        quality: 0.95,
        width: 720,
        height: 1050,
        bgcolor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Letter_of_Recommendation.jpg";
      link.click();
    } catch (error) {
      console.error("Error capturing element:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-6 mt-10 border-white">
      <div
        id="lor-div"
        className="w-[720px] h-[1050px] bg-white border-white pl-[4vw] p-10 shadow-lg relative"
        style={{ fontFamily: "Arial, sans-serif",
             backgroundImage: `url(${background})`, 
          backgroundSize: "cover",
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
            }}
      >
        {/* Header */}
        <div className="text-left mb-4 mt-4 border-white">
          <h1 className="text-3xl text-[#1e62cb] font-semibold mb-1 w-[50%] border-white">Letter of Recommendation</h1>
          <p className="text-sm mb-4 mt-2 border-white">Date: <span id="lor-date-placeholder" className="border-white">{currentDate}</span></p>
        </div>

        {/* Address */}
        <div className="text-sm mb-6 mt-[3.6vw] border-white">
          <p className=" border-white">DOC-Q</p>
          <p className=" border-white">01 Puttenahalli Gramatana,</p>
          <p className=" border-white">Bangalore - 560078</p>
        </div>

        {/* Main Content */}
        <p className="text-base mb-4 font-bold border-white">Mr./Ms. <span id="lor-name-placeholder" className="font-bold border-white">{internName}</span>,</p>

        <p className="text-base mb-4 border-white">
          I am writing to recommend <span className="font-bold border-white">{internName}</span> for [Position or opportunity]
          During their time with DOC-Q
          as an intern in our department {department}, <span className="font-bold border-white">{internName}</span> has demonstrated exceptional skills, dedication, 
          and a strong commitment to excellence.
        </p>

        <p className="text-base mb-4 border-white">
          Their contributions have significantly impacted our projects, such as <span className="font-bold border-white">{projects}</span>. 
          Beyond their technical skills, <span className="font-bold border-white">{internName}</span> has proven to be a proactive team player, 
          collaborating effectively with colleagues and offering creative solutions to challenges.
        </p>

        <p className="text-base mb-4 border-white">
          I am confident that <span className="font-bold border-white">{internName}</span> will bring the same level of excellence, professionalism, 
          and passion to any endeavor they pursue. They have my highest recommendation, and I am certain they will make a valuable addition 
          to any team or organization.
        </p>

        <p className="text-base mb-8 border-white">
          Please feel free to contact me at <a href="mailto:support@doc-q.in" className="text-blue-500 border-white">support@doc-q.in</a> if you require any additional information.
        </p>

        {/* Footer */}
        <div className="flex mt-[4vw] border-white">

        
        <div className="flex w-full flex-col border-white">
          <p className=" border-white">Best regards,</p>
          <div className="flex items-center mt-4 border-white">
            <img src={signature} alt="Signature" className="w-[15vw] mr-4 border-white" />
          </div>
            <div className="border-white">
              <p className="font-bold border-white">Usman Basha</p>
              <p className="text-sm border-white">CEO, DOC-Q</p>
            </div>
            </div>
          <div className="mt-4 text-sm flex items-start flex-col space-y-4 border-white w-[70%]">
            <p className="border-white flex"><span className=" border-white">📧</span> support@docq.in</p>
            <p className="border-white flex"><span className=" border-white">📞</span> N/A</p>
            <p className="border-white flex"><span className=" border-white">📍</span> 01 Puttenahalli Gramatana, Bangalore - 560078</p>
          </div>
          </div>

        
      </div>
      
      <button
        onClick={handleDownload}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
      >
        Download LOR
      </button>
    </div>
  );
};

export default LOR;

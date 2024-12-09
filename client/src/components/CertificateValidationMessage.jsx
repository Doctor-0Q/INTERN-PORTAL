import React from 'react';
import logo from '@/assets/Logo.png'

const CertificateValidationMessage = () => {
  return (
    <div className="flex justify-center items-center mt-[4%] bg-gray-50">
      <div className="w-[500px] bg-white rounded-[50px]  p-8 relative inner-shadow"> 
        <div className="icon-shadow w-[7vw] h-[7.5vw] bg-white absolute top-[-60px] left-1/2 transform -translate-x-1/2 rounded-full shadow-lg">
          <img
            src={logo} 
            alt="DOC-Q Logo"
            className="absolute w-[4vw] h-[4vw] translate-x-[30%] translate-y-[50%]" 
          />
        </div>

        <h2 className="mt-[6%] text-[#29c22f] text-2xl font-semibold text-center mb-4">Yes, The Certificate is Valid</h2>

        <div className="text-gray-800 text-lg font-semibold text-center">Performance: Good</div>
        <div className="text-gray-800 text-lg font-semibold text-center">Issued By: DOC-Q</div>
        <div className="text-gray-800 text-lg font-semibold text-center mb-4">The Issue Year is 2024</div>

        <p className="text-gray-600 text-sm text-center">
          This credential has been successfully verified, confirming its authenticity and your
          achievements. Thank you for using the DOC-Q Intern Portal.
        </p>
      </div>
    </div>
  );
};

export default CertificateValidationMessage;

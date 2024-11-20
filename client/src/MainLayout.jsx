import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Validate from "./components/Validate";
import ContactUs from "./components/ContactUs";
import Documents from "./components/Documents";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Performance from "./components/Performance";
import PerformanceLoginMessage from "./components/PerformanceLoginMessage";
import Login from "./components/Internlogin";
import Certificate from "./components/Certificate";
import OfferLetterAppDeveloper from "./components/OfferLetterAppDeveloper";
import OfferLetterPythonDeveloper from "./components/OfferLetterPythonDeveloper";
import OfferLetterWebDeveloper from "./components/OfferLetterWebDeveloper";
import LOR from "./components/LOR";
import AppreciationCertificate from "./components/AppreciationCertificate";

const MainLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="bg-[#f7fbff]">
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/intern-performance" element={<Performance />} />
        <Route path="/Validate-Certificate" element={<Validate />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/Contact-us" element={<ContactUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/view-Certificate" element={<Certificate />} />
        <Route path="/Letter-Of-Recommendation" element={<LOR />} />
        <Route path="/view-OfferLetter" element={<OfferLetterAppDeveloper />} />
        <Route path="/view-OfferLetter-Python-Developer" element={<OfferLetterPythonDeveloper />} />
        <Route path="/view-OfferLetter-Web-Developer" element={<OfferLetterWebDeveloper />} />
        <Route path="/not-login" element={<PerformanceLoginMessage />} />
        <Route path="/Appreciation-certificate" element={<AppreciationCertificate />} />
      </Routes>

      {!isLoginPage && <Footer />}
    </div>
  );
};

export default MainLayout;

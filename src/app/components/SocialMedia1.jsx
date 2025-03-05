import React from "react";
import "../[locale]/styles/SocialMedia1.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const SocialMedia1 = () => {
  return (
    <div className="social">
      <div className="social-icons-wrapper">
        <button className="social-icons-btn">
          <FaFacebookF className="social-icon" />
        </button>
        <button className="social-icons-btn">
          <FaInstagram className="social-icon" />
        </button>
        <button className="social-icons-btn">
          <FaTiktok className="social-icon" />
        </button>
        <button className="social-icons-btn">
          <FaLinkedin className="social-icon" />
        </button>
        <button className="social-icons-btn">
          <FaYoutube className="social-icon" />
        </button>
      </div>
    </div>
  );
};

export default SocialMedia1;

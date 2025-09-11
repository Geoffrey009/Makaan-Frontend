import React from "react";
import makaanLogo from "../assets/makaanIcon.png";
import "./preLoader.css";

export const Preloader = () => {
  return (
    <div className="preloader">
      {/* Replace the center circle with the logo image */}
      <img src={makaanLogo} alt="Makaan Logo" className="center-logo" />
      
      <div className="dots">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="dot" style={{ "--i": i }}></div>
        ))}
      </div>
    </div>
  );
};

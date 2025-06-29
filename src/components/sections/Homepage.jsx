import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/simulations");
  };

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Video at top layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-10"
        style={{
    filter: 'contrast(4.1) brightness(3.1) saturate(3.0) hue-rotate(80deg)',
    mixBlendMode: 'screen',
    opacity: 0.9,
  }}
      >
        <source src="/ISRMStartSite.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text layer above video */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 backdrop-blur-sm">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          ISRM: Interactionist Self-Regulation Model
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md">
          A coherence-driven theory of adaptation from atoms to AI
        </p>

        <button
          onClick={handleEnter}
          className="px-8 py-3 text-lg font-semibold bg-white text-black rounded-full hover:bg-gray-200 transition shadow-lg"
        >
          Enter Site
        </button>
      </div>
    </div>
  );
};

export default Homepage;


import React from "react";

function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans text-slate-100">
      
<video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-[-120px] left-0 w-full h-[140%] object-cover opacity-20 pointer-events-none z-0"
      >
        <source src="/Neural_Network_Integration_Animation.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 px-6 py-12">
        <h1 className="text-white text-3xl">ISRM Framework</h1>
      </div>
    </div>
  );
}

export default Home;

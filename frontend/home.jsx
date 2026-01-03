import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Shield, Users, AlertTriangle, Heart, Battery, Signal, Wifi } from 'lucide-react';

const App = () => {
  const [tapCount, setTapCount] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const resetTimerRef = useRef(null);

  // --- 3-Tap Logic ---
  const handleTap = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 3) {
      triggerEmergency();
      setTapCount(0); 
      return;
    }

    resetTimerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 800);
  };

  const triggerEmergency = () => {
    setSosActive(true);
    setTimeout(() => {
      alert("EMERGENCY TRIGGERED: Calling 100...");
      setSosActive(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const features = [
    { 
      title: "Emergency Contacts", 
      icon: <Phone className="w-6 h-6 text-emerald-700" />, 
      bg: "bg-emerald-50",
      desc: "Trusted circle"
    },
    { 
      title: "Location Tracker", 
      icon: <MapPin className="w-6 h-6 text-indigo-600" />, 
      bg: "bg-indigo-50",
      desc: "Share live GPS"
    },
    { 
      title: "Safety Tips", 
      icon: <Shield className="w-6 h-6 text-teal-700" />, 
      bg: "bg-teal-50",
      desc: "Guides & Laws"
    },
    { 
      title: "Community", 
      icon: <Users className="w-6 h-6 text-stone-600" />, 
      bg: "bg-stone-100",
      desc: "Forums & Support"
    },
  ];

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
          .font-libre { font-family: 'Libre Baskerville', serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.4; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .animate-ripple {
            animation: ripple 2s infinite;
          }
        `}
      </style>

      {/* Mobile Device Container */}
      <div className="w-full max-w-sm bg-[#FCFAF7] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-stone-800 relative h-[800px] flex flex-col font-libre">
        
        {/* Status Bar Mockup */}
        <div className="bg-stone-800 text-stone-100 px-6 py-3 flex justify-between items-center text-xs font-sans shrink-0">
          <span className="font-medium">9:41</span>
          <div className="flex gap-2 text-stone-400">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        {/* Simplified App Header (No Hamburger/Bell) */}
        <header className="px-6 pt-8 pb-4 flex flex-col items-center shrink-0">
          <h1 className="text-3xl font-black tracking-tighter text-stone-800">
            STREE
          </h1>
          <p className="text-[0.7rem] text-emerald-700 font-bold tracking-[0.3em] uppercase mt-1">
            Her For Hers
          </p>
        </header>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col">
          
          {/* Welcome Message */}
          <div className="px-6 mb-2 mt-2 shrink-0 text-center">
            <h2 className="text-stone-500 text-sm font-medium italic">Welcome, Priya</h2>
            <p className="text-[10px] text-stone-400 font-sans uppercase tracking-widest mt-1">Stand strong, stay safe</p>
          </div>

          {/* SOS Section - Re-centered and Enhanced */}
          <div className="flex-grow flex flex-col items-center justify-center relative min-h-[350px] shrink-0">
            
            {/* Visual Feedback Background */}
            <div className={`absolute inset-0 transition-colors duration-700 ${tapCount > 0 ? 'bg-emerald-500/10' : 'bg-transparent'}`}></div>

            <div className="relative z-20">
              {/* Static Therapeutic Ripples */}
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ripple"></div>
              <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ripple" style={{animationDelay: '1s'}}></div>

              {/* The Button */}
              <button
                onClick={handleTap}
                className={`
                  relative w-56 h-56 rounded-full flex flex-col items-center justify-center 
                  shadow-[0_20px_50px_rgba(6,78,59,0.2)] transition-all duration-300
                  ${tapCount > 0 
                    ? 'bg-gradient-to-br from-emerald-800 to-emerald-950 scale-90 border-4 border-emerald-300 shadow-inner' 
                    : 'bg-gradient-to-br from-emerald-700 to-emerald-800 hover:scale-105 border-4 border-emerald-100'
                  }
                  ${sosActive ? 'bg-emerald-950 scale-75' : ''}
                `}
              >
                <div className="bg-white/10 p-5 rounded-full mb-2 backdrop-blur-md">
                  <AlertTriangle className="w-12 h-12 text-emerald-50 fill-current opacity-90" />
                </div>
                <span className="text-5xl font-black text-white tracking-widest drop-shadow-lg">SOS</span>
                <div className="mt-2 flex gap-1.5">
                  {[1, 2, 3].map((dot) => (
                    <div 
                      key={dot} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${tapCount >= dot ? 'bg-white w-4' : 'bg-white/30 w-1.5'}`}
                    />
                  ))}
                </div>
              </button>
            </div>
            
            <div className="mt-10 text-center px-8">
              <p className={`text-xs font-bold font-sans transition-all duration-300 tracking-wide uppercase ${tapCount > 0 ? 'text-emerald-700' : 'text-stone-400'}`}>
                {tapCount === 0 
                  ? "Tap 3 times in danger" 
                  : `Quickly! ${3 - tapCount} more taps`
                }
              </p>
              <p className="mt-2 text-[10px] text-stone-400 italic font-sans">
                This will alert authorities and your trusted circle.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <section className="bg-white rounded-t-[3rem] shadow-[0_-15px_50px_rgba(28,25,23,0.06)] p-8 mt-auto shrink-0 border-t border-stone-100">
            <div className="w-12 h-1.5 bg-stone-100 rounded-full mx-auto mb-8"></div>
            
            <div className="grid grid-cols-2 gap-5">
              {features.map((item, index) => (
                <div 
                  key={index}
                  className={`${item.bg} p-5 rounded-[2rem] flex flex-col justify-between h-32 active:scale-95 transition-all duration-200 cursor-pointer group hover:shadow-lg border border-transparent hover:border-emerald-100`}
                >
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-stone-800 font-bold text-[13px] leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-medium font-sans uppercase tracking-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Navigation Bar */}
        <footer className="bg-white px-10 py-5 flex justify-between items-center border-t border-stone-50 shrink-0">
          <div className="flex flex-col items-center text-emerald-700">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col items-center text-stone-300">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center text-stone-300">
            <Shield className="w-6 h-6" />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;

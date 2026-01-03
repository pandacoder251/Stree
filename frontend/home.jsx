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

    // Reset count if no subsequent tap within 1.2s (slightly longer for stress response)
    resetTimerRef.current = setTimeout(() => {
      setTapCount(0);
    }, 1200);
  };

  const triggerEmergency = () => {
    setSosActive(true);
    
    // Simulating the direct call to Police (100)
    setTimeout(() => {
      // Direct call logic
      window.location.href = "tel:100";
      
      // Visual confirmation
      alert("EMERGENCY: Contacting Police (100) and broadcasting your location...");
      setSosActive(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const features = [
    { 
      title: "Emergency Contacts", 
      icon: <Phone className="w-6 h-6 text-purple-700" />, 
      bg: "bg-purple-50",
      desc: "Trusted circle"
    },
    { 
      title: "Location Tracker", 
      icon: <MapPin className="w-6 h-6 text-fuchsia-700" />, 
      bg: "bg-fuchsia-50",
      desc: "Share live GPS"
    },
    { 
      title: "Safety Tips", 
      icon: <Shield className="w-6 h-6 text-violet-700" />, 
      bg: "bg-violet-50",
      desc: "Guides & Laws"
    },
    { 
      title: "Community", 
      icon: <Users className="w-6 h-6 text-slate-600" />, 
      bg: "bg-slate-100",
      desc: "Forums & Support"
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
          .font-libre { font-family: 'Libre Baskerville', serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          @keyframes sos-pulse {
            0% { background-color: #ef4444; transform: scale(0.9); }
            50% { background-color: #b91c1c; transform: scale(0.95); }
            100% { background-color: #ef4444; transform: scale(0.9); }
          }
          .animate-ripple {
            animation: ripple 2.5s infinite ease-out;
          }
          .animate-sos-active {
            animation: sos-pulse 0.5s infinite ease-in-out;
          }
        `}
      </style>

      {/* Mobile Device Container */}
      <div className="w-full max-w-sm bg-[#F9F7FF] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-900 relative h-[800px] flex flex-col font-libre">
        
        {/* Status Bar Mockup */}
        <div className="bg-slate-900 text-purple-100 px-6 py-3 flex justify-between items-center text-xs font-sans shrink-0">
          <span className="font-medium">9:41</span>
          <div className="flex gap-2 text-slate-400">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        {/* Header */}
        <header className="px-6 pt-8 pb-4 flex flex-col items-center shrink-0">
          <h1 className="text-3xl font-black tracking-tighter text-purple-900">
            STREE
          </h1>
          <p className="text-[0.7rem] text-purple-600 font-bold tracking-[0.3em] uppercase mt-1">
            Her For Hers
          </p>
        </header>

        {/* Main Content */}
        <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col">
          
          <div className="px-6 mb-2 mt-2 shrink-0 text-center">
            <h2 className="text-purple-400 text-sm font-medium italic">Welcome back, Priya</h2>
            <p className="text-[10px] text-purple-300 font-sans uppercase tracking-widest mt-1">Peace in every step</p>
          </div>

          {/* SOS Section */}
          <div className="flex-grow flex flex-col items-center justify-center relative min-h-[350px] shrink-0">
            
            {/* Visual Feedback Background - Turns Red on Tap/Active */}
            <div className={`absolute inset-0 transition-colors duration-500 ${sosActive ? 'bg-red-500/20' : tapCount > 0 ? 'bg-purple-500/10' : 'bg-transparent'}`}></div>

            <div className="relative z-20">
              {/* Dynamic Ripples */}
              <div className={`absolute inset-0 rounded-full animate-ripple ${sosActive ? 'bg-red-200' : 'bg-purple-100'}`}></div>
              <div className={`absolute inset-0 rounded-full animate-ripple ${sosActive ? 'bg-red-300' : 'bg-purple-200'}`} style={{animationDelay: '1.2s'}}></div>

              {/* The SOS Button */}
              <button
                onClick={handleTap}
                className={`
                  relative w-56 h-56 rounded-full flex flex-col items-center justify-center 
                  shadow-[0_20px_50px_rgba(88,28,135,0.25)] transition-all duration-300
                  ${sosActive 
                    ? 'animate-sos-active border-4 border-red-200 shadow-[0_0_60px_rgba(239,68,68,0.6)]' 
                    : tapCount > 0 
                      ? 'bg-gradient-to-br from-purple-800 to-purple-950 scale-95 border-4 border-purple-300' 
                      : 'bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 border-4 border-purple-100'
                  }
                `}
              >
                <div className={`p-5 rounded-full mb-2 backdrop-blur-md transition-colors duration-300 ${sosActive ? 'bg-white/20' : 'bg-white/10'}`}>
                  <AlertTriangle className={`w-12 h-12 fill-current opacity-90 transition-colors duration-300 ${sosActive ? 'text-white' : 'text-purple-50'}`} />
                </div>
                <span className="text-5xl font-black text-white tracking-widest drop-shadow-lg">SOS</span>
                
                <div className="mt-2 flex gap-1.5">
                  {[1, 2, 3].map((dot) => (
                    <div 
                      key={dot} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${sosActive ? 'bg-white w-4' : tapCount >= dot ? 'bg-white w-4' : 'bg-white/30 w-1.5'}`}
                    />
                  ))}
                </div>
              </button>
            </div>
            
            <div className="mt-10 text-center px-8">
              <p className={`text-xs font-bold font-sans transition-all duration-300 tracking-wide uppercase ${sosActive ? 'text-red-600 animate-pulse' : tapCount > 0 ? 'text-purple-700' : 'text-purple-400'}`}>
                {sosActive 
                  ? "CALLING POLICE NOW..." 
                  : tapCount === 0 
                    ? "Tap 3 times for help" 
                    : `Hurry! ${3 - tapCount} more taps`
                }
              </p>
              <p className="mt-2 text-[10px] text-purple-300 italic font-sans leading-relaxed">
                {sosActive 
                  ? "Stay on the line. Help is on the way." 
                  : "Your location will be sent to the nearest station."
                }
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <section className="bg-white rounded-t-[3rem] shadow-[0_-15px_50px_rgba(88,28,135,0.06)] p-8 mt-auto shrink-0 border-t border-purple-50">
            <div className="w-12 h-1.5 bg-purple-50 rounded-full mx-auto mb-8"></div>
            
            <div className="grid grid-cols-2 gap-5">
              {features.map((item, index) => (
                <div 
                  key={index}
                  className={`${item.bg} p-5 rounded-[2rem] flex flex-col justify-between h-32 active:scale-95 transition-all duration-200 cursor-pointer group hover:shadow-lg border border-transparent hover:border-purple-200`}
                >
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-purple-950 font-bold text-[13px] leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-purple-400 font-medium font-sans uppercase tracking-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Nav */}
        <footer className="bg-white px-10 py-5 flex justify-between items-center border-t border-purple-50 shrink-0">
          <div className="flex flex-col items-center text-purple-700">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div className="flex flex-col items-center text-slate-300">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center text-slate-300">
            <Shield className="w-6 h-6" />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
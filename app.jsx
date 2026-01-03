import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Shield, 
  Users, 
  AlertTriangle, 
  Home, 
  UserCircle, 
  Battery, 
  Signal, 
  Wifi,
  Moon,
  Sun,
  Plus,
  Trash2,
  X,
  Gavel,
  UserPlus,
  Navigation,
  RefreshCw,
  Copy,
  Search,
  MessageSquare,
  ChevronRight,
  Heart,
  Filter,
  CheckCircle2,
  Send,
  Smartphone
} from 'lucide-react';

const App = () => {
  // Navigation & Theme State
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeCommunityTab, setActiveCommunityTab] = useState('community'); 
  
  // Community Filter & Posting State
  const [forumFilter, setForumFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Postpartum');

  // User Profile & OTP State
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Kapoor',
    phone: '+91 98765 43210',
    verified: true
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [showNotification, setShowNotification] = useState(null);

  // SOS State
  const [tapCount, setTapCount] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const resetTimerRef = useRef(null);

  // Real-time Location State
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [locError, setLocError] = useState(null);

  // Community Content
  const categories = ['All', 'Postpartum', 'Adulting', 'Menopause', 'Teen'];
  const postCategories = ['Postpartum', 'Adulting', 'Menopause', 'Teen'];
  
  const [forumPosts, setForumPosts] = useState([
    { id: 1, tag: 'Postpartum', user: 'Ananya', content: 'Finding it hard to balance sleep and the new baby. Does it get easier?', likes: 24, replies: 12 },
    { id: 2, tag: 'Adulting', user: 'Priya', content: 'Moving to a new city alone for work. Any safety tips for finding apartments?', likes: 45, replies: 28 },
    { id: 3, tag: 'Menopause', user: 'Meera', content: 'The hot flashes are intense lately. What worked for you guys?', likes: 19, replies: 8 },
    { id: 4, tag: 'Teen', user: 'Zara', content: 'Supporting my younger sister through a tough phase. Any resources?', likes: 31, replies: 15 },
    { id: 5, tag: 'Postpartum', user: 'Riya', content: 'Post-delivery hair loss is real. Anyone has natural remedy suggestions?', likes: 12, replies: 5 },
    { id: 6, tag: 'Adulting', user: 'Kirti', content: 'How do you manage taxes for the first time? Feel so lost.', likes: 8, replies: 20 },
  ]);

  // Handle OTP Generation
  const handleSendOtp = () => {
    setIsVerifying(true);
    setOtpError(false);
    
    // Simulate network delay
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      setIsVerifying(false);
      
      // Show "System Notification"
      setShowNotification({
        title: "Message from STREE",
        body: `Your verification code is ${code}. Do not share this with anyone.`
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => setShowNotification(null), 6000);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setUserProfile({ ...userProfile, verified: true });
      setOtpSent(false);
      setEnteredOtp('');
      setGeneratedOtp('');
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  const handleAddPost = () => {
    if (!newPostContent.trim()) return;
    const post = {
      id: Date.now(),
      tag: newPostTag,
      user: userProfile.name.split(' ')[0],
      content: newPostContent,
      likes: 0,
      replies: 0
    };
    setForumPosts([post, ...forumPosts]);
    setNewPostContent('');
    setShowPostModal(false);
  };

  const filteredPosts = forumFilter === 'All' 
    ? forumPosts 
    : forumPosts.filter(post => post.tag === forumFilter);

  const therapists = [
    { id: 1, name: 'Dr. Shalini Varma', specialty: 'Postpartum & Anxiety', dist: '1.2 km', rating: 4.9 },
    { id: 2, name: 'Dr. Aruna Singh', specialty: 'Teen Behavioral Therapy', dist: '2.5 km', rating: 4.8 },
    { id: 3, name: 'Counselor Reena', specialty: 'Adulting & Relationships', dist: '3.1 km', rating: 4.7 }
  ];

  // SOS Logic
  const handleSosTap = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 3) {
      setSosActive(true);
      setTimeout(() => {
        setSosActive(false);
        setTapCount(0);
        const locString = location ? `Coordinates: ${location.lat}, ${location.lng}` : "Location pending";
        alert(`EMERGENCY ALERT: Your family has been notified. ${locString}`);
      }, 2000);
      return;
    }
    resetTimerRef.current = setTimeout(() => setTapCount(0), 1200);
  };

  // Real-time Location Logic
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setLocation({
            lat: latitude.toFixed(4),
            lng: longitude.toFixed(4),
            address: data.display_name || "Location found, address unavailable"
          });
          setShowLocationAlert(true);
        } catch (err) {
          setLocation({ lat: latitude.toFixed(4), lng: longitude.toFixed(4), address: "Address lookup failed." });
          setShowLocationAlert(true);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocError("Permission denied.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 flex items-center justify-center p-4 font-sans ${darkMode ? 'bg-slate-950' : 'bg-indigo-50/50'}`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
          .font-outfit { font-family: 'Outfit', sans-serif; }
          .font-libre { font-family: 'Libre Baskerville', serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          @keyframes ripple { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }
          .animate-ripple { animation: ripple 3s infinite ease-out; }
          @keyframes sos-pulse { 0%, 100% { transform: scale(1); background: #9333ea; } 50% { transform: scale(1.05); background: #7e22ce; } }
          .sos-active-anim { animation: sos-pulse 0.4s infinite; background: #dc2626 !important; }
          @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }
        `}
      </style>

      {/* Phone Shell */}
      <div className={`w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-[10px] relative h-[820px] flex flex-col font-outfit transition-all duration-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#FDFBFF] border-slate-900 text-slate-900'}`}>
        
        {/* Mock Notification Overlay */}
        {showNotification && (
          <div className="absolute top-12 left-4 right-4 z-[100] animate-slide-down">
            <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <div className="bg-purple-600 p-2 rounded-xl text-white">
                <Smartphone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-purple-500">{showNotification.title}</p>
                <p className="text-xs font-bold leading-tight mt-0.5">{showNotification.body}</p>
              </div>
              <button onClick={() => setShowNotification(null)} className="text-slate-400"><X size={14}/></button>
            </div>
          </div>
        )}

        {showLocationAlert && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
            <div className={`w-full max-w-[280px] p-6 rounded-[2.5rem] shadow-2xl animate-in zoom-in-90 duration-300 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
              <h4 className="text-center font-bold text-lg mb-2">Real-time Location!</h4>
              <p className="text-center text-[10px] text-slate-400 mb-6 leading-tight">Your live coordinates have been synced.</p>
              <button onClick={() => setShowLocationAlert(false)} className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold active:scale-95 transition-all">Got it</button>
            </div>
          </div>
        )}

        {/* Create Post Modal */}
        {showPostModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md p-6 flex items-end animate-in fade-in duration-300">
            <div className={`w-full rounded-[2.5rem] p-6 pb-10 animate-in slide-in-from-bottom duration-500 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">Share Thoughts</h3>
                <button onClick={() => setShowPostModal(false)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"><X size={20}/></button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                  {postCategories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setNewPostTag(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all ${newPostTag === cat ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <textarea 
                  autoFocus
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className={`w-full h-40 p-4 rounded-2xl outline-none resize-none text-sm font-medium ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}
                />
                <button 
                  onClick={handleAddPost}
                  disabled={!newPostContent.trim()}
                  className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                  Post Anonymously
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className={`px-8 py-4 flex justify-between items-center text-[11px] font-bold shrink-0 ${darkMode ? 'text-purple-300' : 'text-slate-500'}`}>
          <span>9:41</span>
          <div className="flex gap-2.5 items-center">
            <Signal size={14} strokeWidth={3} />
            <Wifi size={14} strokeWidth={3} />
            <Battery size={16} strokeWidth={2.5} className="rotate-90" />
          </div>
        </div>

        {/* Dynamic Header */}
        <header className="px-8 pt-4 pb-2 flex flex-col items-center shrink-0 relative">
          <button onClick={() => setDarkMode(!darkMode)} className={`absolute right-8 top-4 p-2.5 rounded-2xl transition-all active:scale-90 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-purple-100 text-purple-900'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <h1 className="text-4xl font-black tracking-tighter font-libre no-underline">STREE</h1>
          <div className={`h-1 w-8 rounded-full mt-1 ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col relative">
          
          {currentPage === 'home' && (
            <div className="flex-grow flex flex-col animate-in fade-in zoom-in-95 duration-500">
              <div className="px-8 mt-6 text-center">
                <h3 className="text-xl font-bold tracking-tight">Welcome, {userProfile.name.split(' ')[0]}</h3>
                <p className={`text-sm font-medium mt-1 opacity-60 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  You are in a safe space
                </p>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center relative">
                <div className={`absolute w-72 h-72 rounded-full transition-all duration-700 ${sosActive ? 'bg-red-500/20 scale-150' : 'bg-purple-500/5'}`}></div>
                <div className="relative">
                  {!sosActive && <div className="absolute inset-0 rounded-full animate-ripple bg-purple-500/20"></div>}
                  <button
                    onClick={handleSosTap}
                    className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 z-10 border-8 border-white/10 ${sosActive ? 'sos-active-anim' : 'bg-gradient-to-br from-purple-600 to-indigo-700 active:scale-90 hover:shadow-purple-500/40'}`}
                  >
                    <AlertTriangle className={`w-12 h-12 text-white mb-2 ${sosActive ? 'animate-bounce' : ''}`} />
                    <span className="text-5xl font-black text-white tracking-tighter">SOS</span>
                    <div className="mt-4 flex gap-2">
                      {[1, 2, 3].map(i => <div key={i} className={`h-2 rounded-full transition-all duration-300 ${tapCount >= i ? 'bg-white w-6' : 'bg-white/30 w-2'}`} />)}
                    </div>
                  </button>
                </div>
                <p className={`mt-10 text-[10px] uppercase font-bold tracking-[0.3em] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Triple Tap for Emergency</p>
              </div>

              <div className={`rounded-t-[3rem] p-8 space-y-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setCurrentPage('community')} className={`p-5 rounded-3xl flex flex-col gap-3 transition-all active:scale-95 ${darkMode ? 'bg-slate-900' : 'bg-purple-50'}`}>
                    <Users size={24} className="text-purple-500" />
                    <span className="text-xs font-bold text-left">Community</span>
                  </button>
                  <button onClick={() => setCurrentPage('location')} className={`p-5 rounded-3xl flex flex-col gap-3 transition-all active:scale-95 ${darkMode ? 'bg-slate-900' : 'bg-indigo-50'}`}>
                    <MapPin size={24} className="text-indigo-500" />
                    <span className="text-xs font-bold text-left">Location</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'community' && (
            <div className="animate-in slide-in-from-right duration-500 flex flex-col h-full relative">
              <div className="p-8 pb-0">
                <h2 className="text-2xl font-black tracking-tight mb-6">Safe Spaces</h2>
                
                <div className={`p-1.5 rounded-2xl flex gap-1 mb-6 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <button onClick={() => setActiveCommunityTab('therapy')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeCommunityTab === 'therapy' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}>Therapy</button>
                  <button onClick={() => setActiveCommunityTab('community')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeCommunityTab === 'community' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}>Forum</button>
                </div>
              </div>

              <div className="px-8 pb-24 overflow-y-auto hide-scrollbar">
                {activeCommunityTab === 'therapy' ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" placeholder="Search nearby therapists..." className={`w-full pl-12 pr-4 py-4 rounded-2xl outline-none border-2 transition-all ${darkMode ? 'bg-slate-800 border-transparent focus:border-purple-500' : 'bg-slate-50 border-transparent focus:border-purple-200'}`} />
                    </div>
                    <div className="space-y-4">
                      {therapists.map(t => (
                        <div key={t.id} className={`p-4 rounded-3xl flex items-center justify-between ${darkMode ? 'bg-slate-800/40' : 'bg-white border border-slate-100 shadow-sm'}`}>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">{t.name.split(' ')[1][0]}</div>
                            <div>
                              <h4 className="font-bold text-sm">{t.name}</h4>
                              <p className="text-[10px] text-slate-400 font-medium">{t.specialty}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-purple-600">{t.dist}</p>
                            <div className="flex items-center gap-1 text-orange-400">
                              <Heart size={10} fill="currentColor" />
                              <span className="text-[10px] font-bold">{t.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
                      {categories.map(f => (
                        <button key={f} onClick={() => setForumFilter(f)} className={`px-5 py-2.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${forumFilter === f ? 'bg-purple-600 text-white shadow-lg' : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500')}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {filteredPosts.map(p => (
                        <div key={p.id} className={`p-5 rounded-[2rem] space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${darkMode ? 'bg-slate-800/40' : 'bg-white border border-slate-100 shadow-sm'}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{p.tag}</span>
                            <span className="text-[10px] text-slate-400">@{p.user}</span>
                          </div>
                          <p className="text-sm leading-relaxed font-medium">{p.content}</p>
                          <div className="flex gap-4 pt-2 border-t dark:border-slate-700/50">
                            <div className="flex items-center gap-1.5 text-slate-400"><Heart size={14} /><span className="text-xs font-bold">{p.likes}</span></div>
                            <div className="flex items-center gap-1.5 text-slate-400"><MessageSquare size={14} /><span className="text-xs font-bold">{p.replies}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {activeCommunityTab === 'community' && (
                <button onClick={() => setShowPostModal(true)} className="absolute bottom-28 right-8 w-16 h-16 bg-purple-600 text-white rounded-2xl shadow-2xl flex items-center justify-center z-20"><Plus size={32} /></button>
              )}
            </div>
          )}

          {currentPage === 'location' && (
            <div className="p-8 pb-24 space-y-8 animate-in slide-in-from-right duration-500">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Tracker</h2>
                <p className="text-xs text-slate-400">Real-time GPS Monitoring</p>
              </div>
              <div className={`p-8 rounded-[2.5rem] text-center border-2 transition-all duration-500 ${location ? 'bg-purple-600 border-purple-500 text-white shadow-2xl' : (darkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-purple-100')}`}>
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${location ? 'bg-white text-purple-600' : 'bg-slate-100'}`}>
                  {isLocating ? <RefreshCw size={48} className="animate-spin" /> : (location ? <Navigation size={48} /> : <MapPin size={48} />)}
                </div>
                <h3 className="text-xl font-black mb-2">{location ? 'Live Found' : 'Inactive'}</h3>
                {locError && <p className="text-[10px] text-red-500 mb-4 font-bold">{locError}</p>}
                <p className="text-[11px] mb-8 px-4 font-medium opacity-80">{location ? location.address : 'Allow location access to sync position.'}</p>
                <button onClick={handleGetLocation} className={`flex items-center gap-3 mx-auto px-10 py-4 rounded-2xl font-bold transition-all ${location ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'}`}>
                  <RefreshCw size={18} className={isLocating ? 'animate-spin' : ''} />
                  {isLocating ? 'Fetching GPS...' : 'Update Real-time'}
                </button>
              </div>
            </div>
          )}

          {currentPage === 'account' && (
            <div className="p-8 pb-24 space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-4xl font-black">
                  {userProfile.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-black tracking-tight">{userProfile.name}</h2>
                <p className="text-xs text-slate-400">{userProfile.phone}</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-2">Display Name</label>
                  <input type="text" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name: e.target.value, verified: false})} className={`w-full p-5 rounded-2xl outline-none border-2 transition-all ${darkMode ? 'bg-slate-800 border-transparent text-white' : 'bg-slate-50 border-transparent'}`} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-2">Phone Number</label>
                  <div className="relative">
                    <input type="tel" value={userProfile.phone} onChange={e => setUserProfile({...userProfile, phone: e.target.value, verified: false})} className={`w-full p-5 rounded-2xl outline-none border-2 transition-all ${darkMode ? 'bg-slate-800 border-transparent' : 'bg-slate-50 border-transparent'}`} />
                    {userProfile.verified && <CheckCircle2 className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
                  </div>
                </div>

                {!userProfile.verified && (
                  <div className="space-y-4 pt-2">
                    {!otpSent ? (
                      <button onClick={handleSendOtp} disabled={isVerifying} className="w-full bg-purple-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2">
                        {isVerifying ? <RefreshCw className="animate-spin" size={20} /> : "Send Verification OTP"}
                      </button>
                    ) : (
                      <div className="space-y-4 animate-in slide-in-from-top">
                        <div className="relative">
                          <input 
                            type="text" 
                            maxLength={4}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            placeholder="0 0 0 0" 
                            className={`w-full p-5 rounded-2xl outline-none border-2 text-center text-xl tracking-[1em] transition-all ${otpError ? 'border-red-500 bg-red-50' : (darkMode ? 'bg-slate-800 border-purple-500' : 'bg-purple-50 border-purple-200')}`} 
                          />
                          {otpError && <p className="text-center text-[10px] font-bold text-red-500 mt-2">Incorrect OTP. Try again.</p>}
                        </div>
                        <button onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold">Verify & Save</button>
                        <button onClick={() => setOtpSent(false)} className="w-full text-slate-400 text-xs font-bold">Resend Code</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Global Navigation */}
        <footer className={`px-6 py-6 flex justify-between items-center border-t shrink-0 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <button onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1.5 transition-all ${currentPage === 'home' ? 'text-purple-600 scale-110' : 'text-slate-400'}`}>
            <Home size={22} strokeWidth={currentPage === 'home' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => setCurrentPage('location')} className={`flex flex-col items-center gap-1.5 transition-all ${currentPage === 'location' ? 'text-purple-600 scale-110' : 'text-slate-400'}`}>
            <MapPin size={22} strokeWidth={currentPage === 'location' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Tracker</span>
          </button>
          <button onClick={() => setCurrentPage('community')} className={`flex flex-col items-center gap-1.5 transition-all ${currentPage === 'community' ? 'text-purple-600 scale-110' : 'text-slate-400'}`}>
            <MessageSquare size={22} strokeWidth={currentPage === 'community' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Space</span>
          </button>
          <button onClick={() => setCurrentPage('account')} className={`flex flex-col items-center gap-1.5 transition-all ${currentPage === 'account' ? 'text-purple-600 scale-110' : 'text-slate-400'}`}>
            <UserCircle size={22} strokeWidth={currentPage === 'account' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Account</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
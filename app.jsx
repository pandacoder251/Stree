import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Shield, 
  Users, 
  AlertTriangle, 
  Home, 
  UserCircle, 
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
  Smartphone,
  Radio,
  Mic,
  Share2
} from 'lucide-react';

const App = () => {
  // Navigation & Theme State
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeCommunityTab, setActiveCommunityTab] = useState('community'); 
  
  // SOS & Dispatch State
  const [dispatchStatus, setDispatchStatus] = useState('initiating'); // initiating, transmitting, connected
  const [cancelCountdown, setCancelCountdown] = useState(5);
  const countdownIntervalRef = useRef(null);

  // Community Filter & Posting State
  const [forumFilter, setForumFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Postpartum');

  // User Profile & OTP State
  const [userProfile, setUserProfile] = useState({
    name: '',
    phone: '',
    verified: false
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [showNotification, setShowNotification] = useState(null);

  // Indian Phone Validation (10 digits starting with 6-9)
  const isValidIndianNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    // If it includes 91, check the last 10
    const target = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;
    return /^[6-9]\d{9}$/.test(target);
  };

  const isProfileComplete = userProfile.name.trim().length > 0 && isValidIndianNumber(userProfile.phone);

  // SOS Logic State
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
    { id: 1, tag: 'Postpartum', user: 'Ananya', content: 'Finding it hard to balance sleep and the new baby. Does it get easier?', likes: 24, replies: 12, likedByUser: false },
    { id: 2, tag: 'Adulting', user: 'Priya', content: 'Moving to a new city alone for work. Any safety tips for finding apartments?', likes: 45, replies: 28, likedByUser: false },
    { id: 3, tag: 'Menopause', user: 'Meera', content: 'The hot flashes are intense lately. What worked for you guys?', likes: 19, replies: 8, likedByUser: false },
    { id: 4, tag: 'Teen', user: 'Zara', content: 'Supporting my younger sister through a tough phase. Any resources?', likes: 31, replies: 15, likedByUser: false },
    { id: 5, tag: 'Postpartum', user: 'Riya', content: 'Post-delivery hair loss is real. Anyone has natural remedy suggestions?', likes: 12, replies: 5, likedByUser: false },
    { id: 6, tag: 'Adulting', user: 'Kirti', content: 'How do you manage taxes for the first time? Feel so lost.', likes: 8, replies: 20, likedByUser: false },
  ]);

  // Effect to handle SOS simulation phases and Countdown
  useEffect(() => {
    if (sosActive) {
      setDispatchStatus('initiating');
      setCancelCountdown(5);
      
      const t1 = setTimeout(() => setDispatchStatus('transmitting'), 1500);
      const t2 = setTimeout(() => setDispatchStatus('connected'), 3500);
      
      countdownIntervalRef.current = setInterval(() => {
        setCancelCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => { 
        clearTimeout(t1); 
        clearTimeout(t2); 
        clearInterval(countdownIntervalRef.current);
      };
    } else {
      clearInterval(countdownIntervalRef.current);
    }
  }, [sosActive]);

  const toggleLike = (postId) => {
    setForumPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedByUser;
        return {
          ...post,
          likedByUser: !isLiked,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSendOtp = () => {
    if (!isProfileComplete) return;
    setIsVerifying(true);
    setOtpError(false);
    
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpSent(true);
      setIsVerifying(false);
      
      setShowNotification({
        title: "Message from STREE",
        body: `Your verification code is ${code}. Do not share this with anyone.`
      });
      
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
      user: userProfile.name.trim() ? userProfile.name.split(' ')[0] : 'Anonymous',
      content: newPostContent,
      likes: 0,
      replies: 0,
      likedByUser: false
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

  const handleSosTap = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 3) {
      setSosActive(true);
      setTapCount(0);
      return;
    }
    resetTimerRef.current = setTimeout(() => setTapCount(0), 1200);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported.");
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
            address: data.display_name || "Location found"
          });
          setShowLocationAlert(true);
        } catch (err) {
          setLocation({ lat: latitude.toFixed(4), lng: longitude.toFixed(4), address: "Lookup failed." });
          setShowLocationAlert(true);
        } finally {
          setIsLocating(false);
        }
      },
      () => { setIsLocating(false); setLocError("Denied."); },
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
          @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }
          .dot-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .7; transform: scale(1.2); } }
          .wave-bar {
            width: 3px;
            height: 100%;
            background-color: white;
            border-radius: 99px;
            animation: wave 1s ease-in-out infinite;
          }
          @keyframes wave {
            0%, 100% { height: 20%; }
            50% { height: 100%; }
          }
        `}
      </style>

      {/* Phone Shell */}
      <div className={`w-full max-w-sm rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-[10px] relative h-[800px] flex flex-col font-outfit transition-all duration-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#FDFBFF] border-slate-900 text-slate-900'}`}>
        
        {/* SOS Alert Fullscreen Interface */}
        {sosActive && (
          <div className="absolute inset-0 z-[250] bg-red-600 flex flex-col p-8 text-white animate-in fade-in zoom-in duration-300">
            <div className="pt-12 flex flex-col items-center text-center flex-grow">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <AlertTriangle size={48} className="text-white" />
              </div>
              
              <h2 className="text-4xl font-black mb-2 tracking-tight font-libre">SOS ACTIVE</h2>
              <div className="bg-black/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-8 uppercase">
                {dispatchStatus === 'initiating' && "Establishing Link..."}
                {dispatchStatus === 'transmitting' && "Transmitting Location..."}
                {dispatchStatus === 'connected' && "Response Team Connected"}
              </div>

              <div className="w-full space-y-4 text-left">
                <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10">
                   <div className="p-2 bg-white/20 rounded-xl"><MapPin size={20}/></div>
                   <div>
                      <p className="text-[10px] uppercase font-bold opacity-60">Current Lat/Long</p>
                      <p className="text-sm font-mono">{location ? `${location.lat}° N, ${location.lng}° E` : '25.5941° N, 85.1376° E'}</p>
                   </div>
                </div>

                <div className={`p-4 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10 transition-all ${dispatchStatus === 'connected' ? 'bg-green-500/20' : 'bg-white/10'}`}>
                   <div className="p-2 bg-white/20 rounded-xl"><Radio size={20}/></div>
                   <div className="flex-grow">
                      <p className="text-[10px] uppercase font-bold opacity-60">112 Dispatch</p>
                      <p className="text-sm font-bold">{dispatchStatus === 'connected' ? 'Unit #882 En Route' : 'Searching for nearest tower...'}</p>
                   </div>
                   {dispatchStatus === 'connected' && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></div>}
                </div>
              </div>

              {dispatchStatus === 'connected' && (
                <div className="mt-12 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-8">
                   <div className="flex items-end gap-1 h-8">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                   </div>
                   <div className="flex items-center gap-2 text-sm font-bold">
                      <Mic size={16} /> Recording Audio & Visuals
                   </div>
                </div>
              )}
            </div>

            <div className="mb-8 space-y-4">
              <button 
                onClick={() => setSosActive(false)} 
                className="w-full py-5 bg-white text-red-600 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <span>Cancel Emergency</span>
                {cancelCountdown > 0 && (
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[10px]">
                    {cancelCountdown}
                  </span>
                )}
              </button>
              
              {cancelCountdown === 0 && (
                <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-60 animate-pulse">
                  Emergency protocols fully engaged
                </p>
              )}
            </div>
          </div>
        )}

        {/* Notification Overlay */}
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

        {/* Dynamic Header */}
        <header className="px-8 pt-8 pb-4 flex flex-col items-center shrink-0 relative">
          <button onClick={() => setDarkMode(!darkMode)} className={`absolute right-8 top-8 p-2.5 rounded-2xl transition-all active:scale-90 ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-purple-100 text-purple-900'}`}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <h1 className="text-4xl font-black tracking-tighter font-libre">STREE</h1>
           <p className={`text-sm font-medium font-libre mt-1 opacity-60 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  Hers For Her
                </p>
         </header>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col relative">
          
          {currentPage === 'home' && (
            <div className="flex-grow flex flex-col animate-in fade-in zoom-in-95 duration-500">
              <div className="px-8 mt-6 text-center">
                <h3 className="text-xl font-bold tracking-tight font-libre">
                  Welcome{userProfile.name.trim() ? `, ${userProfile.name.split(' ')[0]}` : ''}
                </h3>
                <p className={`text-sm font-medium mt-1 font-libre opacity-60 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                  You are in a safe space
                </p>
              </div>

              <div className="flex-grow flex flex-col items-center justify-center relative">
                <div className={`absolute w-72 h-72 rounded-full transition-all duration-700 ${sosActive ? 'bg-red-500/20 scale-150' : 'bg-purple-500/5'}`}></div>
                <div className="relative">
                  {!sosActive && <div className="absolute inset-0 rounded-full animate-ripple bg-purple-500/20"></div>}
                  <button
                    onClick={handleSosTap}
                    className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 z-10 border-8 border-white/10 ${sosActive ? 'bg-red-600' : 'bg-gradient-to-br from-purple-600 to-indigo-700 active:scale-90 hover:shadow-purple-500/40'}`}
                  >
                    <AlertTriangle className={`w-12 h-12 text-white mb-2 ${sosActive ? 'animate-bounce' : ''}`} />
                    <span className="text-5xl font-black text-white tracking-tighter font-libre ">SOS</span>
                    <div className="mt-4 flex gap-2">
                      {[1, 2, 3].map(i => <div key={i} className={`h-2 rounded-full transition-all duration-300 ${tapCount >= i ? 'bg-white w-6' : 'bg-white/30 w-2'}`} />)}
                    </div>
                  </button>
                </div>
                <p className={`mt-10 text-[10px] uppercase font-bold tracking-[0.3em] font-libre ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Triple Tap for Emergency</p>
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
                            <button onClick={() => toggleLike(p.id)} className={`flex items-center gap-1.5 transition-all active:scale-125 ${p.likedByUser ? 'text-rose-500' : 'text-slate-400'}`}>
                              <Heart size={16} fill={p.likedByUser ? "currentColor" : "none"} />
                              <span className="text-xs font-bold">{p.likes}</span>
                            </button>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <MessageSquare size={16} />
                              <span className="text-xs font-bold">{p.replies}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {activeCommunityTab === 'community' && (
                <button onClick={() => setShowPostModal(true)} className="absolute bottom-28 right-8 w-12 h-12 bg-purple-600 text-white rounded-2xl shadow-xl flex items-center justify-center z-20 active:scale-90 transition-all">
                  <Plus size={24} strokeWidth={3} />
                </button>
              )}
            </div>
          )}

          {currentPage === 'location' && (
            <div className="p-8 pb-24 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black tracking-tight">Guardian Track</h2>
                 <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   GPS Live
                 </div>
               </div>

               <div className={`relative h-[380px] rounded-[3rem] overflow-hidden border-4 transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-white shadow-xl'}`}>
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative">
                     <div className="w-24 h-24 bg-purple-500/20 rounded-full animate-ping absolute -inset-8"></div>
                     <div className="relative z-10 w-12 h-12 bg-white rounded-full p-1 shadow-2xl">
                        <div className="w-full h-full bg-purple-600 rounded-full flex items-center justify-center text-white">
                           <Navigation size={20} className={isLocating ? 'animate-spin' : ''} />
                        </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Detail overlay */}
                 <div className="absolute bottom-6 left-6 right-6">
                    <div className={`p-4 rounded-2xl backdrop-blur-md border ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-white'} shadow-lg`}>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Update</p>
                       <p className="text-xs font-bold leading-tight truncate">{location ? location.address : 'Scanning for position...'}</p>
                    </div>
                 </div>
               </div>

               <button 
                onClick={handleGetLocation}
                className="w-full py-5 bg-purple-600 text-white rounded-[2rem] font-bold flex items-center justify-center gap-2 text-sm shadow-xl shadow-purple-600/20 active:scale-95 transition-all"
               >
                 <Share2 size={18} /> {isLocating ? 'Syncing...' : 'Share Live Path'}
               </button>
            </div>
          )}

          {currentPage === 'account' && (
            <div className="p-8 pb-24 space-y-8 animate-in slide-in-from-bottom duration-500">
              <div className="text-center relative">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 rounded-3xl mx-auto mb-4 flex items-center justify-center text-slate-300 text-4xl font-black transition-all">
                  {userProfile.name.trim() ? userProfile.name.charAt(0).toUpperCase() : <UserCircle size={40} />}
                </div>
                
                {/* Status Dot */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full dot-pulse ${isProfileComplete ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-orange-500 shadow-[0_0_8px_#f97316]'}`}></div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isProfileComplete ? 'text-blue-500' : 'text-orange-500'}`}>
                    {userProfile.verified ? 'Verified' : (isProfileComplete ? 'Ready to verify' : 'Invalid Number')}
                  </span>
                </div>

                <h2 className="text-2xl font-black tracking-tight">{userProfile.name || 'Set your name'}</h2>
                <p className="text-xs text-slate-400">{userProfile.phone || 'Phone not linked'}</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-2">Display Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sarah Kapoor"
                    value={userProfile.name} 
                    onChange={e => setUserProfile({...userProfile, name: e.target.value, verified: false})} 
                    className={`w-full p-5 rounded-2xl outline-none border-2 transition-all ${darkMode ? 'bg-slate-800 border-transparent text-white' : 'bg-slate-50 border-transparent'}`} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 ml-2">Phone Number (+91)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</span>
                    <input 
                      type="tel" 
                      placeholder="98765 43210"
                      value={userProfile.phone.startsWith('91') ? userProfile.phone.slice(2) : userProfile.phone} 
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setUserProfile({...userProfile, phone: val ? '91' + val : '', verified: false});
                      }} 
                      className={`w-full p-5 pl-14 rounded-2xl outline-none border-2 transition-all ${darkMode ? 'bg-slate-800 border-transparent' : 'bg-slate-50 border-transparent'}`} 
                    />
                    {userProfile.verified && <CheckCircle2 className="absolute right-5 top-1/2 -translate-y-1/2 text-green-500" size={20} />}
                  </div>
                  {userProfile.phone && !isValidIndianNumber(userProfile.phone) && (
                    <p className="text-[10px] font-bold text-orange-500 ml-2">Must be 10 digits starting with 6-9</p>
                  )}
                </div>

                {/* Verification Flow */}
                {isProfileComplete && !userProfile.verified && (
                  <div className="space-y-4 pt-2">
                    {!otpSent ? (
                      <button onClick={handleSendOtp} disabled={isVerifying} className="w-full bg-purple-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                        {isVerifying ? <RefreshCw className="animate-spin" size={20} /> : "Verify Profile"}
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
                            className={`w-full p-5 rounded-2xl outline-none border-2 text-center text-xl tracking-[1em] transition-all ${otpError ? 'border-red-500 bg-red-50' : (darkMode ? 'bg-slate-800 border-purple-500' : 'bg-purple-50 border-purple-200 text-purple-600')}`} 
                          />
                          {otpError && <p className="text-center text-[10px] font-bold text-red-500 mt-2">Incorrect code</p>}
                        </div>
                        <button onClick={handleVerifyOtp} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold active:scale-95">Complete Setup</button>
                        <button onClick={() => setOtpSent(false)} className="w-full text-slate-400 text-xs font-bold">Resend Code</button>
                      </div>
                    )}
                  </div>
                )}
                
                {!isProfileComplete && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-[11px] text-slate-400 text-center leading-relaxed font-medium">
                      Enter a valid 10-digit Indian phone number (starting with 6, 7, 8, or 9) to verify your account.
                    </p>
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
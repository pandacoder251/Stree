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
  UserPlus
} from 'lucide-react';

const App = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  
  // SOS State
  const [tapCount, setTapCount] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const resetTimerRef = useRef(null);

  // Contacts State
  const [familyContacts, setFamilyContacts] = useState([
    { id: '1', name: 'Mom', phone: '+91 9876543210', relationship: 'Mother' }
  ]);
  const [showAddSheet, setShowAddSheet] = useState(false);

  const govContacts = [
    { id: 'g1', name: 'Police', phone: '100', type: 'government' },
    { id: 'g2', name: 'Women Helpline', phone: '1091', type: 'government' },
    { id: 'g3', name: 'Ambulance', phone: '102', type: 'government' }
  ];

  // --- SOS Logic ---
  const handleSosTap = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 3) {
      triggerEmergency();
      setTapCount(0);
      return;
    }
    resetTimerRef.current = setTimeout(() => setTapCount(0), 1200);
  };

  const triggerEmergency = () => {
    setSosActive(true);
    setTimeout(() => {
      window.location.href = "tel:100";
      alert("EMERGENCY: Contacting Police and broadcasting location to family...");
      setSosActive(false);
    }, 400);
  };

  // --- Contact Actions ---
  const addContact = (name, phone, relationship) => {
    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
      relationship
    };
    setFamilyContacts([...familyContacts, newContact]);
    setShowAddSheet(false);
  };

  const deleteContact = (id) => {
    setFamilyContacts(familyContacts.filter(c => c.id !== id));
  };

  // --- Sub-Components ---

  const AddContactSheet = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [rel, setRel] = useState('');

    return (
      <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div className={`w-full p-8 rounded-t-[2.5rem] shadow-2xl animate-in slide-in-from-bottom duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-purple-950'}`}>Add Family Contact</h3>
            <button onClick={() => setShowAddSheet(false)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <X size={20} className={darkMode ? 'text-white' : 'text-slate-600'} />
            </button>
          </div>
          <div className="space-y-4">
            <input 
              type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
              className={`w-full p-4 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:border-purple-400'}`}
            />
            <input 
              type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
              className={`w-full p-4 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:border-purple-400'}`}
            />
            <input 
              type="text" placeholder="Relationship (e.g. Brother)" value={rel} onChange={e => setRel(e.target.value)}
              className={`w-full p-4 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-200 focus:border-purple-400'}`}
            />
            <button 
              onClick={() => name && phone && addContact(name, phone, rel)}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-500/30 active:scale-95 transition-transform"
            >
              Save Contact
            </button>
          </div>
          <div className="h-8"></div>
        </div>
      </div>
    );
  };

  const ContactCard = ({ contact, isGov }) => (
    <div className={`p-4 rounded-3xl mb-3 flex items-center justify-between transition-colors ${darkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-purple-50 shadow-sm'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isGov ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
          {isGov ? <Gavel size={20} /> : <UserCircle size={20} />}
        </div>
        <div>
          <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-purple-950'}`}>{contact.name}</h4>
          <p className="text-xs text-slate-400 font-sans">{contact.phone} {contact.relationship && `• ${contact.relationship}`}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <a href={`tel:${contact.phone}`} className="p-3 rounded-xl bg-green-500/10 text-green-600">
          <Phone size={18} />
        </a>
        {!isGov && (
          <button onClick={() => deleteContact(contact.id)} className="p-3 rounded-xl bg-red-500/10 text-red-600">
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 ${darkMode ? 'bg-slate-950' : 'bg-indigo-50'}`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
          .font-libre { font-family: 'Libre Baskerville', serif; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes ripple { 0% { transform: scale(1); opacity: 0.3; } 100% { transform: scale(1.6); opacity: 0; } }
          @keyframes sos-pulse { 0% { background-color: #ef4444; transform: scale(0.9); } 50% { background-color: #b91c1c; transform: scale(0.95); } 100% { background-color: #ef4444; transform: scale(0.9); } }
          .animate-ripple { animation: ripple 2.5s infinite ease-out; }
          .animate-sos-active { animation: sos-pulse 0.5s infinite ease-in-out; }
        `}
      </style>

      {/* Device Shell */}
      <div className={`w-full max-w-sm transition-colors duration-500 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 relative h-[800px] flex flex-col font-libre ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#F9F7FF] border-slate-900 text-slate-900'}`}>
        
        {/* Status Bar */}
        <div className={`px-6 py-3 flex justify-between items-center text-xs font-sans shrink-0 ${darkMode ? 'bg-slate-950 text-purple-300' : 'bg-slate-900 text-purple-100'}`}>
          <span className="font-medium">9:41</span>
          <div className="flex gap-2 opacity-60">
            <Signal size={14} /> <Wifi size={14} /> <Battery size={14} />
          </div>
        </div>

        {/* Global Header */}
        <header className="px-6 pt-8 pb-4 flex flex-col items-center shrink-0 relative">
          <button onClick={() => setDarkMode(!darkMode)} className={`absolute right-6 top-8 p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-purple-100 text-purple-900'}`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <h1 className="text-3xl font-black tracking-tighter transition-colors">STREE</h1>
          <p className={`text-[0.7rem] font-bold tracking-[0.3em] uppercase mt-1 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {currentPage === 'home' ? 'Her For Hers' : 'Safe Circle'}
          </p>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col relative">
          
          {currentPage === 'home' && (
            <div className="flex-grow flex flex-col">
              <div className="px-6 text-center mt-2">
                <h2 className={`text-sm font-medium italic ${darkMode ? 'text-purple-300' : 'text-purple-400'}`}>Peace in every step</h2>
              </div>

              {/* SOS Circle */}
              <div className="flex-grow flex flex-col items-center justify-center relative min-h-[320px]">
                <div className={`absolute inset-0 transition-colors duration-500 ${sosActive ? 'bg-red-500/20' : tapCount > 0 ? 'bg-purple-500/10' : ''}`}></div>
                <div className="relative z-20">
                  <div className={`absolute inset-0 rounded-full animate-ripple ${sosActive ? 'bg-red-400/30' : (darkMode ? 'bg-purple-400/20' : 'bg-purple-100')}`}></div>
                  <button
                    onClick={handleSosTap}
                    className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 ${sosActive ? 'animate-sos-active border-4 border-red-200' : tapCount > 0 ? 'scale-95 border-4 border-purple-300' : 'hover:scale-105 border-4 border-purple-100'} bg-gradient-to-br ${darkMode ? 'from-purple-600 to-purple-800' : 'from-purple-600 to-purple-800'}`}
                  >
                    <AlertTriangle className="w-10 h-10 text-white fill-current opacity-90 mb-1" />
                    <span className="text-4xl font-black text-white tracking-widest">SOS</span>
                    <div className="mt-2 flex gap-1.5">
                      {[1, 2, 3].map(d => <div key={d} className={`h-1.5 rounded-full transition-all ${tapCount >= d ? 'bg-white w-4' : 'bg-white/30 w-1.5'}`} />)}
                    </div>
                  </button>
                </div>
              </div>

              {/* Grid Mini */}
              <div className={`rounded-t-[2.5rem] p-6 mt-auto border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-50'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div onClick={() => setCurrentPage('contacts')} className={`p-4 rounded-2xl cursor-pointer ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <Users size={20} className="mb-2 text-purple-500" />
                    <h4 className="text-xs font-bold">Trusted Circle</h4>
                  </div>
                  <div className={`p-4 rounded-2xl ${darkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-50'}`}>
                    <MapPin size={20} className="mb-2 text-fuchsia-500" />
                    <h4 className="text-xs font-bold">Live Tracking</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'contacts' && (
            <div className="p-6 pb-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Family Contacts</h3>
                <button onClick={() => setShowAddSheet(true)} className="flex items-center gap-1 text-purple-600 text-xs font-bold uppercase tracking-wider">
                  <Plus size={16} /> Add
                </button>
              </div>

              {familyContacts.length === 0 ? (
                <div className={`p-10 rounded-3xl border-2 border-dashed flex flex-col items-center text-center ${darkMode ? 'border-slate-800 text-slate-500' : 'border-purple-100 text-purple-300'}`}>
                  <UserPlus size={40} className="mb-2 opacity-50" />
                  <p className="text-sm">No trusted family added yet</p>
                </div>
              ) : (
                familyContacts.map(c => <ContactCard key={c.id} contact={c} isGov={false} />)
              )}

              <h3 className="text-lg font-bold mt-8 mb-4">Official Help</h3>
              {govContacts.map(c => <ContactCard key={c.id} contact={c} isGov={true} />)}
            </div>
          )}

          {showAddSheet && <AddContactSheet />}
        </div>

        {/* Navigation Bar */}
        <footer className={`px-4 py-4 flex justify-between items-center border-t shrink-0 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-purple-50'}`}>
          <button onClick={() => setCurrentPage('home')} className={`flex flex-col items-center gap-1 group transition-colors ${currentPage === 'home' ? 'text-purple-600' : 'text-slate-400'}`}>
            <Home size={20} className={currentPage === 'home' ? 'fill-current opacity-20' : ''} />
            <span className="text-[8px] font-sans font-bold uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => setCurrentPage('contacts')} className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'contacts' ? 'text-purple-600' : 'text-slate-400'}`}>
            <Phone size={20} />
            <span className="text-[8px] font-sans font-bold uppercase tracking-tighter">Contact</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 opacity-50"><Users size={20} /><span className="text-[8px] font-sans font-bold uppercase tracking-tighter">Community</span></button>
          <button className="flex flex-col items-center gap-1 text-slate-400 opacity-50"><MapPin size={20} /><span className="text-[8px] font-sans font-bold uppercase tracking-tighter">Location</span></button>
          <button className="flex flex-col items-center gap-1 text-slate-400 opacity-50"><UserCircle size={20} /><span className="text-[8px] font-sans font-bold uppercase tracking-tighter">Account</span></button>
        </footer>

      </div>
    </div>
  );
};

export default App;
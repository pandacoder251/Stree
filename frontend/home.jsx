import React, { useState, useEffect } from 'react';

const StreeHome = () => {
  const [sosTapCount, setSosTapCount] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [activeSection, setActiveSection] = useState('');

  // Handle SOS tap logic
  const handleSosTap = () => {
    if (sosActive) return;
    
    setSosTapCount(prev => prev + 1);
    setCountdown(3);
  };

  // Countdown timer for SOS activation
  useEffect(() => {
    if (sosTapCount > 0 && sosTapCount < 3) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setSosTapCount(0);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sosTapCount]);

  // Activate SOS when 3 taps are completed
  useEffect(() => {
    if (sosTapCount >= 3) {
      setSosActive(true);
      // Trigger emergency call
      window.location.href = 'tel:100';
    }
  }, [sosTapCount]);

  // Reset SOS state
  const resetSos = () => {
    setSosTapCount(0);
    setSosActive(false);
    setCountdown(3);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setActiveSection(''), 2000);
  };

  return (
    <div style={styles.container}>
      {/* Header Navigation */}
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.logoContainer}>
            <h1 style={styles.logo}>STREE</h1>
            <p style={styles.tagline}>Her for Hers</p>
          </div>
          
          <div style={styles.navLinks}>
            <a 
              href="#location-tracker" 
              style={styles.navLink}
              onClick={(e) => { e.preventDefault(); scrollToSection('location-tracker'); }}
            >
              Location Tracker
            </a>
            <a 
              href="#emergency-tracker" 
              style={styles.navLink}
              onClick={(e) => { e.preventDefault(); scrollToSection('emergency-tracker'); }}
            >
              Emergency Tracker
            </a>
            <a 
              href="#safety-tips" 
              style={styles.navLink}
              onClick={(e) => { e.preventDefault(); scrollToSection('safety-tips'); }}
            >
              Safety Tips
            </a>
            <a 
              href="#community" 
              style={styles.navLink}
              onClick={(e) => { e.preventDefault(); scrollToSection('community'); }}
            >
              Community
            </a>
          </div>
        </nav>
      </header>

      {/* SOS Emergency Section */}
      <div 
        style={{
          ...styles.sosContainer,
          background: sosActive ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' : 
                      'linear-gradient(135deg, #6f42c1 0%, #5a3d8c 100%)'
        }}
      >
        <div style={styles.sosContent}>
          <h2 style={styles.sosTitle}>
            {sosActive ? '🚨 EMERGENCY CALLING 100...' : '🆘 SOS Emergency'}
          </h2>
          <p style={styles.sosInstruction}>
            {sosActive 
              ? 'Stay calm. Help is on the way.' 
              : `Tap the button 3 times within ${countdown} seconds to call emergency services`
            }
          </p>
          
          <div style={styles.sosButtonWrapper}>
            <button 
              onClick={handleSosTap}
              disabled={sosActive}
              style={{
                ...styles.sosButton,
                background: sosActive ? '#fff' : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                boxShadow: sosActive 
                  ? '0 0 50px rgba(255,255,255,0.5)' 
                  : '0 10px 40px rgba(139, 92, 246, 0.4)',
                animation: sosActive ? 'pulse 0.5s infinite' : 'none'
              }}
            >
              {sosActive ? '📞 CALLING...' : 'SOS'}
            </button>
            {sosTapCount > 0 && sosTapCount < 3 && !sosActive && (
              <div style={styles.tapCounter}>
                {sosTapCount}/3 Taps
              </div>
            )}
          </div>
          
          {sosActive && (
            <button onClick={resetSos} style={styles.cancelButton}>
              Cancel Call
            </button>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <main style={styles.main}>
        
        {/* Location Tracker Section */}
        <section id="location-tracker" style={styles.section}>
          <div style={styles.sectionIcon}>📍</div>
          <h2 style={styles.sectionTitle}>Location Tracker</h2>
          <p style={styles.sectionDescription}>
            Share your real-time location with trusted contacts. 
            Let your loved ones know you're safe wherever you go.
          </p>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Features</h3>
            <ul style={styles.featureList}>
              <li>Real-time GPS tracking</li>
              <li>Share location with emergency contacts</li>
              <li>Location history for safety records</li>
              <li>Geofencing alerts</li>
            </ul>
          </div>
        </section>

        {/* Emergency Tracker Section */}
        <section id="emergency-tracker" style={styles.section}>
          <div style={styles.sectionIcon}>⚡</div>
          <h2 style={styles.sectionTitle}>Emergency Tracker</h2>
          <p style={styles.sectionDescription}>
            Instant emergency alerts and tracking. Get help immediately 
            when you need it most.
          </p>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Emergency Features</h3>
            <ul style={styles.featureList}>
              <li>One-tap emergency alerts</li>
              <li>Automatic location sharing with authorities</li>
              <li>Audio/video evidence recording</li>
              <li>Instant notification to registered contacts</li>
            </ul>
          </div>
        </section>

        {/* Safety Tips Section */}
        <section id="safety-tips" style={styles.section}>
          <div style={styles.sectionIcon}>🛡️</div>
          <h2 style={styles.sectionTitle}>Safety Tips</h2>
          <p style={styles.sectionDescription}>
            Empower yourself with practical safety tips and self-defense 
            techniques for everyday situations.
          </p>
          <div style={styles.tipsGrid}>
            <div style={styles.tipCard}>
              <span style={styles.tipIcon}>🏠</span>
              <h4>At Home</h4>
              <p>Security measures and safety protocols for your residence</p>
            </div>
            <div style={styles.tipCard}>
              <span style={styles.tipIcon}>🚗</span>
              <h4>While Traveling</h4>
              <p>Safety tips for commutes and long-distance travel</p>
            </div>
            <div style={styles.tipCard}>
              <span style={styles.tipIcon}>💼</span>
              <h4>At Workplace</h4>
              <p>Professional safety and harassment prevention</p>
            </div>
            <div style={styles.tipCard}>
              <span style={styles.tipIcon}>🎉</span>
              <h4>Social Events</h4>
              <p>Stay safe during social gatherings and outings</p>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" style={styles.section}>
          <div style={styles.sectionIcon}>🤝</div>
          <h2 style={styles.sectionTitle}>Community</h2>
          <p style={styles.sectionDescription}>
            Join a supportive community of women who stand together 
            for safety, empowerment, and growth.
          </p>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Community Benefits</h3>
            <ul style={styles.featureList}>
              <li>Connect with women in your locality</li>
              <li>Share experiences and support each other</li>
              <li>Participate in safety workshops</li>
              <li>Access mentorship programs</li>
              <li>Build lasting friendships and networks</li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2025 Stree - Her for Hers. Together we are stronger.
        </p>
        <div style={styles.emergencyNumbers}>
          <p style={styles.emergencyText}>Emergency: 100 (Police) | Women Helpline: 1091</p>
        </div>
      </footer>

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
};

// Comprehensive CSS-in-JS styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #6f42c1 0%, #5a3d8c 100%)',
    padding: '1rem 2rem',
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(111, 66, 193, 0.3)',
  },
  
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  
  logoContainer: {
    textAlign: 'center',
  },
  
  logo: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0',
    letterSpacing: '4px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  
  tagline: {
    fontSize: '0.9rem',
    color: '#e9d8fd',
    margin: '0',
    fontWeight: '500',
    letterSpacing: '2px',
  },
  
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    background: 'rgba(255,255,255,0.1)',
  },
  
  sosContainer: {
    marginTop: '80px',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#ffffff',
    transition: 'all 0.5s ease',
  },
  
  sosContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  sosTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  
  sosInstruction: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  
  sosButtonWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  
  sosButton: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    border: 'none',
    fontSize: '2rem',
    fontWeight: '800',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '4px',
  },
  
  tapCounter: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
    animation: 'pulse 0.5s infinite',
  },
  
  cancelButton: {
    marginTop: '2rem',
    padding: '1rem 3rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#dc3545',
    background: '#ffffff',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  
  section: {
    padding: '4rem 2rem',
    marginBottom: '2rem',
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(111, 66, 193, 0.1)',
    border: '1px solid #e9d8fd',
    scrollMarginTop: '100px',
  },
  
  sectionIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  
  sectionTitle: {
    fontSize: '2rem',
    color: '#6f42c1',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  
  sectionDescription: {
    fontSize: '1.1rem',
    color: '#4a4a4a',
    marginBottom: '2rem',
    lineHeight: '1.8',
  },
  
  card: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid #e9d8fd',
  },
  
  cardTitle: {
    fontSize: '1.3rem',
    color: '#6f42c1',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  
  tipCard: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid #e9d8fd',
    textAlign: 'center',
  },
  
  tipIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'block',
  },
  
  footer: {
    background: 'linear-gradient(135deg, #6f42c1 0%, #5a3d8c 100%)',
    color: '#ffffff',
    padding: '2rem',
    textAlign: 'center',
  },
  
  footerText: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  
  emergencyNumbers: {
    borderTop: '1px solid rgba(255,255,255,0.2)',
    paddingTop: '1rem',
    marginTop: '1rem',
  },
  
  emergencyText: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
};

export default StreeHome;


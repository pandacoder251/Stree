import React, { useState, useEffect } from 'react'
import './src/index.css'

// Mock services for state management
const useSOSService = () => {
  const [sosActivated, setSosActivated] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  useEffect(() => {
    let timeout
    if (tapCount > 0 && !sosActivated) {
      timeout = setTimeout(() => setTapCount(0), 2000)
    }
    return () => clearTimeout(timeout)
  }, [tapCount, sosActivated])

  const handleTap = () => {
    if (sosActivated) return
    const newCount = tapCount + 1
    setTapCount(newCount)
    if (newCount >= 3) {
      setSosActivated(true)
      setTapCount(0)
      console.log('SOS Activated!')
    }
  }

  const deactivateSOS = () => {
    setSosActivated(false)
    setTapCount(0)
  }

  return { sosActivated, tapCount, handleTap, deactivateSOS }
}

const useLocationService = () => {
  return {
    getCurrentLocation: () => {
      console.log('Getting current location...')
      return { latitude: 0, longitude: 0 }
    }
  }
}

// Icons as inline SVG components
const Icons = {
  emergency: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  ),
  warning: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  ),
  location_on: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  contacts: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
      <path d="M20 0H4v2h16V0zm-2 19c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1h18v1zm-2-3H6v-1h10v1zm0-2H6V7h12v7z"/>
    </svg>
  ),
  people: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  health_and_safety: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
    </svg>
  ),
  home: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  lightbulb: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
    </svg>
  )
}

// SOS Button Component
const SOSButton = ({ sosService }) => {
  const { sosActivated, tapCount, handleTap, deactivateSOS } = sosService

  const getGradient = () => {
    if (sosActivated) {
      return 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)'
    }
    return 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
  }

  return (
    <div className="sos-button" onClick={handleTap} style={{ background: getGradient() }}>
      <div className="sos-content">
        {sosActivated ? <Icons.emergency /> : <Icons.warning />}
        <p className="sos-title">{sosActivated ? 'SOS ACTIVATED' : 'EMERGENCY SOS'}</p>
        <p className="sos-subtitle">
          {sosActivated ? 'Emergency services alerted' : 'Tap 3 times quickly to activate'}
        </p>

        {tapCount > 0 && !sosActivated && (
          <div className="tap-indicators">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`tap-dot ${index < tapCount ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        {sosActivated && (
          <button className="cancel-sos-button" onClick={(e) => { e.stopPropagation(); deactivateSOS() }}>
            Cancel SOS
          </button>
        )}
      </div>
    </div>
  )
}

// Quick Access Card Component
const QuickAccessCard = ({ icon, title, subtitle, color, onTap }) => {
  const IconComponent = Icons[icon] || Icons.location_on

  return (
    <div className="quick-access-card" onClick={onTap}>
      <div className="card-icon" style={{ color }}>
        <IconComponent />
      </div>
      <p className="card-title">{title}</p>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  )
}

// Quick Access Grid Component
const QuickAccessGrid = () => {
  const cards = [
    { icon: 'location_on', title: 'Location Share', subtitle: 'Share live location', color: '#7c3aed', onTap: () => console.log('Navigate to location') },
    { icon: 'contacts', title: 'Contacts', subtitle: 'Emergency numbers', color: '#8b5cf6', onTap: () => console.log('Navigate to contacts') },
    { icon: 'people', title: 'Community', subtitle: 'Support groups', color: '#a78bfa', onTap: () => console.log('Navigate to community') },
    { icon: 'health_and_safety', title: 'Safety Tips', subtitle: 'Stay informed', color: '#7c3aed', onTap: () => console.log('Navigate to safety tips') }
  ]

  return (
    <div className="quick-access-grid">
      {cards.map((card, index) => (
        <QuickAccessCard key={index} {...card} />
      ))}
    </div>
  )
}

// Safety Tips Card Component
const SafetyTipsCard = () => {
  const tips = [
    'Always share your location with trusted contacts',
    'Keep emergency contacts easily accessible',
    'Trust your instincts and stay aware'
  ]

  return (
    <div className="safety-tips-card">
      <div className="safety-header">
        <Icons.lightbulb />
        <h3>Safety Tips</h3>
      </div>
      <div className="tips-list">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <span className="bullet">•</span>
            <p>{tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Bottom Navigation Component
const AppBottomNav = ({ currentIndex }) => {
  const navItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'location_on', label: 'Location' },
    { icon: 'contacts', label: 'Contacts' },
    { icon: 'people', label: 'Community' }
  ]

  const handleNav = (index) => {
    console.log(`Navigate to tab: ${index}`)
  }

  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => {
        const IconComponent = Icons[item.icon] || Icons.home
        return (
          <button
            key={index}
            className={`nav-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleNav(index)}
          >
            <IconComponent />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

// Main Home Page Component
const StreeHome = () => {
  const sosService = useSOSService()
  const locationService = useLocationService()

  return (
    <div className="stree-home">
      <main className="home-main">
        <div className="home-content">
          <div className="home-header">
            <h1 className="app-title">Stree</h1>
            <p className="app-subtitle">Her for Hers</p>
          </div>

          <div className="home-spacing-lg" />

          <SOSButton sosService={sosService} />

          <div className="home-spacing-xxl" />

          <h2 className="section-title">Quick Access</h2>

          <div className="home-spacing-md" />

          <QuickAccessGrid />

          <div className="home-spacing-xxl" />

          <SafetyTipsCard />
        </div>
      </main>

      <AppBottomNav currentIndex={0} />
    </div>
  )
}

export default StreeHome


import React, { useState } from 'react';
import { Fingerprint, Menu, X, ShieldAlert, Sparkles, Image as ImageIcon, BookOpen, Info, Home } from 'lucide-react';

export type ActiveTab = 'home' | 'deepfake' | 'sketch' | 'text' | 'research' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  apiOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, apiOnline }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'HOME', icon: <Home size={15} /> },
    { id: 'deepfake', label: 'DEEPFAKE DETECTION', icon: <ShieldAlert size={15} /> },
    { id: 'sketch', label: 'FACE SKETCH', icon: <ImageIcon size={15} /> },
    { id: 'text', label: 'TEXT-TO-FACE', icon: <Sparkles size={15} /> },
    { id: 'research', label: 'RESEARCH', icon: <BookOpen size={15} /> },
    { id: 'about', label: 'ABOUT', icon: <Info size={15} /> },
  ];

  const handleSelect = (id: ActiveTab) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#06121f]/90 backdrop-blur-md border-b border-[#00e5ff]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleSelect('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl border border-[#00e5ff]/50 bg-[#06121f] shadow-[0_0_20px_rgba(0,229,255,0.25)] flex items-center justify-center text-[#00e5ff] group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all">
            <Fingerprint size={22} />
          </div>
          <div>
            <div className="text-base font-bold tracking-wider font-['Space_Grotesk'] text-[#f5fbff] flex items-center gap-1.5">
              <span>FACEAI</span>
              <span className="text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">STUDIO</span>
            </div>
            <div className="text-[8px] font-mono tracking-widest text-[#9bb4c5]">
              INTELLIGENCE BEYOND APPEARANCE
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative px-3 py-2 text-xs font-semibold tracking-wider font-['Space_Grotesk'] rounded-md transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-[#00ffd1] bg-[#00e5ff]/10 border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                    : 'text-[#9bb4c5] hover:text-[#f5fbff] hover:bg-[#102638]/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#00ffd1] shadow-[0_0_8px_#00ffd1]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Status Beacon & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#102638]/80 border border-[#00e5ff]/20 text-[10px] font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                apiOnline
                  ? 'bg-[#00ffd1] shadow-[0_0_10px_#00ffd1]'
                  : 'bg-[#ff647e] shadow-[0_0_10px_#ff647e]'
              }`}
            />
            <span className={apiOnline ? 'text-[#00ffd1]' : 'text-[#ff647e]'}>
              API {apiOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#00e5ff] hover:bg-[#102638] border border-[#00e5ff]/30"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06121f]/98 border-b border-[#00e5ff]/20 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold tracking-wider font-['Space_Grotesk'] text-left transition-all ${
                  isActive
                    ? 'text-[#00ffd1] bg-[#00e5ff]/15 border border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'text-[#9bb4c5] hover:text-white hover:bg-[#102638]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#00e5ff]/15 flex items-center justify-between text-[10px] font-mono text-[#9bb4c5]">
            <span>SYSTEM STATUS</span>
            <span className={apiOnline ? 'text-[#00ffd1]' : 'text-[#ff647e]'}>
              ● {apiOnline ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

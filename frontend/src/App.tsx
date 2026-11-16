import React, { useState, useEffect } from 'react';
import Navbar, { ActiveTab } from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DeepfakePage from './pages/DeepfakePage';
import SketchPage from './pages/SketchPage';
import TextToFacePage from './pages/TextToFacePage';
import ResearchPage from './pages/ResearchPage';
import AboutPage from './pages/AboutPage';
import { checkApiHealth } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [apiOnline, setApiOnline] = useState<boolean>(false);

  // Poll backend health status
  useEffect(() => {
    let mounted = true;
    const testHealth = async () => {
      const ok = await checkApiHealth();
      if (mounted) setApiOnline(ok);
    };

    testHealth();
    const interval = setInterval(testHealth, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Listen to hash changes if user uses anchors
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'deepfake', 'sketch', 'text', 'research', 'about'].includes(hash)) {
        setActiveTab(hash as ActiveTab);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="min-h-screen bg-[#06121f] text-[#f5fbff] flex flex-col font-['Inter',sans-serif] selection:bg-[#00e5ff]/30 selection:text-[#00ffd1] relative overflow-x-hidden">
      {/* Top Fixed Cyber Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        apiOnline={apiOnline}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onSelectTab={handleSelectTab} />}
        {activeTab === 'deepfake' && <DeepfakePage />}
        {activeTab === 'sketch' && <SketchPage />}
        {activeTab === 'text' && <TextToFacePage />}
        {activeTab === 'research' && <ResearchPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Cyberpunk Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}

export default App;

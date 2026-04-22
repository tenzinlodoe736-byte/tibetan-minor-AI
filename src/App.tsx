/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Keyboard, 
  Globe, 
  Search, 
  Menu,
  X,
  Languages,
  LayoutDashboard
} from 'lucide-react';
import TutorChat from './components/TutorChat';
import TypingTutor from './components/TypingTutor';
import Dictionary from './components/Dictionary';
import CultureVault from './components/CultureVault';
import Dashboard from './components/Dashboard';

type Section = 'dashboard' | 'tutor' | 'typing' | 'dictionary' | 'culture';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tutor', label: 'AI Tutor', icon: MessageSquare },
    { id: 'typing', label: 'Typing Practice', icon: Keyboard },
    { id: 'dictionary', label: 'Dictionary', icon: BookOpen },
    { id: 'culture', label: 'Culture Vault', icon: Globe },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard setActiveSection={setActiveSection} />;
      case 'tutor': return <TutorChat />;
      case 'typing': return <TypingTutor />;
      case 'dictionary': return <Dictionary />;
      case 'culture': return <CultureVault />;
      default: return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex text-text-main overflow-hidden bg-bg-dark">
      {/* Mobile Nav Toggle */}
      <button 
        id="mobile-nav-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 glass-card lg:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        id="sidebar"
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="bg-bg-sidebar border-r border-accent-border h-screen fixed lg:relative z-40"
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-primary-maroon rounded-xl flex items-center justify-center text-white shadow-lg">
              <Languages size={24} />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-primary-gold">Kha-Yig</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id 
                    ? 'bg-[#222] text-primary-gold border-l-3 border-primary-gold shadow-md' 
                    : 'text-text-muted hover:bg-[#1A1A1A] hover:text-text-main'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto p-4 bg-[#1A1A1A] border border-accent-border rounded-2xl">
            <p className="text-xs text-primary-gold font-serif italic mb-1 uppercase tracking-widest">Wisdom Quote</p>
            <p className="text-xs text-text-muted leading-relaxed">
              "When you speak, you are only repeating what you already know. But if you listen, you may learn something new."
            </p>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        <div className="max-w-5xl mx-auto px-6 py-12 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

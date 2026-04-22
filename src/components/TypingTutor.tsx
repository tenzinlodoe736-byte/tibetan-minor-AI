import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TIBETAN_ALPHABET } from '../types';
import { RotateCcw, Keyboard, Lightbulb } from 'lucide-react';

export default function TypingTutor() {
  const [typedText, setTypedText] = useState('');
  const [targetChar, setTargetChar] = useState(TIBETAN_ALPHABET[0]);
  const [score, setScore] = useState(0);

  const handleKeyClick = (char: string) => {
    setTypedText(prev => prev + char);
    if (char === targetChar) {
      setScore(s => s + 1);
      const nextIndex = (TIBETAN_ALPHABET.indexOf(targetChar) + 1) % TIBETAN_ALPHABET.length;
      setTargetChar(TIBETAN_ALPHABET[nextIndex]);
    }
  };

  const clear = () => {
    setTypedText('');
    setScore(0);
    setTargetChar(TIBETAN_ALPHABET[0]);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-primary-gold">Typing Practice</h2>
        <p className="text-text-muted">Click characters below to practice typing in Tibetan. Try to follow the sequence!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Practice Area */}
        <div className="space-y-6">
          <div className="glass-card p-10 rounded-3xl text-center space-y-6 bg-bg-card">
            <div className="text-sm text-text-muted uppercase tracking-widest font-bold">Target Character</div>
            <motion.div 
              key={targetChar}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl tibetan-text text-white h-32 flex items-center justify-center font-bold"
            >
              {targetChar}
            </motion.div>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-2 bg-primary-gold/10 rounded-full text-primary-gold font-bold border border-primary-gold/20">
                Score: {score}
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea
              readOnly
              value={typedText}
              className="w-full h-40 bg-[#111] border border-accent-border rounded-3xl p-8 tibetan-text text-4xl shadow-inner focus:outline-none placeholder:text-gray-800 text-primary-gold"
              placeholder="Your progress appear here..."
            />
            <button 
              onClick={clear}
              className="absolute bottom-4 right-4 p-2 text-text-muted hover:text-primary-gold transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Character Grid / Virtual Keyboard */}
        <div className="glass-card p-6 rounded-3xl bg-bg-sidebar">
          <div className="flex items-center gap-2 mb-6 px-2 text-primary-gold/60">
            <Keyboard size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Consonants</span>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {TIBETAN_ALPHABET.map((char) => (
              <button
                key={char}
                onClick={() => handleKeyClick(char)}
                className={`aspect-square flex items-center justify-center tibetan-text text-2xl rounded-xl transition-all border shadow-sm ${
                  char === targetChar 
                    ? 'bg-primary-gold text-bg-dark border-primary-gold shadow-lg ring-4 ring-primary-gold/10 scale-105 z-10 font-bold' 
                    : 'bg-[#222] border-accent-border text-text-main hover:border-primary-gold hover:text-primary-gold'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-6 rounded-2xl bg-primary-maroon/10 border border-primary-maroon/20 flex gap-4">
            <div className="w-10 h-10 bg-primary-maroon rounded-full flex items-center justify-center text-white shrink-0">
              <Lightbulb size={20} />
            </div>
            <div className="text-sm">
              <h4 className="font-bold text-white mb-1 tracking-tight">Learning Tip</h4>
              <p className="text-text-muted leading-relaxed">
                Tibetan characters are structured in groups of four. Practice them as rhythms to help memorize the phonetics better!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

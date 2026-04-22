import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Book, Globe, MessageCircle, Keyboard } from 'lucide-react';

interface Props {
  setActiveSection: (section: any) => void;
}

export default function Dashboard({ setActiveSection }: Props) {
  const cards = [
    { id: 'tutor', title: 'AI Language Tutor', desc: 'Chat with Sherab to practice speaking and grammar.', icon: MessageCircle, color: 'text-blue-400 bg-blue-400/10' },
    { id: 'typing', title: 'Learn to Type', desc: 'Master the Tibetan alphabet and consonant-vowel combinations.', icon: Keyboard, color: 'text-green-400 bg-green-400/10' },
    { id: 'dictionary', title: 'Words & Phrases', desc: 'Essential Tibetan vocabulary for daily use and travel.', icon: Book, color: 'text-amber-400 bg-amber-400/10' },
    { id: 'culture', title: 'Culture Explorer', desc: 'Dive into the history, festivals, and traditions of Tibet.', icon: Globe, color: 'text-purple-400 bg-purple-400/10' },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <motion.h2 
          className="text-4xl lg:text-5xl font-serif font-bold text-primary-gold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Welcome to Kha-Yig, <span className="tibetan-text text-primary-gold">བཀྲ་ཤིས་བདེ་ལེགས།</span>
        </motion.h2>
        <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
          Your portal to the Tibetan language and heart of the Himalayas. Choose a path below to begin your journey.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            onClick={() => setActiveSection(card.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-start p-8 rounded-3xl border border-accent-border bg-bg-card text-left transition-all hover:border-primary-gold/50 hover:shadow-xl group"
          >
            <div className={`p-4 rounded-2xl ${card.color} mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-main">{card.title}</h3>
            <p className="text-text-muted mb-6 flex-1">{card.desc}</p>
            <div className="flex items-center gap-2 text-primary-gold font-semibold group-hover:gap-4 transition-all">
              <span>Start Learning</span>
              <ArrowRight size={18} />
            </div>
          </motion.button>
        ))}
      </div>

      <section className="p-8 rounded-3xl bg-primary-maroon text-white overflow-hidden relative shadow-2xl border border-white/10">
        <div className="relative z-10 space-y-4 max-w-lg">
          <h3 className="text-3xl font-serif font-bold">Featured Cultural Insight</h3>
          <p className="opacity-90 leading-relaxed text-lg text-primary-gold">
            Learn about "Losar" - the Tibetan New Year. Discover the rituals, food, and spiritual significance of our most important festival.
          </p>
          <button 
            onClick={() => setActiveSection('culture')}
            className="bg-primary-gold text-primary-maroon px-6 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all"
          >
            Explore History
          </button>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 right-0 tibetan-text opacity-5 text-9xl select-none translate-y-1/4">
          བོད
        </div>
      </section>
    </div>
  );
}

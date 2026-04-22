import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowLeft, Loader2, Sparkles, History, Users, Music, Landmark } from 'lucide-react';
import { getCulturalInsight } from '../services/gemini';
import Markdown from 'react-markdown';

interface Topic {
  id: string;
  name: string;
  nameTib: string;
  desc: string;
  icon: any;
  color: string;
}

const TOPICS: Topic[] = [
  { id: 'history', name: 'History', nameTib: 'རྒྱལ་རབས།', desc: 'From the foundation of the Yarlung Dynasty to modern history.', icon: History, color: 'bg-red-50 text-red-600' },
  { id: 'festivals', name: 'Festivals', nameTib: 'དུས་ཆེན།', desc: 'Discover Losar, Saka Dawa, and the Shoton Festival.', icon: Users, color: 'bg-orange-50 text-orange-600' },
  { id: 'arts', name: 'Art & Music', nameTib: 'སྒྱུ་རྩལ།', desc: 'Thangka painting, traditional opera (Ache Lhamo), and folk music.', icon: Music, color: 'bg-blue-50 text-blue-600' },
  { id: 'philosophy', name: 'Philosophy', nameTib: 'ལྟ་བ།', desc: 'The spiritual heart of Tibet and Buddhist philosophy.', icon: Landmark, color: 'bg-amber-50 text-amber-600' },
  { id: 'traditions', name: 'Daily Traditions', nameTib: 'ལུགས་སྲོལ།', desc: 'Tea culture, nomadic life, and social etiquette.', icon: Globe, color: 'bg-green-50 text-green-600' },
];

export default function CultureVault() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchInsight = async (topic: Topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setInsight(null);
    const text = await getCulturalInsight(topic.name);
    setInsight(text);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <header className="space-y-4">
              <h2 className="text-3xl font-serif font-bold text-primary-gold">Culture Vault</h2>
              <p className="text-text-muted">Deepen your understanding of the Wisdom of Tibet.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOPICS.map((topic, idx) => (
                <motion.button
                  key={topic.id}
                  onClick={() => handleFetchInsight(topic)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-bg-card border border-accent-border shadow-sm text-left hover:border-primary-gold/50 hover:shadow-xl transition-all group flex gap-6 items-start"
                >
                  <div className={`p-4 rounded-2xl ${topic.color} group-hover:scale-110 transition-transform`}>
                    <topic.icon size={28} />
                  </div>
                  <div>
                    <div className="flex flex-col mb-2">
                       <span className="tibetan-text text-xl text-primary-gold">{topic.nameTib}</span>
                       <h3 className="text-2xl font-bold text-text-main">{topic.name}</h3>
                    </div>
                    <p className="text-text-muted leading-relaxed">{topic.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="insight"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-primary-gold font-bold hover:gap-4 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Explorer
            </button>

            <div className="glass-card p-12 rounded-3xl min-h-[400px] bg-bg-card">
              <div className="flex items-center gap-6 mb-12">
                <div className={`p-5 rounded-2xl ${selectedTopic.color} shadow-lg shadow-black/20`}>
                  <selectedTopic.icon size={40} />
                </div>
                <div>
                  <span className="tibetan-text text-2xl text-primary-gold">{selectedTopic.nameTib}</span>
                  <h3 className="text-4xl font-serif font-bold text-text-main">{selectedTopic.name}</h3>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-6 opacity-50">
                  <Loader2 className="animate-spin text-primary-gold" size={64} />
                  <p className="font-serif italic text-primary-gold">Unrolling the ancient scrolls...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-lg prose-invert max-w-none"
                >
                  <div className="flex items-center gap-2 mb-8 p-4 bg-primary-maroon/20 rounded-xl border border-primary-maroon/30 text-primary-gold text-sm font-medium">
                    <Sparkles size={16} />
                    AI Insight by Sherab
                  </div>
                  <div className="markdown-body prose-invert">
                    <Markdown>{insight!}</Markdown>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

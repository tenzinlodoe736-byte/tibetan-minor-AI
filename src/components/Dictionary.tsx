import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Volume2, BookOpen, Tag } from 'lucide-react';
import { DICTIONARY, TibetanWord } from '../types';

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(DICTIONARY.map(w => w.category)));

  const filtered = DICTIONARY.filter(word => {
    const matchesSearch = 
      word.tibetan.includes(searchTerm) || 
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.phonetic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory ? word.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h2 className="text-3xl font-serif font-bold text-primary-gold">Language Dictionary</h2>
        <p className="text-text-muted">Explore everyday phrases and essential vocabulary.</p>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-gold transition-colors" size={20} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by English, Tibetan, or Phonetic..."
            className="w-full pl-12 pr-6 py-4 bg-bg-card border border-accent-border rounded-2xl shadow-sm text-text-main focus:ring-2 focus:ring-primary-gold outline-none transition-all placeholder:text-text-muted"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
            selectedCategory === null 
              ? 'bg-primary-gold text-bg-dark border-primary-gold' 
              : 'bg-bg-sidebar text-text-muted border-accent-border hover:border-primary-gold/50 hover:text-text-main'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              selectedCategory === cat 
                ? 'bg-primary-gold text-bg-dark border-primary-gold' 
                : 'bg-bg-sidebar text-text-muted border-accent-border hover:border-primary-gold/50 hover:text-text-main'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((word, idx) => (
          <motion.div
            key={word.tibetan}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            className="glass-card p-6 rounded-2xl bg-bg-card border border-accent-border flex flex-col gap-4 relative overflow-hidden group hover:border-primary-gold/50"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] uppercase font-bold text-white bg-primary-maroon px-2 py-0.5 rounded-full shadow-sm">
                {word.category}
              </span>
              <button className="text-text-muted hover:text-primary-gold transition-colors">
                <Volume2 size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="tibetan-text text-3xl font-bold text-primary-gold">{word.tibetan}</h4>
              <p className="text-xs font-mono text-text-muted italic">[{word.phonetic}]</p>
            </div>

            <p className="text-text-main font-medium border-t border-accent-border pt-4 mt-1">
              {word.english}
            </p>

            {/* Decoration */}
            <div className="absolute -bottom-2 -right-2 opacity-[0.05] text-6xl tibetan-text group-hover:scale-110 group-hover:opacity-10 transition-all select-none text-primary-gold">
              {word.tibetan[0]}
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <BookOpen size={32} />
            </div>
            <p className="text-gray-500">No words found match your search. Ask Sherab in the tutor section!</p>
          </div>
        )}
      </div>
    </div>
  );
}

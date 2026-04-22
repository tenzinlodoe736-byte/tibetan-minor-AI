export interface TibetanWord {
  tibetan: string;
  phonetic: string;
  english: string;
  category: 'Greeting' | 'Common' | 'Food' | 'Culture' | 'Number';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const DICTIONARY: TibetanWord[] = [
  { tibetan: "བཀྲ་ཤིས་བདེ་ལེགས།", phonetic: "Tashi Delek", english: "Hello / Auspicious Greetings", category: "Greeting" },
  { tibetan: "ཐུགས་རྗེ་ཆེ།", phonetic: "Thuk-je-che", english: "Thank you", category: "Greeting" },
  { tibetan: "ག་ལེར་ཕེབས།", phonetic: "Ka-le-phe", english: "Goodbye (Go slowly)", category: "Greeting" },
  { tibetan: "ཁྱེད་རང་སྐུ་གཟུགས་བདེ་པོ་ཡིན་པས།", phonetic: "Khye-rang ku-zuk de-po yin-pe?", english: "How are you?", category: "Greeting" },
  { tibetan: "ང་བདེ་པོ་ཡིན།", phonetic: "Nga de-po yin", english: "I am fine", category: "Greeting" },
  { tibetan: "ཞལ་ལག་མཆོད་རོགས།", phonetic: "Shay-la cho-rok", english: "Please eat", category: "Food" },
  { tibetan: "ཆུ།", phonetic: "Chu", english: "Water", category: "Food" },
  { tibetan: "ཇ།", phonetic: "Ja", english: "Tea", category: "Food" },
  { tibetan: "བོད་སྐད།", phonetic: "Bhoe-ke", english: "Tibetan Language", category: "Common" },
  { tibetan: "བོད།", phonetic: "Bhoe", english: "Tibet", category: "Culture" },
  { tibetan: "བླ་མ།", phonetic: "Lama", english: "Teacher / Monk", category: "Culture" },
  { tibetan: "གཅིག", phonetic: "Chik", english: "One", category: "Number" },
  { tibetan: "གཉིས།", phonetic: "Nyi", english: "Two", category: "Number" },
  { tibetan: "གསུམ།", phonetic: "Sum", english: "Three", category: "Number" },
];

export const TIBETAN_ALPHABET = [
  "ཀ", "ཁ", "ག", "ང",
  "ཅ", "ཆ", "ཇ", "ཉ",
  "ཏ", "ཐ", "ད", "ན",
  "པ", "ཕ", "བ", "མ",
  "ཙ", "ཚ", "ཛ", "ཝ",
  "ཞ", "ཟ", "འ", "ཡ",
  "ར", "ལ", "ཤ", "ས",
  "ཧ", "ཨ"
];

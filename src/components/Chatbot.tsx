import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, HelpCircle, Sparkles, Smile } from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ChatbotProps {
  language: Language;
}

export default function Chatbot({ language }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initial welcome message
    const welcome = language === 'en' 
      ? "Namaste Beta! 🙏 I am Dadi Maa's AI Kitchen Assistant. Ask me anything about our Desi Ghee, jaggery purity, shelf life, or recipe secrets!" 
      : language === 'hi'
      ? "प्रणाम बेटा! 🙏 हम दादी माँ के रसोई सहायक बानी। घी की शुद्धता, गुड़ की मिठास या शेल्फ लाइफ के बारे में कुछ भी पूछें!"
      : "प्रणाम बेटा! 🙏 हम दादी माई के रसोई सहायक हईं। गुड़ के शुद्धता, घी के मोयन चाहे डब्बा पहुंचे में केतना दिन लगी, कुछुओ पूछीं!";

    setMessages([
      { id: 'msg-init', sender: 'bot', text: welcome }
    ]);
  }, [language]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    { text: language === 'en' ? '🥛 Ghee Quality?' : '🥛 घी की शुद्धता?', keyword: 'ghee' },
    { text: language === 'en' ? '🍯 Sugar Free?' : '🍯 क्या चीनी है?', keyword: 'sugar' },
    { text: language === 'en' ? '📅 Shelf Life?' : '📅 शेल्फ लाइफ कितनी है?', keyword: 'shelf' },
    { text: language === 'en' ? '🚚 Delivery Timeline?' : '🚚 कप पहुँचेगा?', keyword: 'delivery' }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: text
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate grandmother typing advice
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      const normText = text.toLowerCase();

      if (normText.includes('ghee') || normText.includes('ghee') || normText.includes('तेल') || normText.includes('घी')) {
        replyText = language === 'en'
          ? "Arey Beta, we use 100% pure cow Desi Ghee for the 'moyen' (shortening). It gives the biscuit its flaky crumbly texture that melts like cotton in your mouth. No palm oil or hydrogenated fats are allowed in our rasoi!"
          : "अरे बेटा, हम केवल गाय के शुद्ध दानेदार देसी घी का मोयन डालते हैं। इसी से ठेकुआ एकदम खस्ता और सोंधा बनता है और मुँह में घुल जाता है। हम डालडा या पाम ऑयल का नाम भी रसोई में नहीं लेते!";
      } else if (normText.includes('sugar') || normText.includes('चीनी') || normText.includes('मीठा') || normText.includes('गुड़')) {
        replyText = language === 'en'
          ? "We do not use any refined white sugars! Our traditional sweetening is done with local organic sugarcane sugarcane Jaggery (Gur) and sweet fragrant fennel seeds. It is completely natural and wholesome, Beta."
          : "बेटा, हम सफ़ेद रिफाइंड चीनी का प्रयोग बिल्कुल नहीं करते! हमारे मीठे ठेकुए में कोल्हापुर और बिहार के खेतों का शुद्ध सोंधा गुड़ (organic jaggery) डाला जाता है। यह सेहतमंद और सोंधा होता है।";
      } else if (normText.includes('shelf') || normText.includes('खराब') || normText.includes('day') || normText.includes('महीना') || normText.includes('दिन')) {
        replyText = language === 'en'
          ? "Our Sweet Sancha Thekua stays fresh and crisp for up to 45-60 Days. The Nimki can easily go up to 90 Days! Just make sure to store them in airtight jars once opened, so they don't catch atmosphere dampness, Beta!"
          : "बेटा, हमारा ठेकुआ बिना किसी केमिकल के ४५ से ६० दिन तक उत्तम करारा रहता है। और निमकी तो पूरे ९० दिनों तक चाय की साथी बनी रहेगी! बस डिब्बे का ढक्कन टाइट बंद रखना ताकि नमी न लगे।";
      } else if (normText.includes('delivery') || normText.includes('शिपिंग') || normText.includes('पता') || normText.includes('पहुंच')) {
        replyText = language === 'en'
          ? "We prepare snacks fresh on orders daily. It takes our courier associates 3 to 5 business days for pan-India delivery. You will receive a tracking link via SMS directly once shipped. Safe delivery is guaranteed!"
          : "हम हर सुबह ताज़ा घान तैयार करते हैं। पूरे भारत में इसे पहुँचने में ३ से ५ दिन का समय लगता है। जैसे ही रसोई से पार्सल निकलेगा, आपको व्हाट्सएप या मैसेज पर ट्रैकिंग नंबर मिल जाएगा!";
      } else if (normText.includes('recipe') || normText.includes('बनाते') || normText.includes('विधि')) {
        replyText = language === 'en'
          ? "The secret is simple, Beta! It's stone-milled whole wheat flour, high-fat Desi Ghee, jaggery syrup, cardamom, and fennel seeds. We knead by hand, press onto wooden Rosewood moulds, and slow cook. No ovens or automatic machines!"
          : "रेसिपी एकदम सादी है बेटा! शुद्ध गेहूं का पिसा चोकरयुक्त आटा, घी, गुड़, इलायची और सौंफ। हाथ से सानकर काठ के सांचे पर पत्ती का आकार देते हैं और धीमी धीमी लकड़ी की आंच पर कढ़ाही में छानते हैं।";
      } else {
        replyText = language === 'en'
          ? "Arey Beta, that's a lovely question. Traditional village kitchen treats are rare nowadays, but you can trust Maati. Ask me about our ingredients, ghee tests, or COD availability!"
          : "अरे बेटा, बहुत सुंदर बात है। गाँव की मिट्टी के चूल्हे वाले ठेकुए-निमकी का स्वाद अब कम ही मिलता है। घी, गुड़, डिलीवरी या प्रिजर्वेटिव के बारे में और कुछ जानना है तो बेझिझक पूछो!";
      }

      setMessages((prev) => [
        ...prev,
        { id: `msg-b-${Date.now()}`, sender: 'bot', text: replyText }
      ]);
    }, 1200);
  };

  return (
    <div id="ai-chatbot" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#B45309] hover:bg-[#853A00] text-white rounded-full flex items-center justify-center shadow-2xl transition-all focus:outline-none ring-4 ring-[#FAF6EE] cursor-pointer"
        title="Chat with Grandma's Assistant"
      >
        {isOpen ? <X className="w-6 h-6 animate-spin-slow" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Windows panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[320px] sm:w-[350px] h-[450px] bg-[#FAF6EE] rounded-3xl border-2 border-[#EADCC6] shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-[#3F2E1E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-bold text-xs select-none">👵</div>
              <div>
                <h4 className="text-xs font-bold leading-none">Dadi Maa's Rasoi Assistant</h4>
                <p className="text-[9px] text-[#EADCC6] mt-0.5 inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse text-amber-300" /> Active • Warm & Pure
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white focus:outline-none">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex max-w-[80%] flex-col ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#B45309] text-white rounded-tr-none' 
                      : 'bg-white text-[#3F2E1E] rounded-tl-none border border-[#EADCC6]'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[8px] text-[#857252] font-mono mt-0.5">{m.sender === 'user' ? 'You' : 'Dadi Maa'}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex max-w-[80%] mr-auto items-start gap-1">
                <div className="bg-white border border-[#EADCC6] p-2.5 rounded-2xl rounded-tl-none text-xs text-[#857252] font-serif italic">
                  Dadi Maa is remembering recipes... 🥣
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick clickable questions and inputs */}
          <div className="p-3 bg-white border-t border-[#EADCC6] space-y-2.5">
            
            {/* Quick clicks list */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.keyword)}
                    className="text-[10px] font-semibold bg-[#FAF6EE] hover:bg-[#EADCC6] text-[#3F2E1E] border border-[#EADCC6] rounded-full px-2.5 py-1 transition-colors cursor-pointer focus:outline-none"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input typing field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder={language === 'en' ? 'Type ghee, jaggery, shelf...' : 'घी, गुड़, विधि, शेल्फ...'}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-[#FAF6EE] border border-[#EADCC6] rounded-xl px-4 py-2 text-xs text-[#3F2E1E] focus:outline-none"
              />
              <button
                type="submit"
                className="w-9 h-9 bg-[#3F2E1E] text-white rounded-xl flex items-center justify-center hover:bg-[#B45309] shrink-0 cursor-pointer focus:outline-none"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
}

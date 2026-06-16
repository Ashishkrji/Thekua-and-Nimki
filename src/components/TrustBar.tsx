import React from 'react';
import { Heart, ShieldCheck, Flame, Milk, Truck, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface TrustBarProps {
  language: Language;
}

export default function TrustBar({ language }: TrustBarProps) {
  const t = TRANSLATIONS[language];

  const points = [
    {
      icon: <Heart className="w-5 h-5 text-red-600" />,
      text: t.trust_1,
      sub: language === 'en' ? 'Crafted with home care' : language === 'hi' ? 'घरेलू शुद्ध परंपरा' : 'मईया दुलार से गढ़ल'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-700" />,
      text: t.trust_2,
      sub: language === 'en' ? 'No chemical extenders' : language === 'hi' ? 'एकदम रसायन मुक्त' : 'कौनो केमिकल ना'
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      text: t.trust_3,
      sub: language === 'en' ? 'Small batches daily' : language === 'hi' ? 'ताज़ा ताज़ा घान' : 'ताज़ा आर्डर पर कढ़ाई'
    },
    {
      icon: <Milk className="w-5 h-5 text-emerald-700" />,
      text: t.trust_4,
      sub: language === 'en' ? '100% cow Desi Ghee' : language === 'hi' ? 'केवल शुध्द घी-तेल' : 'खाली गाय के शुद्ध घी'
    },
    {
      icon: <Truck className="w-5 h-5 text-[#B45309]" />,
      text: t.trust_5,
      sub: language === 'en' ? 'Express door dispatch' : language === 'hi' ? 'सुरक्षित डब्बा बंद' : 'झटपट घर पहुँचे'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <div id="trust-bar" className="bg-[#3F2E1E] text-[#FAF6EE] py-6 relative z-20">
      {/* Decorative Traditional border overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x bg-[bottom_left]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,5 L10,0 L20,5 Z\" fill=\"%23FAF6EE\"/></svg>')" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FAF6EE]/10 text-center"
        >
          {points.map((point, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-center pt-4 md:pt-0 pb-2 md:pb-0 px-2 group transition-all`}
            >
              <div className="w-10 h-10 rounded-full bg-[#FAF6EE] flex items-center justify-center shadow-md mb-2 group-hover:rotate-12 transition-transform">
                {point.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold tracking-wide text-amber-50">
                {point.text}
              </h3>
              <p className="text-[10px] sm:text-xs text-amber-200/70 font-medium font-sans">
                {point.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-repeat-x" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,0 L10,5 L20,0 Z\" fill=\"%23FAF6EE\"/></svg>')" }} />
    </div>
  );
}

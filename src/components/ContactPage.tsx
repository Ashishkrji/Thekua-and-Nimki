import React, { useState } from 'react';
import { Mail, Phone, MapPin, Compass, Send, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ContactPageProps {
  language: Language;
}

export default function ContactPage({ language }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMsg('');
    }, 3000);
  };

  return (
    <div id="contact-us-view" className="py-12 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">📬 Reach Grandma’s Hearth</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] mt-2">
            {language === 'en' ? 'Get in Touch with Maati' : 'हमसे संपर्क करें'}
          </h1>
          <div className="w-12 h-1 bg-[#B45309] mx-auto mt-4 rounded" />
          <p className="text-sm text-[#857252] font-semibold mt-3">
            Want bulk festival catering, custom corporate boxes, or tracking assistance? Dadi Maa’s team is here to support you!
          </p>
        </div>

        {/* Form and info panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Info coordinates and details map */}
          <div className="lg:col-span-4 bg-[#3F2E1E] text-[#FAF6EE] p-6 sm:p-8 rounded-3xl border border-[#EADCC6]/20 shadow-lg space-y-6">
            
            <h3 className="text-lg font-serif font-bold text-amber-50 leading-tight">
              Maati Rural Kitchen Hubs & Offices
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <p>
                  <strong>Head Office / Kitchen:</strong><br/>
                  Maati Rural Cooperative,<br/>
                  Village Road, Saran, Bihar - 841301
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <p>
                  <strong>Support Email:</strong><br/>
                  rasoi@maatisnacks.com<br/>
                  support@maatisnacks.com
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <p>
                  <strong>Phone Support (9 AM - 6 PM Daily):</strong><br/>
                  Direct WhatsApp: +91 82106 12345<br/>
                  Toll-Free: 1800-419-MAATI
                </p>
              </div>
            </div>

            {/* Quick WhatsApp widget */}
            <div className="border-t border-white/20 pt-4 text-center mt-6">
              <a
                href="https://api.whatsapp.com/send?phone=918210612345&text=Namaste%20Maati%20Dadi%20Maa!%20I%20want%20to%20place%20an%20order%20for%20handcrafted%20snacks."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0F766E] hover:bg-[#084D47] text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-colors"
              >
                <span>💬 WhatsApp support</span>
              </a>
            </div>

          </div>


          {/* RIGHT: Active Contact form panel */}
          <div className="lg:col-span-8 bg-[#FBF9F4] p-6 sm:p-8 rounded-3xl border border-[#EADCC6] shadow-sm">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                
                <h3 className="text-lg font-serif font-black text-[#3F2E1E]">
                  Leave a Message directly at our kitchen hearth
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5C4D3C] uppercase tracking-wide">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#3F2E1E] focus:outline-none focus:border-[#B45309]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#5C4D3C] uppercase tracking-wide">Your Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. anand@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#3F2E1E] focus:outline-none focus:border-[#B45309]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#5C4D3C] uppercase tracking-wide">Message / Query / Catering request</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write details about your bulk orders, feedback, or any recipes you would love to request!"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-white border border-[#EADCC6] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#3F2E1E] focus:outline-none focus:border-[#B45309]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#B45309] hover:bg-[#853A00] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send direct to Saran Hub</span>
                </button>

              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-black text-[#3F2E1E]">Message sent successfully!</h3>
                <p className="text-xs sm:text-sm text-[#857252] max-w-sm mx-auto">
                  Namaste! Thank you for contacting Dadi Maa's cooperative kitchen. We have logged your request and our dispatcher team will call/email you shortly!
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

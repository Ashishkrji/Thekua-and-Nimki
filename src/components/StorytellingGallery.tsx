import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Heart, Eye, X, Flame, Coffee, Compass, RotateCcw, Volume2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Language } from '../types';

interface StorytellingGalleryProps {
  language: Language;
}

interface GalleryItem {
  id: string;
  category: 'moyen' | 'sancha' | 'chulha' | 'sugarcane';
  title: Record<Language, string>;
  caption: Record<Language, string>;
  emotionalStory: Record<Language, string>;
  heritageTip: Record<Language, string>;
  image: string;
  aspectRatio: string;
  traditionalUnit: Record<Language, string>;
  soundEffect: Record<Language, string>;
}

export default function StorytellingGallery({ language }: StorytellingGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'moyen' | 'sancha' | 'chulha' | 'sugarcane'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeSoundSim, setActiveSoundSim] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Immersive authentic photographs and deep emotional commentary
  const items: GalleryItem[] = [
    {
      id: "gal-moyen-ghee",
      category: "moyen",
      title: {
        en: "The Danedar Ghee Moyen Stream",
        hi: "धीमी आंच पर पिघलता दानेदार घी",
        bho: "धीमी आंच पर पिघलत गावे क घी"
      },
      caption: {
        en: "Pouring hand-cooked A2 cow Desi Ghee into freshly milled whole wheat flour.",
        hi: "ताजा पिसे चोकरदार गेंहू के आटे में शुद्ध दानेदार गाय के घी क मेल।",
        bho: "ताजा पिसल गेहूं के आटा में गावे के शुद्ध दानेदार घी क मिलावट।"
      },
      emotionalStory: {
        en: "Before the fire is lit, the flour must be introduced to Ghee. Dadi Maa calls this 'Moyen Bandhna'. Every particle of wheat is rubbed gently between loving palms until the flour carries the texture of damp, fragrant river sand. In modern factories, machines inject palm grease under high heat to force short-crust textures instantly; but in a mother's kitchen, patience cannot be hurried with a button.",
        hi: "इससे पहले कि चूल्हे पर कड़ाही चढ़े, आटे और घी को आपस में मिलाकर 'मोयन बांधना' शुरू होता है। गेहूं के प्रत्येक कण को हथेलियों के बीच प्यार से तब तक रगड़ा जाता है जब तक कि आटा गीली, भीनी नदी की रेत की तरह न महसूस होने लगे। फैक्ट्रियों में मशीनें वनस्पति घी डालकर तुरंत काम खत्म करती हैं, पर माँ के हाथों की इस कला में समय ही सबसे बड़ी औषधि और स्वाद है।",
        bho: "चूल्हा पर कड़ाही चढ़े से पहले, आटा आ घी के मिला के 'मोयन' बांधल जाला। गेहूं के दाना-दाना के हाथ के बीच ओस नियन तबले रगड़ल जाला जबले आटा नदी के गीला बहल बलुआ मिट्टी लेखा न बंधाए। फैक्टरी में त लोग डालडा आ पाम तेल मशीन से ठूंस देवेला, बाकिर माई के रसोई में घी के खुशबू आ हाथ के सनेह ही ठेकुआ के परान बनेला।"
      },
      heritageTip: {
        en: "Traditional measurement: Exactly 'ek-chauthai muba' (one-fourth weight) of Ghee for every weight of heritage wheat.",
        hi: "पारंपरिक माप: गेहूं के आटे के कुल भार का ठीक एक-चौथाई हिस्सा शुद्ध घी मोयन में डाला जाता है।",
        bho: "पुरान देहाती नाप: गेहूं के आटा के कुल तौल क ठीक एक-चौथाई हिस्सा गुनगुना घी मोयन बदे पड़ेला।"
      },
      traditionalUnit: {
        en: "Measurement: 1 Glass Moyen / Seer",
        hi: "पारंपरिक माप: १ अंजलि घी प्रति सेर",
        bho: "माप: १ पौंवा घी / सेर आटा"
      },
      soundEffect: {
        en: "Sizzle & drip of hot, golden clarified butter fat... 🥛",
        hi: "चम्मच से रिसते गरम सोने जैसे घी की सोंधी धार... 🥛",
        bho: "कढ़ाई में खदखदात सुनहरा पिघलल घी क कड़कड़ाहट... 🥛"
      },
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-sancha-wood",
      category: "sancha",
      title: {
        en: "Hand-Carved Shisham Sanchas",
        hi: "परंपरा को उकेरते लकड़ी के सांचे",
        bho: "शीशम के काठ क नक्काशीदार सांचा"
      },
      caption: {
        en: "Generational rosewood and jackwood moulds carrying traditional leaf patterns.",
        hi: "पीढ़ी-दर-पीढ़ी तिजोरी में सहेज कर रखी गई शीशम और कटहल के काठ की नक्काशीदार पट्टियाँ।",
        bho: "पीढ़ी दर पीढ़ी दुलार से सहेजाइल शीशम आ कटहर के सुंदर लकड़ी सांचा।"
      },
      emotionalStory: {
        en: "A real Sancha is a piece of living history. Carved by village carpenters during holy festivals, these rosewood shapes feature the sacred leaf pattern ('Patri') representing Chhath Shanti and environmental gratitude. The thumb forces the round dough patty firmly onto the oily grains of the wood, transferring not just a rustic visual print, but high pressure that packs the crumbs tightly so they don't break in clay fires.",
        hi: "एक असली सांचा इतिहास का एक जीवित टुकड़ा है। गाँव के बढ़इयों द्वारा त्योहारों में ढाले गए इन शीशम के टुकड़ों पर बनी पत्तियों की कला लोक-देवताओं और प्रकृति के प्रति आभार व्यक्त करती है। जब अंगूठे के कोमल दबाव से आटे की लोई को तेल लगे सांचे पर दबाया जाता है, तब न केवल उस सुन्दर पत्ती क आकार उभरता है, बल्कि दबाव के कारण आटे के कण आपस में कस जाते हैं ताकि कड़ाही में जाने पर वे टूटे नहीं।",
        bho: "पवित्र सांचा कौनों साधारण काठ के टुकड़ा ना ह, इ त पुरनिया पुरख लोगन क धरोहर ह। जब दीदी लोगन अंगूठा के प्यार-भरे दबाव से आटा के लोई के सांचा पर दाबेली, त ओह पर छठ मईया क सरसो-पत्ती क आशीर्वाद लहर उभर आवेला। मशीन के रोलर में इ कोमलता अउर सोंध आशीर्वाद कहाँ मिली भला!"
      },
      heritageTip: {
        en: "The wood is oiled only with cold-pressed mustard oil so the dough never sticks to the details.",
        hi: "सांचे को कभी भी पानी से नहीं धोते। केवल शुद्ध कच्चे घानी सरसों तेल से पोछकर इसे पीढ़ियों तक नम रखा जाता है।",
        bho: "सांचा के कभो पानी से ना धोवल जाला, खाली सरसों तेल लगा के सहेजला से इ सऊओं बरिस ले सुरक्षित रहेला।"
      },
      traditionalUnit: {
        en: "Age: 85 Year Old Heritage Jackwood",
        hi: "सांचे की उम्र: करीब ८५ वर्ष पुराना पवित्र शीशम",
        bho: "साँचे क उमिर: ८५ बरिस पुरान परम्परा"
      },
      soundEffect: {
        en: "Soft hollow wood-pressing thuds and hand-claps... 🔨",
        hi: "लकड़ी पर आटा थपथपाने और हाथों से उतारने की गूंज... 🔨",
        bho: "सांचा पर लोई दबावे आ 'भप-भप' हाथ क ताल... 🔨"
      },
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-4/3"
    },
    {
      id: "gal-chulha-clay",
      category: "chulha",
      title: {
        en: "clay Stove Slow Fire Fry",
        hi: "मिट्टी के चूल्हे की धीमी तपिश",
        bho: "माटी के चूल्हा आ कड़ाही क धीमा आंच"
      },
      caption: {
        en: "Frying the hand-moulded biscuits inside dense iron cauldrons on clean wood logs.",
        hi: "आम और नीम के सूखे काष्ठ की धीमी आंच पर लोहे के कड़ाहे में पकता खस्ता स्नैक।",
        bho: "धीमी आंच पर लोहे क भारी कड़ाही में पकत खस्ता ठेकुआ।"
      },
      emotionalStory: {
        en: "An iron cauldron absorbs and distributes thermal radiant warmth far better than uniform steel fryers. Deep inside the village kitchen, the embers of mango branches are constantly adjusted by grandmother's alert eyes. In this process of 'Mithas Khadkad', the snack is fried so gently that moisture evaporates 100% from the core, creating crispy dry boundaries with a tender, wholesome, crumbly heart.",
        hi: "लोहे का एक भारी कड़ाह आधुनिक स्टील के फ्रायर्स की तुलना में तापमान को अधिक समय तक समान मात्रा में बनाए रखता है। सूखी आम की लकड़ियों के सुलगते अंगारों को माँ की अनुभवी आँखें देखती रहती हैं। धीमी आंच में अंदर की सारी नमी बिना तेल अवशोषित किए गायब हो जाती है, जिससे किनारे कुरकुरे और मध्य भाग सोंधे बिस्कुट की भांति टूटते हैं।",
        bho: "लोहा के भारी कड़ाह में तापमान समान रहेला। सुलगल काठ के आंच पर जब ठेकुआ पकके सुनहरा होला, त ओकर हवा-नमी एकदम ख़त्म हो जाला। एही से ठेकुआ बहरी से एकदम कड़ा करारा अउर भीतर से एकदम मुलायम बनेला। कढ़ाई से निकलल गरम ठेकुआ क खुशबू पूरा घर हँसा देवेला।"
      },
      heritageTip: {
        en: "Clay stoves run at low temperatures (around 140°C) to prevent surface burning of sugar/jaggery.",
        hi: "धीमी आंच का नियम: चूल्हे का तापमान कभी तेज नहीं किया जाता, ताकि गुड़ जलकर कड़वा न हो जाए।",
        bho: "आंच क नियम: चूल्हा क आंच तेज कइला से गुड़ जर जाई आ स्वाद तीखा हो जाई, एही से धीमा आंच जरूरी बा।"
      },
      traditionalUnit: {
        en: "Medium: Heavy Hand-forged Kadhai",
        hi: "माध्यम: प्राचीन लोहे की भारी पीतल-तांबा मढ़ी क कढ़ाई",
        bho: "माध्यम: लोहे क भारी हथगड़ कड़ाही"
      },
      soundEffect: {
        en: "Woodfire crackle and deep slow oil bubbly whispers... 🔥",
        hi: "आम की सूखी लकड़ियों की चटक और तेल में धीमी खदखदाहट... 🔥",
        bho: "सुलगत गोइठा-काठ क चरचराहट आ घी में बुलबुलन क खदखद... 🔥"
      },
      image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-4/3"
    },
    {
      id: "gal-sugarcane-stone",
      category: "sugarcane",
      title: {
        en: "The Sugarcane Jaggery Crystals",
        hi: "खेतों का शुद्ध कोल्हू वाला गुड़",
        bho: "खेत क सोंध भेलवा गुड़"
      },
      caption: {
        en: "Freshly squeezed sugarcane juice boiled to caramelized solid blocks of honey-purity.",
        hi: "ताजे गन्ने के रस को घंटों लोहे के बर्तनों में पकाकर तैयार किया गया सोंधा गुड़।",
        bho: "ताजा गन्ने के रस के धीमी आंच पर पका के सोझ भेलवा गुड़।"
      },
      emotionalStory: {
        en: "Refined sugar is sweet, but empty; Jaggery contains the soul of the soil. Sourced from the cooperative sugarcane presses of Saran, our jaggery is unclarified and unchemicalized. Melted down with crushed fennel seeds and dynamic cardamoms in stone pestles, it infuses the whole wheat dough with an earthy, caramellic aroma that lingers in the throat like a sweet rustic hymn.",
        hi: "सफेद चीनी केवल मिठास लाती है पर शरीर के पोषक तत्वों को छीनती है; जबकि गुड़ में मिट्टी की सोंधी खुशबू और ताकत भरी होती है। सारण के खेतों से ताजे गन्ने का जैविक गुड़ लाकर सोंधी चाशनी बनाई जाती है। जब इसमें दरदरा पिसा सौंफ और हरी इलायची का तालमेल मिलता है, तब स्वाद चखते ही बचपन की सर्दियों वाली धूप याद आ जाती है।",
        bho: "सफ़ेद चीनी त खाली बीमारी अउर खोखलापन देवेला, गुड़ में हमनी के माटी के ताकत आ सोंध स्वाद होला। सारण के कोल्हू से सीधे ताज़ा गरम गुड़ ला के पानी में पिघलावल जाला। इलायची आ सौंफ के संगे मिलला पर जवन रसा बनेला, ओकर मिठास सीधे आत्मा तृप्त क देवेली।"
      },
      heritageTip: {
        en: "Pure jaggery is tested for dark transparency and rich organic salinity.",
        hi: "शुद्धता की पहचान: असली गुड़ की पहचान उसका गहरा चॉकलेटी रंग है, जो रासायनिक ब्लीच रहित होने का प्रमाण है।",
        bho: "गुड़ क पहचान: साफ सफ़ेद गुड़ में केमिकल होला, असली गुड़ क रंग गहरा तांबा जइसन करिया-चॉकलेटी होला।"
      },
      traditionalUnit: {
        en: "Sourcing: Organic Saran Sugarcane Presses",
        hi: "स्रोत: बिना किसी सल्फर या केमिकल वाला कोल्हू का शुद्ध गुड़",
        bho: "स्रोत: सारण आ गोपालगंज के सीधे किसान क कोल्हू"
      },
      soundEffect: {
        en: "Thumping clink of traditional heavy stone mortar pestles... 🥣",
        hi: "सिलबट्टे और भारी काले पत्थर के ओखली में इलायची कूटने की सुरीली धप-धप... 🥣",
        bho: "सिलबट्टा आ ओखली में हरी इलायची-सौंफ क कूटेवाली आवाज... 🥣"
      },
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-stone-wheat",
      category: "moyen",
      title: {
        en: "Slow Stone-Milled Whole Wheat",
        hi: "जाते और पत्थर की चक्की का आटा",
        bho: "जांता के धीरे-धीरे पीसल गेहूं"
      },
      caption: {
        en: "Whole grains milled at low revolutions to preserve delicate wheat fibers & nutrition.",
        hi: "कम चक्रों पर चलने वाली पत्थर की चक्की में पिसा चोकरयुक्त गेंहू का पौष्टिक आटा।",
        bho: "कम चक्कर में जांता या चक्की पर पिसावल सोंध चोकरयुक्त आटा।"
      },
      emotionalStory: {
        en: "Industrial mills spin wheat at thousands of revolutions per minute, generating intense friction heat that literally burns off the delicate vitamins and natural oils of the grain. Our whole wheat flour is processed slowly under stone rollers. It retains the golden coarse bran ('Chokar'), providing that coarse crumbly texture essential for authentic Sancha Thekua and porous spiced Nimki.",
        hi: "मशीनी मिलों में गेंहू इतनी तेज रफ्तार में घूमता है कि घर्षण की गर्मी से गेहूं के प्राकृतिक विटामिन्स और तेल जल जाते हैं। माटी के चोकरदार आटे को ठंडी पत्थर की चक्की में हौले-हौले पीसा जाता है। इसके कण थोड़े दरदरे होते हैं, जिससे हमारे निमकी और पारंपरिक कोल्हापुरी मीठे ठेकुए को बिस्कुट जैसा खस्तापन प्राप्त होता है।",
        bho: "बड़-बड़ मिल में गेहूं अतना तेज पीसेला की ओकर सारा ताकत आ सोंधापन जर के भस्म हो जाला। हमनी के धीरे-धीरे पिसल चोकरयुक्त दरदरा आटा क प्रयोग करीला, जेकरा से ठेकुआ आ परतदार नुनछुर निमकी एकदम कुरकुरी आ चबावे लायक बनेला।"
      },
      heritageTip: {
        en: "Bran ('Chokar') is never sifted out. It is the secret to digestion and crisp crumbly texture.",
        hi: "चोकर का नियम: आटे को कपड़े से छानकर चोकर को फेंका नहीं जाता, वह स्वाद और पेट की वायु-शांति के लिए श्रेष्ठ है।",
        bho: "चोकर क वरदान: चोकर फ्याँकल ना जाला, इ त पेट सवसे नीक राखेला आ खस्तापन बढ़ावेला।"
      },
      traditionalUnit: {
        en: "Mill Speed: Slow Hand Revs (-120 RPM)",
        hi: "चक्की की चाल: कम चक्कर प्रति मिनट ताकि आटे में ठंडक बनी रहे",
        bho: "चक्की क चाल: धीमा कढ़ाई चाल जाता क पिसान"
      },
      soundEffect: {
        en: "Rhythmic grating sound of traditional stone grinding wheels... ⚙️",
        hi: "भारी देहाती पत्थर के जाते की सुरीली और थकावट हरने वाली धीमी घिस-घिस... ⚙️",
        bho: "जांता क सुरीली भारी पत्थर क गोल घूमवाली आवाज 'घरर-घरर'... ⚙️"
      },
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-square"
    },
    {
      id: "gal-hearth-love",
      category: "chulha",
      title: {
        en: "Dadi Maa’s Vigilant Hearth Supervision",
        hi: "दादी माँ का अनुभव और स्नेह स्पर्श",
        bho: "दादी माई क ममता भरा अशीष"
      },
      caption: {
        en: "Mothers monitoring color changes from golden blonde to deep terracotta brown.",
        hi: "बदले जा रहे रंगों को ध्यानपूर्वक देखतीं गाँव की अनुभवी माताएँ और दीदी लोग।",
        bho: "सुनहरा से लाल तांबा नियन रंग बदले तक ठेकुआ के निगरानी करत दीदी लोग।"
      },
      emotionalStory: {
        en: "A recipe is merely letters printed on paper; the true secret lies in the dynamic gaze of a mother's eyes. Knowing exactly when a batch of jaggery-kneaded items has reached that precise state of 'Browning' is a knowledge passed down from mothers to daughters. It requires understanding the season's humidity, the dryness of wood branches, and the sound of frying bubbles. No computer or digital temperature gun can replicate this lifetime of love.",
        hi: "रेसिपी तो केवल कागज के पन्नों पर लिखी बातें हैं; असली जादू तो माँ की आँखों की सजगता में होता है। यह जानना कि गुड़ का ठेकुआ कड़ाही से कब बाहर निकालना है, वह कला है जो माताएँ अपनी बेटियों को सौंपती हैं। इसके लिए हवा की नमी, आम की सूखी लकड़ियों की आंच और घी के झाग की सघनता को समझना होता है। कोई थर्मल गन इसका मुकाबला नहीं कर सकती।",
        bho: "रेसिपी त खाली पन्ना पर लिखल अक्षर ह, स्वाद त माई के हाथ क हुनर आ अनुभव से आवेला। कढ़ाई में ठेकुआ कब सुनहरा तांबा नियन लाल हो गइल बा अउर ओकरा कब निकाले क बा, इ खाली गाँव क दीदी लोगन के आँखे जान सकेला। मशीन क कौनों डिजिटल सेंसर इ दुलार ना महसूस करवा सके!"
      },
      heritageTip: {
        en: "Frying stops when the center is still soft; the heat trapped inside cooks it to perfection as it cools down.",
        hi: "चूल्हे का रस: कड़ाही से निकलते समय ठेकुआ थोड़ा मुलायम रहता है, पर बाहर की हवा में ठंडा होने पर वह एकदम खस्ता और कड़ा हो जाता है।",
        bho: "गुरुमंत्र: कढ़ाई से निकलते घरी ठेकुआ थोड़ मुलायम रहेला, हवे में ठंडा भेला पर उ असली खस्ता आ कड़क बनेला।"
      },
      traditionalUnit: {
        en: "Batch Timing: Checked by Bubble Dense Sound",
        hi: "बैच का निर्णय: घी के बुलबुलों की शांत आवाज से पकने का अनुमान",
        bho: "निर्णय: बुलबुल क आवाज़ मंद होइला पर बैच क तैयारी"
      },
      soundEffect: {
        en: "Rhythmic clatters of iron strainers on vessel edges... 🥄",
        hi: "कढ़ाई के किनारे से टकराकर छन-छन तेल छानते पीतल के कलछुल की खनक... 🥄",
        bho: "छनउटा क कड़ाही क कोना से लगके खनखनात शुद्ध तेल चुहावे क आवाज़... 🥄"
      },
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
      aspectRatio: "aspect-4/3"
    }
  ];

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(x => x !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const playSynthesizedSound = (item: GalleryItem) => {
    setActiveSoundSim(item.id);
    // Auto turn off ambient sound visualizer after 3 seconds
    setTimeout(() => {
      setActiveSoundSim(null);
    }, 4500);
  };

  return (
    <section id="storytelling-gallery-section" className="py-20 bg-[#FAF6EE] relative z-20 border-b border-[#EADCC6] overflow-hidden">
      
      {/* Terracotta Clay Header Edge Pattern divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,5 L10,0 L20,5 Z\" fill=\"%233F2E1E\"/></svg>')" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Gallery Title display using dynamic scroll reveals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] flex items-center justify-center gap-1.5 bg-amber-500/5 px-4 py-1.5 rounded-full border border-amber-500/10 w-fit mx-auto font-mono">
            <Camera className="w-4 h-4 text-[#B45309]" />
            {language === 'en' ? 'Maa ka Khazana • Live Archives' : language === 'hi' ? 'माँ का खजाना • सजीव चित्रशाला' : 'मईया के ख़ज़ाना • जियत तिजोरी'}
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#3F2E1E] leading-tight tracking-tight">
            {language === 'en' ? 'Living Photographic Kitchen Archives' : language === 'hi' ? 'गाँव की हस्तनिर्मित शुद्धता की चित्रशाला' : 'माई के हाथ क सोंध तैयारी क झाँकी'}
          </h2>

          <div className="w-16 h-1 bg-[#B45309] mx-auto rounded" />

          <p className="text-xs sm:text-sm text-[#857252] font-semibold max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Step into a world of woodfires, ancient stones, pure Ghee rivers and patient hands. Click any window below to read deep, heartfelt process stories and experience the ambient sounds of Dadi Maa’s kitchen.'
              : language === 'hi'
              ? 'चूल्हे की आग, दादी माँ के सांचों, शुद्ध घी के मोयन और सिलबट्टे की कुटी इलायची की पवित्रता को नज़दीक से देखें। चित्र पर क्लिक करके उसकी पवित्र ऐतिहासिक कथा पढ़ें।'
              : 'चूल्हा क आंच, पुराना सांचा क दाब, आ जाता क सोंध पिसान। आँखि क सोझा देखीं कइसे तैयार होला रउआ शुद्ध ठेकुआ आ नुनछुर निमकी। कथा पढ़े बदे चित्र पर दबाईं।'}
          </p>
        </motion.div>

        {/* CUSTOM INTERACTIVE CATEGORY TABS FILTERS */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#857252] font-semibold font-mono uppercase bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{language === 'en' ? 'Filter by method' : 'तैयारी क तरीक़ा'}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl bg-[#F1EAD9]/40 p-1.5 rounded-2xl border border-[#EADCC6]">
            {[
              { id: 'all', label: { en: 'All Steps', hi: 'सभी तस्वीरें', bho: 'सभ चित्र' } },
              { id: 'moyen', label: { en: 'Dough & Ghee', hi: 'गेहूं और घी मोयन', bho: 'आटा-घी मोयन' } },
              { id: 'sancha', label: { en: 'Wood Moulds', hi: 'शीशम का सांचा', bho: 'काठ क साँचा' } },
              { id: 'chulha', label: { en: 'Clay Hearth Fry', hi: 'धीमी आंच क कढ़ाई', bho: 'कढ़ाई आ चूल्हा' } },
              { id: 'sugarcane', label: { en: 'Pure Jaggery', hi: 'कोल्हू का गुड़', bho: 'सोंध देहाती गुड़' } },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-serif font-black transition-all cursor-pointer focus:outline-none ${
                  filter === tab.id
                    ? 'bg-[#3F2E1E] text-[#FAF6EE] shadow-md border border-[#3F2E1E]'
                    : 'bg-transparent text-[#5C4D3C] hover:bg-[#FAF6EE]/75 hover:text-[#3F2E1E]'
                }`}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* BRIGHT RUSTIC MASONRY/GRID WITH MOTION SCROLL REVEALS */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isFav = favorites.includes(item.id);
              const isSimulating = activeSoundSim === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#FBF9F4] p-4.5 rounded-3xl border border-[#EADCC6] shadow-sm hover:shadow-xl hover:border-[#B45309]/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  
                  {/* Image Frame styled like a nostalgic rustic polaroid */}
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-[#EADCC6]/80 bg-stone-100 mb-4 group-hover:shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title[language]}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient on bottom overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent h-1/2 p-3 flex items-end" />
                    
                    {/* Category pill indicator */}
                    <span className="absolute top-3 left-3 bg-[#3F2E1E] text-[#FAF6EE] text-[9px] font-mono uppercase tracking-widest font-black px-2.5 py-1 rounded-full border border-amber-300">
                      Step {item.category.toUpperCase()}
                    </span>

                    {/* Quick Heart Love count button */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-rose-600 shadow flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 focus:outline-none border border-stone-200"
                      title="Show support for this traditional process"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 animate-ping-once' : 'text-stone-400'}`} />
                    </button>

                    {/* Hover Inspect tag */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <div className="bg-[#FAF6EE] text-[#3F2E1E] px-4 py-2 rounded-xl text-xs font-serif font-black shadow flex items-center gap-1.5 scale-90 group-hover:scale-100 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>{language === 'en' ? 'Inspect Recipe Archive' : 'पवित्र गाथा विस्तार से'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Informational Card details */}
                  <div className="space-y-3.5 px-1 relative z-10">
                    
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase text-[#B45309] tracking-wider">
                        {item.traditionalUnit[language]}
                      </span>
                      {isFav && (
                        <span className="text-[9px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 flex items-center gap-1">
                          ♥ {language === 'en' ? 'Loved' : 'पसंदीदा'}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-serif font-black text-[#3F2E1E] group-hover:text-[#B45309] transition-colors leading-tight">
                        {item.title[language]}
                      </h3>
                      <p className="text-xs text-[#5C4D3C] font-semibold line-clamp-2 leading-relaxed">
                        {item.caption[language]}
                      </p>
                    </div>

                    {/* Terracotta sound widget simulation */}
                    <div 
                      className="bg-[#FAF6EE] p-2.5 rounded-xl border border-[#EADCC6]/80 flex items-center justify-between text-[11px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSynthesizedSound(item);
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[#5C4D3C] font-semibold">
                        <Volume2 className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                        <span className="line-clamp-1">{language === 'en' ? 'Listen to Kitchen Sound' : 'रसोई क पवित्र आवाज़'}</span>
                      </div>
                      <span className="text-[9px] text-[#B45309] font-mono font-black uppercase tracking-wider">
                        {isSimulating ? '🔊 Playing' : '▶ Listen'}
                      </span>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* DYNAMIC AMBIENT SOUND TEXT VISUALIZER */}
        <AnimatePresence>
          {activeSoundSim && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="fixed bottom-24 left-6 z-40 bg-[#3F2E1E] text-[#FAF6EE] border-2 border-amber-400 p-4 rounded-2xl shadow-2xl max-w-xs font-serif"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Atmosphere Sound Synthesizer
                </span>
              </div>
              <p className="text-xs leading-relaxed italic">
                "{items.find(x => x.id === activeSoundSim)?.soundEffect[language]}"
              </p>
              <div className="flex gap-0.5 items-end justify-center mt-3 h-5">
                {[0.8, 0.4, 0.9, 0.2, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 20}px`, `${(1 - h) * 20}px`, `${h * 20}px`] }}
                    transition={{ duration: 1 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 bg-[#B45309] rounded-t"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXQUISITE DETAILS MODAL / LIGHTBOX OVERLAY */}
        <AnimatePresence>
          {selectedItem && (
            <div id="recipe-gallery-lightbox" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-[#FAF6EE] max-w-4xl w-full rounded-3xl border-2 border-[#EADCC6] overflow-hidden shadow-2xl relative z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
              >
                
                {/* Close absolute button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 bg-stone-900/40 text-white hover:bg-[#3F2E1E] rounded-full flex items-center justify-center focus:outline-none border border-white/20 hover:text-amber-400 transition-colors shadow cursor-pointer"
                  title="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left image display column */}
                <div className="lg:col-span-6 relative bg-stone-950 flex items-center justify-center aspect-golden overflow-hidden group">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title[language]}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent h-2/3 flex items-end p-6" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 left-6 text-white space-y-1 text-left">
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-black">
                      {selectedItem.traditionalUnit[language]}
                    </span>
                    <h4 className="text-xl font-serif font-black text-white">{selectedItem.title[language]}</h4>
                    <p className="text-xs text-stone-300 leading-normal font-medium max-w-sm">
                      {selectedItem.caption[language]}
                    </p>
                  </div>
                </div>

                {/* Right text details and grandmother recipe column */}
                <div className="lg:col-span-6 p-6 sm:p-8 overflow-y-auto max-h-[50vh] lg:max-h-[90vh] space-y-6 flex flex-col justify-between">
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-black text-[#B45309]">
                        Traditional Secret Archives • Page {selectedItem.id.replace('gal-', '').toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E] leading-tight">
                      {selectedItem.title[language]}
                    </h3>

                    {/* Purity check indicator */}
                    <div className="py-2.5 px-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-xs text-emerald-800 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{language === 'en' ? 'Purity Standard Confirmed. Preserving 5 Generations.' : '५ पीढ़ियों की अटूट शुद्धता और स्वाद का प्रमाणीकरण।'}</span>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#857252]">The Heritage Story:</h4>
                      <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed font-semibold">
                        {selectedItem.emotionalStory[language]}
                      </p>
                    </div>

                    {/* Terracotta quotation notes */}
                    <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#EADCC6] relative space-y-1.5 text-left">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#B45309] block">
                        💡 Grandma’s Heritage Tip
                      </span>
                      <p className="text-xs italic text-[#3F2E1E] leading-normal">
                        "{selectedItem.heritageTip[language]}"
                      </p>
                    </div>

                    {/* Physical Atmosphere triggers */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#857252]">Kitchen Atmosphere Clues:</h4>
                      <div className="p-3 bg-white border border-[#EADCC6]/60 rounded-xl flex items-center justify-between text-xs font-medium">
                        <span className="text-[#5C4D3C] italic text-[11px]">
                          "{selectedItem.soundEffect[language]}"
                        </span>
                        <button
                          onClick={() => playSynthesizedSound(selectedItem)}
                          className="px-2.5 py-1 text-[10px] uppercase font-bold bg-[#B45309] hover:bg-neutral-800 text-white rounded shadow cursor-pointer focus:outline-none"
                        >
                          🔊 {language === 'en' ? 'Replay Sound' : 'फिर सुनें'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-6 border-t border-[#EADCC6]/40 flex gap-3">
                    <button
                      onClick={() => {
                        const favStatus = favorites.includes(selectedItem.id);
                        if (favStatus) {
                          setFavorites(favorites.filter(x => x !== selectedItem.id));
                        } else {
                          setFavorites([...favorites, selectedItem.id]);
                        }
                      }}
                      className="flex-1 py-3 border-2 border-[#B45309] hover:bg-[#B45309]/5 rounded-xl text-xs font-bold text-[#B45309] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer focus:outline-none transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(selectedItem.id) ? 'fill-[#B45309]' : ''}`} />
                      <span>{favorites.includes(selectedItem.id) ? (language === 'en' ? 'Saved' : 'पसंदीदा जोड़ा') : (language === 'en' ? 'Show Love' : 'पसंद करें')}</span>
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 py-3 bg-[#3F2E1E] hover:bg-[#251A0F] text-[#FAF6EE] rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer focus:outline-none transition-colors"
                    >
                      {language === 'en' ? 'Return to Kitchen' : 'रसोई में लौटें'}
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Award, Flame, Leaf, Sparkles, Heart, ChefHat, BookOpen, Utensils, CheckCircle } from 'lucide-react';
import { Product, Language } from '../types';

interface RecipeModalProps {
  product: Product;
  language: Language;
  onClose: () => void;
}

interface HeritageRecipe {
  prepTime: string;
  cookTime: string;
  serves: Record<Language, string>;
  difficulty: Record<Language, string>;
  historyTitle: Record<Language, string>;
  history: Record<Language, string>;
  ingredientsTitle: Record<Language, string>;
  ingredientsList: Record<Language, string[]>;
  stepsTitle: Record<Language, string>;
  steps: Record<Language, { title: string; desc: string }[]>;
  grandmaSecretTitle: Record<Language, string>;
  grandmaSecret: Record<Language, string>;
}

const RECIPE_DATA: Record<string, HeritageRecipe> = {
  'gur-thekua': {
    prepTime: '25 Mins',
    cookTime: '30 Mins',
    serves: {
      en: '10-12 Pieces',
      hi: '१०-१२ नक ठेकुआ',
      bho: '१०-१२ गो ठेकुआ'
    },
    difficulty: {
      en: 'Heritage / Traditional',
      hi: 'पारंपरिक (मध्यम कठिन)',
      bho: 'पारंपरिक (प्रेम अउर धैर्य)'
    },
    historyTitle: {
      en: 'The primeval Chhath Prasad roots',
      hi: 'छठ महाव्रत एवं वैदिक अपूप की गाथा',
      bho: 'छठ मईया क महाप्रसाद क महिमा'
    },
    history: {
      en: 'Dating back to the Vedic periods where honey and grain cakes called "Apupa" were first mentioned for worship, the Gur & Saunf Thekua is the ultimate spiritual soul food of Bihar and Jharkhand. Cooked over clay fire hearths (Mitti ka Chulha) only using Mango wood and hand-carved wooden blocks (Sanchas), this pure sweet contains zero white sugar or chemical preservatives. It represents environmental gratitude and complete devotion, honoring the morning sun during nature-connected harvesting cycles.',
      hi: 'वैदिक काल के ग्रन्थों में वर्णित "अपूप" (यव और खांड से बने पावन लड्डू) का आधुनिक और सजीव रूप है हमारा ठेकुआ। यह केवल मीठा व्यंजन नहीं, बल्कि बिहार, पूर्वांचल और झारखंड की सांस्कृतिक चेतना का प्रतीक है। छठ महापर्व के दौरान इसे अत्यंत शुचिता से आम की सूखी लकड़ियों की आंच पर पकाया जाता है। हाथ से नक्काशीदार लकड़ी के सांचे पर दबाकर उकेरी गई इस पत्ती का अर्थ प्रकृति के प्रति समर्पण और कृतज्ञता प्रकट करना है।',
      bho: 'वैदिक जुग में जवना "अपूप" क पूजा खातिर वर्णन बा, उहे आजु हमनी क पावन ठेकुआ ह। छठ मईया के महाप्रसाद बदे इ सबसे पवित्र भोग मानल जाला। माटी के चूल्हा आ आम क सूखी काठ पर गंगाजल आ आदर क संगे सजल रसोई में बनल गुड़-सौंफ क ठेकुआ खाली मिठास ना, इ त माटी क सोंध परान ह। सांचा पर हाथ से पड़ल पत्ती क छाप साक्षात् प्रकृति माई क अशीष ह।'
    },
    ingredientsTitle: {
      en: 'Grandma’s Sourced Ingredients',
      hi: 'दादी जी की शुद्ध सामग्री',
      bho: 'दादी माई के पवित्र सामग्री'
    },
    ingredientsList: {
      en: [
        '300g Coarse Stone-Milled Whole Wheat Flour',
        '100g Pure Jaggery (Saran cooperative Gur)',
        '3 tbsp Warm A2 Cow Desi Ghee (Moyen)',
        '1.5 tbsp Fresh Green Fennel Seeds (Saunf)',
        '1/2 cup Pure clay-filtered Water (add slowly)',
        'Cold-pressed Mustard Oil or Ghee for shallow fire fry'
      ],
      hi: [
        '३०० ग्राम हाथ की पत्थर वाली चक्की का दरदरा चोकरयुक्त गेंहू का आटा',
        '१०० ग्राम सारण के खेतों क बिना केमिकल वाला शुद्ध लाल कोल्हू का गुड़',
        '३ बड़ी चम्मच शुद्ध गाय का गुनगुना दानेदार घी (मोयन के लिए)',
        '१.५ बड़ी चम्मच ताज़ी मोटी हरी सौंफ',
        'आधा कप शुद्ध कुएं या फिल्टर का पानी (गूंधने के लिए)',
        'धीमी आंच क कढ़ाई में तलने के लिए घी या कच्ची घानी सरसों का तेल'
      ],
      bho: [
        '३०० ग्राम जांता या चक्की के पिसल चोकरदार दरदरा गेहूं क आटा',
        '१०० ग्राम सारण क सोंध लाल भेलवा गुड़',
        '३ चम्मच गाय क सुगन्धित गुनगुना घी (मोयन बदे)',
        '१.५ चम्मच दरदरा कुचलल हरी मोटी सौंफ',
        'आधा कप साफ़ पानी (मात्रा अनुसार धीरे-धीरे)',
        'लोहा के कड़ाई में तलेले बदे शुद्ध घी चाहे सरसों तेल'
      ]
    },
    stepsTitle: {
      en: 'The 4-Step Handcrafting Sequence',
      hi: 'हस्तनिर्मित बनाने की शास्त्रीय विधि',
      bho: 'हाथ से बनावे क सुन्दर रीती'
    },
    steps: {
      en: [
        { title: 'The Sacred Moyen Rub', desc: 'Mix whole wheat flour and fennel in a clean bronze vessel. Warm the Ghee and pour it over. Rub the flour gently but firmly between your palms for 10 minutes until it feels like damp river-sand and binds into a single clean ball when squeezed.' },
        { title: 'The Cold Jaggery Melt', desc: 'Melt the organic jaggery in warm water. Filter any organic residue. Let the syrup cool to room temperature. Remember, we need a extremely stiff, dry dough, so add syrup in drops. Never over-knead; the dough should just barely hold together.' },
        { title: 'The Wood Sancha Press', desc: 'Dampen the aged rosewood wooden sancha with a drop of ghee. Break a small lime-sized patty of the stiff crumbs, roll briefly, and place it at the center of the leaf design. Press firmly with your thumb till the borders crack and the leaf veins imprint.' },
        { title: 'The Slow Cauldron Bath', desc: 'Heat pure oil in a deep heavy-gauge iron cauldron on low fire. Slide the raw cookies gently. Fry with supreme patience for about 12-15 minutes on low temperature (never high, or the jaggery will burn). Cool on a wicker basket.' }
      ],
      hi: [
        { title: 'पवित्र मोयन घिसाई', desc: 'काँसे या पीतल के चौड़े थाल (परात) में आटा और सौंफ डालें। अब गुनगुने घी को आटे पर छिड़कें। दोनों हथेलियों के बीच आटे को तब तक प्यार से रगड़ें जब तक कि आटे का कण-कण घी को सोख न ले और रेत जैसा महसूस होने लगे।' },
        { title: 'गुड़ की शीतल चाशनी', desc: 'गुनगुने पानी में गुड़ को घोलकर छान लें ताकि कोई अशुद्धि न रहे। इस चाशनी को ठंडा करें। अब बहुत कम पानी छिड़कते हुए आटे को कठोर बांधना शुरू करें। ध्यान रहे, ठेकुआ के आटे को गूंथा नहीं जाता, बस आपस में इकट्ठा कर के एक किया जाता है।' },
        { title: 'शीशम सांचे पर दबाव', desc: 'लकड़ी के सांचे (सांचा) पर हल्का सा सरसों तेल लगा लें। आटे की छोटी सी लोई बनाकर सांचे के मध्य में रखें। अपने अंगूठे के भारी दबाव से उसे दबाएं ताकि किनारे थोड़े फट जाएं और पावन पत्ती क पवित्र डिज़ाइन पूरी तरह छप जाए।' },
        { title: 'धीमी आंच क कढ़ाई तपस्या', desc: 'लोहे की भारी कड़ाही में घी या तेल गरम करें। आंच को एकदम मंद कर दें। ठेकुआ को कड़ाही में धीरे से छोड़ें और १२-१५ मिनट तक गहरी तसल्ली के साथ सुनहरा लाल ताँबे जैसा रंग आने तक पकाएं। बाहर निकाल कर बांस के सूप पर सुखाएं।' }
      ],
      bho: [
        { title: 'मोयन क मिलाव', desc: 'बड़ परात में आटा आ सौंफ मिलाईं। सुगन्धित घी के डालके दुनो हथेली से आटा के खूब रगड़ीं जबले आटा मुठिया बांधला पर गीला बलुआ माटी लेखा ना हो जाए।' },
        { title: 'शीतल गुड़ क सिरा', desc: 'गुड़ के पानी में घोल के छान लीं। पानी दम धीरे-धीरे छिड़क के आटा के खाली जोड़ीं (गूंथे के नइखे)। आटा दम सख्त आ दरदरा रहे के चाहीं।' },
        { title: 'साँचा पर लोई क दाब', desc: 'काठ के सांचा पर तनी सा घी लगा के लोई राखीं आ अंगूठा से जोर से दबाईं। जब कोना तनी फटी आ पत्ती क बेल-बूटा उघड़ आई त सम्झम की ठीक बा।' },
        { title: 'कढ़ाई में मंद आंच छनाई', desc: 'कड़ाही में तेल दम मध्यम गरम करीं। आंच एक बेर धीमा कइला पर ठेकुआ डालीं अउर बिना हड़बड़ाहट के १५ मिनट ले सोने नियन रंग होखे तक धीमे-धीमे पकाईं।' }
      ]
    },
    grandmaSecretTitle: {
      en: "Grandma’s Magical Advice",
      hi: "दादी माँ का गुप्त नुस्खा",
      bho: "दादी माई क गुर मंत्र"
    },
    grandmaSecret: {
      en: "Beta, do not dissolve the jaggery completely! Let fine whole crystals of jaggery remain in the dough. When the Thekua enters the hot clay-stove oil pot, these jaggery granules melt and bubble near the surface, creating gorgeous dark caramel blisters and a sweet crunchy honeycomb edge that is the sign of a true rural master chef.",
      hi: "बेटा, गुड़ को पानी में पूरी तरह मत पिघलाओ! आटे में थोड़े बारीक गुड़ के दाने रहने दो। जब ठेकुआ घी की कड़ाही में मंद आंच पर धीरे-धीरे पकेगा, तब ये गुड़ के दाने पिघल कर सतह पर आएंगे और गहरे कत्थई रंग के कुरकुरे शीशे जैसे कैरामेल पॉकेट्स बनाएंगे, जो असली सोंधेपन की असली पहचान है।",
      bho: "बाबू, गुड़ के जलवा में सउसे मत घोला! थोड़ गुड़ क कतरन आटा में दरदरा बचल रहे के चाहीं। जब ठेकुआ कड़ाही में जाई, त उ गुड़ क छोटा कतरन घी में पिघल के सतह पर कत्थई लाल कैरामेल के दानेदार छाँह बनाई, जवने से खइला पर असली मिठास क धमाका होइ!"
    }
  },
  'desi-ghee-thekua': {
    prepTime: '20 Mins',
    cookTime: '25 Mins',
    serves: {
      en: '8-10 Pieces',
      hi: '८-१० उत्तम ठेकुए',
      bho: '८-१० गो खस्ता ठेकुआ'
    },
    difficulty: {
      en: 'A2 Royal / Indulgent',
      hi: 'राजशाही (अत्यधिक खस्ता)',
      bho: 'सोना खस्ता (संयम आ दुलार)'
    },
    historyTitle: {
      en: 'The Golden Sugaat for loved ones',
      hi: 'ससुराल जाने वाली बिटिया की पावन सौगात',
      bho: 'बिटिया के कोछा क सोंध सुगात'
    },
    history: {
      en: 'In the agricultural heartland of Bihar, when a married daughter leaves for her home after festivals, the mothers pack heavy brass tins with Desi Ghee Thekuas sweetened with pure sugar and scented with ground green cardamom. Called "Khonicha" or "Sugaat", this heavy, ghee-infused snack represents parent’s abundance, ensuring traveling family members never go hungry, and carries the dry, sweet fragrance of parental threshold across rivers and plains.',
      hi: 'लोक परंपरा के अनुसार, जब विवाहित बेटियां त्योहार मनाकर ससुराल लौटती हैं, तो बिदाई के समय माताएं पीतल के डब्बों में गाय के शुद्ध घी से बने खस्ता ठेकुए भरकर सौंपती हैं, जिसे "खोंइछा भरना" या "सौगात" कहा जाता है। यह स्नेह और आदर का प्रतीक है। शुद्ध काजू, नारियल और हरी इलायची के मिश्रण से घी का यह खस्ता ठेकुआ पीढ़ियों के स्नेह की सुगंध को दूर गावों तक पहुँचाता है।',
      bho: 'जब दीदी-बहिन लोगन छठ मनावत गाँव आवत बाड़ी आ फीर बिदा होय लागेली, त कोइछा में माई रोवत-गावत पीतल के डिब्बा में सुगन्धित घी क ठेकुआ बांध के देवेली। एकरा के सुगात कहल जाला। इ ठेकुआ क सुगन्ध ससुराल में भी माई के घर क नेह जगावेला। एही से एकरा में कभो पाम तेल आ सफ़ेद वनस्पति क मिलावट ना कइल जाला।'
    },
    ingredientsTitle: {
      en: 'Royal Sovereign Ingredients',
      hi: 'शाही राजसी व्यंजन सामग्री',
      bho: 'राजसी ठाठ क सामग्री'
    },
    ingredientsList: {
      en: [
        '250g Single-Origin MP Sharbati Wheat Flour',
        '80g Organic Sulphur-free White Sugar Crystals',
        '5 tbsp Pure Golden A2 Desi Cow Ghee (Rich Moyen)',
        '1 tsp Ancient Mortar-Crushed Cardamom Pods (Elaichi)',
        '3 tbsp Dry Grated Sun-dried Coconut Chips (Gari)',
        'Warm water for limited dusting'
      ],
      hi: [
        '२५० ग्राम प्रीमियम सिंगल-ओरिजिन एमपी शरबती गेंहू का महीन आटा',
        '८० ग्राम ऑर्गेनिक सल्फर-रहित चीनी क बूरा या देशी खांड',
        '५ बड़ी चम्मच शुद्ध पिघला हुआ गाय का पीला ए२ घी (गर्म मोयन)',
        '१ छोटी चम्मच ताज़ा खरल में कुटी इलायची का दरदरा पाउडर',
        '३ बड़ी चम्मच कद्दूकस किया हुआ सूखा गोला (नारियल क लच्छे)',
        'आटा संभालने के लिए हल्का सा गुनगुना जल'
      ],
      bho: [
        '२५० ग्राम एकदम बढ़िया गेंहू क दरदरा मैदा-मिश्रित आटा',
        '८० ग्राम देसी सल्फर-बिना के चीनी चाहे बूरा',
        '५ गो भरल चम्मच गाय क पीला दानेदार ए२ घी',
        '१ चम्मच सिलबट्टा पर कुचलल ताज़ा हरी इलायची दाना',
        '३ चम्मच सुखल नारियल क महीन कतरन',
        'हल्का गुनगुना पानी'
      ]
    },
    stepsTitle: {
      en: 'The Golden Flakiness Ritual',
      hi: 'घी के प्रचुर मोयन की ढलाई',
      bho: 'शुद्ध घी के मोयन ढलाई'
    },
    steps: {
      en: [
        { title: 'The Ghee Ocean Rub', desc: 'Place flour in a large brass platter. Heat A2 Ghee separately. Pour the deep yellow gold onto the flour. Gently knead with fingers until the Ghee fuses beautifully. If you press a spoonful, it must hold its shape like wet snow.' },
        { title: 'The Sugar Syrup Splash', desc: 'Dissolve sugar crystals in lukewarm water to create a heavy syrup, or combine directly to get a crunchy sugar crust. Toss coconut chips and crushed cardamom in. Add the sweet water drop by drop, drawing dry crumbs together.' },
        { title: 'The Sancha Carving Press', desc: 'Shape the crumbly dough into thick oval blocks. Butter the leaf sancha with ghee. Place the block on the design and apply strong equal pressure with your palms. Keep the patty thick, about half an inch, to preserve moisture.' },
        { title: 'The Royal Ghee Fry', desc: 'Slow-fry the hand-molded cookies in clean Desi Ghee under a medium-low flame. Gently turn once or twice using an iron flat spoon. Frying can take up to 10 minutes per batch until the surface turns into light golden saffron-brass.' }
      ],
      hi: [
        { title: 'घी का प्रचुर मोयन', desc: 'थाली में आटा लें। शुद्ध गाय के ए२ घी को हल्का गर्म करें और उसे सूखी सामग्री पर फैलाएं। धीरे-धीरे उंगलियों से मिलाएं। जब आप आटे को मुट्ठी में बांधें, तो वह बिना टूटे मुलायम लड्डू जैसा आकार ग्रहण करना चाहिए।' },
        { title: 'इलायची व नारियल मिलाव', desc: 'चीनी को गुनगुने पानी में घोलकर गाढ़ी चाशनी बनाएं, या दानेदार स्वाद के लिए सीधे मिलाएं। नारियल के लच्छे तथा दरदरी इलायची डालें। बहुत हल्का सा पानी उपयोग करके आटे के चूरे को बस आपस में चिपकाएं।' },
        { title: 'शाही मोटाई की ढलाई', desc: 'लोइयों को अंडाकार रूप दें। शीशम के सांचे पर देशी घी लगाएं। मध्य में लोई रखकर अपनी हथेली से एकसमान दबाव डालें। ठेकुए को कम से कम आधा इंच मोटा रखें ताकि पकते समय भीतर से मखमली कोमलता बनी रहे।' },
        { title: 'स्वर्ण कढ़ाई स्नान', desc: 'कड़ाही में शुद्ध देशी घी गर्म करें और आंच मध्यम-धीमी रखें। बहुत सावधानी से एक-एक करके कच्ची लोइयां डालें। चिमटे या समतल कलछुल से धीरे से पलटें। जब रंग सुनहरे केसरिया-तांबे जैसा हो जाए, तब निकालें।' }
      ],
      bho: [
        { title: 'घी क भारी मोयन', desc: 'कनवा में आटा लीं। घी के तनी गरम क के आटा पर बिखेरीं। दुनो हाथ से दुलार से खूब रगड़ीं जबले कि आटा में घी क सुगंध रच-बस ना जाए।' },
        { title: 'मिठास आ नारियल मेल', desc: 'चीनी के सिरा बना के चाहे सीधे डालके इलायची आ गरी क महीन कतरन मिलाईं। हल्का पानी छिड़क के आटा के बस जोड़ लीं। गूंथे के नइखे।' },
        { title: 'साँचा पर मोटाई दबाव', desc: 'लोई के गोल या लम्बा गढ़ा बनाईं। साँचा पर तनी घी लगा के हथेली से समान बल लगा के दबाईं। मोटाई आधा इंच क आसपास रखे के चाहीं।' },
        { title: 'धीमे आँच में घी-स्नान', desc: 'कड़ाही में शुद्ध घी गरम करीं। आंच एक दम धीमा राख के ठेकुआ के तलीं। जब रंग सुन्दर ताँबा नियन लाल होखे लागे त प्यार से छनउटा से छान लीं।' }
      ]
    },
    grandmaSecretTitle: {
      en: "The Secret of Moyen Hand Check",
      hi: "दादी माँ का स्वर्ण सूत्र",
      bho: "दादी माई क अचूक मंत्र"
    },
    grandmaSecret: {
      en: "Listen carefully, Beta. Do code the Moyen properly! If you squeeze a fistful of dry oiled flour and it breaks or drops crumbs like dry dust, your Thekua will split open when frying. Add one more spoon of warm Ghee, rub again. Ghee is the parent of flakiness; water only makes the cookie tough. Never use a rolling pin or high heat!",
      hi: "सुनो बेटा, मेरी इस बात को गांठ बांध लो! यदि सूखी सामग्री में घी मिलाने के बाद मुट्ठी बांधने पर भी आटा रेत की तरह बिखर रहा हो, तो कड़ाही में जाते ही ठेकुआ टूट जाएगा। ऐसे में पानी नहीं, एक चम्मच गुनगुना घी और मिलाओ। घी ही खस्ता बनाता है; पानी तो केवल आटे को कड़ा करता है।",
      bho: "बचा, बात गाँठ बाँध ला! अगर घी मिलावे के बाद मुट्ठी में आटा बांधला पर रेत लेखा टूट जात बा त समझम की मोयन कम बा। पानी मत डालम, एक चम्मच घी अउर डाल के मलीं। घी क मोयन ही खस्ता क प्राण ह, पानी त खाली कड़ा बनावेला।"
    }
  },
  'elaichi-thekua': {
    prepTime: '20 Mins',
    cookTime: '25 Mins',
    serves: {
      en: '8-10 Pieces',
      hi: '८-१० स्वादिष्ट ठेकुए',
      bho: '८-१० गो इलायची क ठेकुआ'
    },
    difficulty: {
      en: 'Fragrant / Aromatic',
      hi: 'सुगंधित और सोंधा',
      bho: 'सोंध महक (सहज विधि)'
    },
    historyTitle: {
      en: 'Monsoon Greetings & Malabar Spices',
      hi: 'सावन की फुहार और इलायची की बहार',
      bho: 'सावन क कजरी आ इलायची क गमक'
    },
    history: {
      en: 'Inspired by rural folk songs celebrating the arrival of fresh rain and cardamom shipments from the Malabar coast, blended with coconut pulp dried under the bright Saran sun. This variance of Thekua was traditionally eaten while swinging on Neem tree ropes during green Shravan festivals, matching the moist mud smell with hot Cardamom steam.',
      hi: 'यह सोंधा ठेकुआ सावन की फुहारों और सुहावने लोक-गीतों की याद दिलाता है। पुरानी रसोइयों में हरी ताज़ी इलायची को बारीक कूटकर सूखे नारियल के लच्छों के साथ गेंहू के आटे में सहेजा जाता था। बारिश के मौसम में जब मिट्टी की खुशबू बिखरती है, तब गरमा-गरम इलायची-नारियल वाले कुरकुरे ठेकुए संग चाय का आनंद पूरे परिवार को करीब लाता है।',
      bho: 'सावन के महीना में जब गाँव क बहिन लोग बाग़ में झूला झुलेली आ कजरी गावेली, त दादी माई ताज़ा हरी इलायची क दरदरा कूट के गरी क लच्छा संग आटा में मिला के सोंध ठेकुआ बनावेली। इलायची क सुगन्ध आ सोंध गरी क टुकड़ा जब घी में सिकेला त पूरा टोला महक उठेला।'
    },
    ingredientsTitle: {
      en: 'Aromatic Handpicked Spices',
      hi: 'सुगंधित एवं चुनिंदा सामग्री',
      bho: 'गमकदार सोंध सामग्री'
    },
    ingredientsList: {
      en: [
        '250g Premium Stone-Milled Whole Wheat Flour',
        '80g Sun-dried Organic Sugarcane Sugar',
        '4 tbsp Pure Cow Ghee (Rich Moyen)',
        '10-12 Whole Cardamom Pods (Elaichi) - Freshly pounded',
        '4 tbsp Sun-Dried Fresh Raw Coconut fine curls'
      ],
      hi: [
        '२५० ग्राम ताज़ा पिसा चोकरदार गेहूं का आटा',
        '८० ग्राम आर्गेनिक गन्ने की चीनी या खांड',
        '४ बड़ी चम्मच शुद्ध गाय का गुनगुना घी (मोयन)',
        '१०-१२ खड़ी हरी इलायची (सिलबट्टे पर ताज़ी कुटी)',
        '४ बड़ी चम्मच ताज़े धूप में सुखाए गए नारियल क महीन लच्छे'
      ],
      bho: [
        '२५० ग्राम ताज़ा पिसावल गेहूं क चोकरयुक्त आटा',
        '८० ग्राम देसी बिना सल्फर के चीनी',
        '४ चम्मच गुनगुना गाय क शुद्ध घी',
        '१०-१२ गो हरी इलायची (मूंठ से कुचलल)',
        '४ चम्मच सुखल धूप नारियल महीन गरी'
      ]
    },
    stepsTitle: {
      en: 'The Aromatic Crafting process',
      hi: 'सोंधी सुगंध की क्रमिक ढलाई विधि',
      bho: 'इलायची-गरी ठेकुआ बनावे क तरीक़ा'
    },
    steps: {
      en: [
        { title: 'The Cardamom Punch', desc: 'Crack the cardamom shells on a clean stone mortar, collect black seeds, and crush dry with coarse sugar to lock the essential oils. Do not use commercial artificial dust!' },
        { title: 'The Dough Binding', desc: 'Combine wheat flour, coconut slices, and ghee in a platter. Rub with fingers until completely integrated. Sprinkle the sugar cardamom water gently.' },
        { title: 'The Leaf mold Impression', desc: 'Mold loose crumbs into thick disks. Dust with mustard oil. Press hard onto the wooden carving to get the beautiful leaf structure.' },
        { title: 'The Gentle Saffron Fry', desc: 'Fry the raw patties in moderate hot Ghee on low temperature. The thin coconut curls will roast beautifully on the surface, releasing a caramelized sweet aroma.' }
      ],
      hi: [
        { title: 'हरी इलायची कूटन', desc: 'बाज़ार के नकली एसेंस की जगह हरी इलायची के छिलके उतारें। काले बीजों को खरल या सिलबट्टे पर दरदरा कूटें ताकि उनकी प्राकृतिक सुगंध बाहर आए।' },
        { title: 'सामग्री का सोंधा मिलाव', desc: 'आटे में नारियल के लच्छे, घी और कुटी इलायची मिलाएं। हथेलियों से रगड़ें। चीनी के गुनगुने पानी को धीरे-धीरे छिड़कते हुए आटे को कठोरता से एक पास लाएं।' },
        { title: 'साँचे पर कलात्मक ढलाई', desc: 'लोइयों को गोलाकार रूप दें। लकड़ी के पावन सांचे पर रखकर अंगूठे से हल्के और समान बल से दबाते हुए सुंदर पत्ती का रूप दें।' },
        { title: 'मंद आंच क धीमी सिकाई', desc: 'धीमी से मध्यम आंच पर ठेकुआ को कड़ाही में तलें। धीमी सिकाई के कारण नारियल के टुकड़े सुनहरे और बेजोड़ रूप से भुन जाएंगे, जिससे अद्भुत कैरामेल स्वाद आएगा।' }
      ],
      bho: [
        { title: 'इलायची क कुटाई', desc: 'बाज़ार क इलायची पाउडर दम बेकार रहेला। रउआ ताज़ा इलायची क बीज ओखली में दरदरा कूटीं ताकि असली खुशबू मिल सके।' },
        { title: 'सामग्री मिलाव आ मोयन', desc: 'आटा में गरी, कुचलल इलायची आ घी मिला के बढ़िया से रगड़ लीं। चीनी क पानी डाल के आटा के धीरे से जोड़ीं।' },
        { title: 'काठ साँचे पर दाब', desc: 'लोई गोल बना के साँचा पर हल्फ तेल लगा के हथेली से दाबीं जवने से पत्ती क आकृति निखर के आवे।' },
        { title: 'धीमी कढ़ाई छनाई', desc: 'दम मंद आंच पर लोहा के कड़ाई में तलीं। गरी क लच्छा जब ताँबा नियन सिक जाई त कढ़ाई से निकाल के ठंडा करीं।' }
      ]
    },
    grandmaSecretTitle: {
      en: "Coconut Curly Secrets",
      hi: "दादी माँ का सच्चा नुस्खा",
      bho: "दादी माई क गरी नुस्खा"
    },
    grandmaSecret: {
      en: "Do not use shredded dried coconut powder from plastic boxes, Beta! Use thin curls hand-copied from a raw coconut halving. The natural oils inside raw coconut curl caramelize inside hot Ghee, giving our cookie that nutty, crispy coconut treasure which is absent in modern market biscuits.",
      hi: "बाज़ार के पैकेट वाले नारियल पाउडर का प्रयोग कभी मत करना बेटा! हमेशा ताज़े सूखे गोले को चिप्स की तरह बारीक चाकू से काटो। जब ये पतली कतरनें घी में सिकती हैं, तो उनका कुदरती तेल बाहर आता है जो ठेकुए को स्वर्ग जैसा सोंधा स्वाद देता है।",
      bho: "बाबू, बजार क सुखल गरी क बुरादा क प्रयोग जनि करब! ताज़ा पानी वाली गरी क चक्कू से पतला-पतला लच्छा निकालीं। जब इ घी में छनाई त ओकर असली सुगन्ध बहरी आई जवन पैकेट वाला नारियल में ना मिलेला।"
    }
  },
  'ajwain-nimki': {
    prepTime: '30 Mins',
    cookTime: '20 Mins',
    serves: {
      en: '150-200g Crispy Nimkis',
      hi: '१५०-२०० ग्राम करारी निमकी',
      bho: 'भर पेट सुहाली आ नुनछुर निमकी'
    },
    difficulty: {
      en: 'Layered Origami / Craft',
      hi: 'परतदार कलात्मक फोल्ड',
      bho: '१६-परत क सुहाली (धैर्य आ कला)'
    },
    historyTitle: {
      en: 'Ayurvedic Digestives & 16-Fold Origami',
      hi: 'आयुर्वेदिक पाचक अजवाइन और १६ परतों की कला',
      bho: 'अजवाइन क सुगन्ध आ सोहारी क परतदार राज'
    },
    history: {
      en: 'The diamond and triangle Nimki is the ultimate savory snack of the Ganges basin. Rooted in traditional Ayurvedic practices that prescribe roast Carom seeds (Ajwain) and Rock Salt (Sendha Namak) during wet seasons to enhance digestion, the Nimki’s real secrets lay in folding pastry sheets sixteen times with ghee paste brushing. When dropped in hot groundnut oil, the dry air trapped between the folds expands, making it crispy like a thousands dry autumn leaves.',
      hi: 'करारी अजवाइन निमकी उत्तर भारत क एक बेजोड़ नमकीन उपहार है। बरसात और सर्दियों में हाजमा दुरुस्त रखने के लिए हमारे आयुर्वेदाचार्य अजवाइन और सेंधा नमक के प्रयोग की सलाह देते हैं। हमारी निमकी को मैदे की जगह पारंपरिक चोकरयुक्त गेंहू से तैयार किया जाता है और बेलते समय शुद्ध घी लगाकर १६ बार मोड़ा जाता है। गर्म तेल में जाते ही ये परतें पंखुड़ियों की तरह खिलकर कुरकुरी बन जाती हैं।',
      bho: 'सोंध नुनछुर निमकी पूर्वांचल क चाय क असली साथी ह। हाजमा दुरुस्त राखे बदे अजवाइन आ सेंधा नमक क मिलावट प्राचीन वैद्य लोग बतावेला। एकरा के बनावे बदे आटा क पतली रोटी बना के बीच में घी लगा के त्रिकोण मोड़ल जाला। जब गरम गुनगुना तेल में सुहाली सिकेला त एकर एक-एक परत कमो क पच्छी नियन खुल जाला।'
    },
    ingredientsTitle: {
      en: 'Golden Organic Savories',
      hi: 'पाचक और शुद्ध नमकीन सामग्री',
      bho: 'पाचक सोंध नमकीन मसाला'
    },
    ingredientsList: {
      en: [
        '300g Sifted Coarse Heritage Wheat Flour',
        '2 tbsp Whole Robust Carom Seeds (Ajwain) - Fresh roasted',
        '1 tsp Sendha Namak (Rock Salt or Ayurvedic Pink Salt)',
        '3 tbsp Solid Cow Desi Ghee (Moyen & Layering)',
        '1/2 cup Ice cold clay-pot water for tight pastry kneading',
        'Cold-pressed Groundnut Oil for deep fire fry'
      ],
      hi: [
        '३०० ग्राम कपड़े से छना गेंहू का चोकरयुक्त दरदरा आटा',
        '२ बड़ी चम्मच खड़ी अजवाइन (हल्की भुनी और हाथ से मसली)',
        '१ छोटी चम्मच शुद्ध पहाड़ी सेंधा नमक (सेंधा नमक क पिसाव)',
        '३ बड़ी चम्मच जमा हुआ शुद्ध घी (परतदार लेप के लिए)',
        'आधा कप घड़े क एकदम ठंडा पानी (सख्त आटा सानने के लिए)',
        'कढ़ाई में तलने के लिए शुद्ध अनरिफाइंड मूंगफली का तेल'
      ],
      bho: [
        '३०० ग्राम छानल दरदरा चोकरयुक्त गेहूं क आटा',
        '२ चम्मच खड़ा तीखा अजवाइन (हाथ से रगड़ल)',
        '१ चम्मच पहाड़ी सेंधा नमक (सेंधा नून)',
        '३ चम्मच पीला घी (परत क लेप बदे)',
        'आधा कप माटी के घड़ा क ठंढा पानी (दम सख्त आटा साने बदे)',
        'कड़ाही में छने खातिर मूंगफली क शुद्ध तेल'
      ]
    },
    stepsTitle: {
      en: 'The 16-Fold Origami Steps',
      hi: '१६-परतदार सुहाली बेलने की कला',
      bho: 'परतदार सुहाली बनावे क सुन्दर रीती'
    },
    steps: {
      en: [
        { title: 'The Cold Knead', desc: 'Mix sifted flour, massaged ajwain, and rock salt. Add solid ghee moyen. Rub with dry fingers. Pour cold clay water to form a very tight, hard, non-sticky pastry dough. Cover with damp muslin cloth and rest for 30 minutes.' },
        { title: 'The Saata Paste Prep', desc: 'In a small bronze bowl, whisk 2 spoons of melted Ghee and 1 spoon of dry wheat flour until it forms a creamy white smooth paste. This is the magical "Saata" used to partition the layers.' },
        { title: 'The Folding Geometry', desc: 'Roll a large sheet of dough very thin. Spread the Saata paste evenly across the sheet. Sprinkle some dry flour. Fold in half, paint Saata again, fold into a long strip. Paint Saata, roll and fold into a triangle. Press slightly with rolling pin.' },
        { title: 'The Low Heat Bubble Bath', desc: 'Slide the triangles into a medium-warm iron cauldron filled with groundnut oil. Do not fry on high heat! The layers require low heat to detach. Fry slowly for 8-10 minutes until they turn pale brassy yellow.' }
      ],
      hi: [
        { title: 'सख्त आटा गूंधना', desc: 'आटे में मसली हुई अजवाइन, सेंधा नमक और घी डालें। उंगलियों से मिलाएं। घड़े के ठंडे पानी को थोड़ा-थोड़ा छिड़कते हुए पूरी तरह से सख्त, कड़ा आटा तैयार करें। गीले सूती कपड़े से ढककर ३० मिनट के लिए छोड़ दें।' },
        { title: 'साटा लेप की तैयारी', desc: 'कटोरी में २ चम्मच घी और १ चम्मच सूखा आटा लेकर उंगली से अच्छी तरह फेंटें ताकि वह सफेद मक्खन जैसा क्रीमी लेप बन जाए। यही जादुई पेस्ट हमारी निमकी की परतों को आपस में चिपकने नहीं देता।' },
        { title: '१६ परतों की कला', desc: 'आटे की बड़ी पतली चपाती बेलें। उस पर तैयार "साटा" लेप अच्छी तरह फैलाएं। ऊपर से सूखा आटा छिड़कें। इसे मोड़कर पट्टी बनाएं, फिर से लेप लगाएं और त्रिकोण आकार में मोड़ें। बेलन से हल्का सा दबा लें।' },
        { title: 'धीमी आंच क कढ़ाई स्नान', desc: 'मूंगफली के तेल को गुनगुना गर्म करें। निमकी के त्रिकोणों को उसमें प्यार से डालें। आंच धीमी रखें ताकि भीतर की सभी १६ परतें अलग-अलग खिल सकें। लगभग ८-१० मिनट में हल्का सुनहरा होने पर निकालें।' }
      ],
      bho: [
        { title: 'कड़ा आटा सानाव', desc: 'आटा में अजवाइन, सेंधा नमक आ घी क मोयन डालके रगड़ीं। घड़ा क ठंढा पानी डाल के दम सख्त आटा सान लीं। सूती कपड़ा से ३० मिनट ढँक के रख दीं।' },
        { title: 'साटा लेप क बनाव', desc: 'छोटा कटोरी में २ चम्मच घी आ १ चम्मच आटा डाल के खूब फेंटीं जबले उ सफ़ेद मक्खन लेखा लेप ना बन जाए।' },
        { title: 'त्रिकोण मोड़ क कला', desc: 'बड़ रोटी एकदम पतली बेलीं। ओह पर साटा लेप लगा के सूखा आटा छिड़कीं। फिर रोटी के मोड़ के त्रिकोण सुहाली रूप दीं।' },
        { title: 'धीमा आंच क तलाई', desc: 'कड़ाही में मूंगफली क तेल दम मध्यम गरम करीं। सुहाली डाल के मंद आंच पर १० मिनट ले तलीं। एक-एक परत खिल के कुरकुरी होई।' }
      ]
    },
    grandmaSecretTitle: {
      en: "The Saata Flour Secret",
      hi: "दादी माँ का परतदार मंत्र",
      bho: "दादी माई क साटा मंत्र"
    },
    grandmaSecret: {
      en: "Do not fold the pastry with pure oil, Beta! If you fold with plain oil, the layers fuse together in the frying pan and become a hard lump. Whisk Ghee and dry flour to form a white 'Saata' paste. This starch boundary prevents Ghee layers from collapsing, letting the air pocket expand to create that flaky crumb that melts in tea.",
      hi: "बेटा, परतों में केवल सादा तेल लगाने की भूल मत करना! सादे तेल से परतें आपस में चिपक जाती हैं और निमकी सख्त पापड़ी बन जाती है। हमेशा घी और सूखे आटे को मिलाकर सफेद 'साटा' लेप बनाओ। यही सुहाली को फूली हुई और क्रिस्पी कचौड़ी जैसी संरचना देता है।",
      bho: "बचा, त्रिकोण मोड़त घरी खाली तेल जनि लगईह! तेल से परत चिपक जाई आ सुहाली दम कड़ा हो जाई। हमेशा घी आ आटा के मिला के 'साटा' लेप बनाईं, तबे एक-एक परत हवा क खजाना लेखा खुल के कुरकुरी बनेली।"
    }
  },
  'masala-nimki': {
    prepTime: '25 Mins',
    cookTime: '20 Mins',
    serves: {
      en: '200g Masala Nimki',
      hi: '२०० ग्राम ज़ायकेदार मसाला निमकी',
      bho: '२०० ग्राम चटपटी मशाला निमकी'
    },
    difficulty: {
      en: 'Spiced / Traditional Spice Mix',
      hi: 'चटपटा और मसालेदार',
      bho: 'सोंध मशाला (सहज विधी)'
    },
    historyTitle: {
      en: 'Ancient Spice Routes & Stone Mortars',
      hi: 'प्राचीन मसाला मार्ग और दादाजी की सिलबट्टा कुटाई',
      bho: 'सिलबट्टा क १२-मशाला क जादू'
    },
    history: {
      en: 'The 12-Spice Masala Nimki is a culinary tribute to the traditional spice markets of ancient Saran. Sourced from organic cooperative farms and ground manually using heavy stone mortars, the secret blend includes mountain-grown black pepper, dry ginger, roasted cumin, and sun-dried organic sour mango (Amchoor). Sprinkled hot on fresh ghee nimki, these herbs provide deep digestive warmth and a tangy kick.',
      hi: 'यह चटपटी १२-मसालों वाली निमकी दादाजी के जमाने की गुप्त मसाला रेसिपी का जीवित उदाहरण है। इसमें प्रयुक्त मसालों को बाज़ार के पैकेट वाले पाउडर की तरह पीसा नहीं जाता, बल्कि सिलबट्टे पर दरदरा कूटकर अमचूर, पिसी सौंठ और काले नमक का शानदार अनुपात तैयार किया जाता है। गरमा-गरम कड़ाही से निकली निमकी पर इसे बिखेरते ही मसालों की भीनी-भीनी सुगंध पूरे घर को उत्सव मय बना देती है।',
      bho: 'इ निमकी गाँव के पुरान मशाला क खजाना ह। सारण के कोल्हू क धूप सुखल गोटा मशाला, अमचूर, आ करिया पहाड़ी गोलमरिच के सिलबट्टा पर पीस के १२-मशाला क गुप्त कतरन तैयार कइल जाला। गरम-गरम कड़ाही से निकलल सुहाली पर जब इ छिड़कल जाला, त मुँह में पानी आवे वाला सोंध ज़ायका बन जाला।'
    },
    ingredientsTitle: {
      en: 'Secret Spice Elements',
      hi: 'गुप्त १२ मसालों का अनुपम मेल',
      bho: 'माई रसोई क १२-मशाला मसाला'
    },
    ingredientsList: {
      en: [
        '300g Coarse Whole Wheat Flour',
        '2 tbsp Handmade 12-Spice Powder (Amchoor, Cumin, Black Pepper, Ginger, Cardamom, Clove, Fennel, Mint, Black Salt, Heeng)',
        '1 tsp Rock Salt',
        '3 tbsp Pure Cow Ghee (Moyen)',
        'Cold-pressed Groundnut Oil for frying'
      ],
      hi: [
        '३०० ग्राम दरदरा चोकरदार गेंहू का आटा',
        '२ बड़ी चम्मच हस्तनिर्मित १२-मसाला पाउडर (अमचूर, क भुना जीरा, काली मिर्च, सौंठ, हींग, काला नमक, पुदीना, इलायची आदि का मिश्रण)',
        '१ छोटी चम्मच सेंधा नमक',
        '३ बड़ी चम्मच गाय का दानेदार घी (मोयन)',
        'तलने के लिए रिफाइन नहीं, शुद्ध कच्ची घानी मूंगफली का तेल'
      ],
      bho: [
        '३०० ग्राम दरदरा चोकरदार गेहूं क आटा',
        '२ चम्मच १२-मशाला क हस्तनिर्मित कतरन (सेंधा नमक, अमचूर, भुरा जीरा, हींग, पीसा सुखल अदरक आ गोलमरिच)',
        '१ चम्मच पहाड़ी सेंधा नून',
        '३ चम्मच बढ़िया पीला घी (मोयन बदे)',
        'लोहे क कड़ाई में मंद छने खातिर मूंगफली तेल'
      ]
    },
    stepsTitle: {
      en: 'Spicing Process Flow',
      hi: 'मसाला निमकी की हाथ कला विधि',
      bho: 'मशाला निमकी बनावे क विधि'
    },
    steps: {
      en: [
        { title: 'The Clay Dough Prep', desc: 'Sift flour. Rub with Desi Ghee moyen and rock salt. Knead a tight, dense dough using lukewarm water. Rest under damp cotton cloth so gluten settles.' },
        { title: 'The Ribbon Cuts', desc: 'Roll flat sheets to medium thinness. Slice into diamond ribbons or thin straws using an oiled brass scale or knife. Let the ribbons dry slightly under shade.' },
        { title: 'The Groundnut Oil Deep-fry', desc: 'Heat unrefined groundnut oil in heavy iron pan. Slide ribbons in small batches. Deep-fry on medium fire. The Nimki must sing in low sizzle for 8 minutes till golden.' },
        { title: 'The Hot Spice Spill', desc: 'Take Nimkis out. Sprinkle the 12-Spice blend immediately while they are sizzling hot. The boiling residual ghee on the surface drinks the spices instantly.' }
      ],
      hi: [
        { title: ' आटा व आराम', desc: 'आटे में घी का मोयन और सेंधा नमक मिलाएं। थोड़े गुनगुने पानी की सहायता से सख्त आटा गूंथें। ३० मिनट के लिए सूती कपड़े से ढककर अवश्य आराम दें।' },
        { title: 'कलात्मक कतरन', desc: 'आटे को समतल बेलें। चाकू से काटकर छोटे-छोटे डायमंड कतरन या रिबन बनाएं। इन कतरनों को छांव में ५ मिनट के लिए सुखाएं।' },
        { title: 'कड़ाही तलाई स्नान', desc: 'लोहे के बर्तन में मूंगफली तेल मध्यम गरम करें। कतरनों को कड़ाही में डालें। ८ मिनट तक सुनहरे कुरकुरे होने तक धीमी आंच पर धैर्यपूर्वक सेकें।' },
        { title: 'गर्म मसाला छिड़काव', desc: 'कड़ाही से निकलते ही, जब निमकी अत्यधिक गर्म हो, तुरंत हाथ से तैयार १२-मसाला पाउडर चारों तरफ फैलाएं। गर्म तेल मसालों को जकड़ लेगा।' }
      ],
      bho: [
        { title: 'आटा क सानव', desc: 'आटा में घी आ नून मिला के गुनगुना जल से सख्त सान लीं। आधा घंटा बदे सूती कपड़ा से ढँक के रख दीं।' },
        { title: 'सुहाली क कतरन', desc: 'पतली रोटी बेल के चक्कू से सुन्दर तिरछा डायमंड पट्टी काट लीं। पट्टी के ५ मिनट हवे में सुखाईं।' },
        { title: 'धीमे आँच तलाई', desc: 'कड़ाही में मूंगफली तेल मध्यम गरम क के पट्टी डालीं आ ८ मिनट मंद आंच पर लाल करारा होखे तक तलीं।' },
        { title: 'गरमा-गरम मसाला छिड़काव', desc: 'निमकी निकलते खन गरम सुहाली पर तुरंत हस्तनिर्मित मशाला छिड़कीं। गरम घी मशाला पा के सोंध खुशबू बनाई।' }
      ]
    },
    grandmaSecretTitle: {
      en: "The Hot Spice Spill Secret",
      hi: "दादी माँ का स्वर्ण सूत्र",
      bho: "दादी माई क मशाला मंत्र"
    },
    grandmaSecret: {
      en: "Never sprinkle spices on cold Nimkis! If you wait for the snack to cool down, the surface oil dries out, and all your beautiful stone-ground spices will fall down to the bottom of the tin box. Always spill the spices when the Nimki is hot and directly coming out of the oil. The boiling ghee on the surface drinks the spices instantly, binding the aroma forever.",
      hi: "बेटा, ठंडी निमकी पर मसाला छिड़कने की भूल कभी मत करना! ठंडा होने पर सतह का घी जम जाता है और सारा मसाला डब्बे के नीचे गिर जाएगा। जैसे ही निमकी कड़ाही से छनकर निकले, तुरंत उस पर मसाला डालो। गर्म तेल मसाले को जकड़ कर सुगन्धित बना देगा।",
      bho: "बाबू, ठंढी निमकी पर मशाला क छिड़काव दम जनि करब! ठंडा भेला पर सारा मशाला डिब्बा क नीचे गिर जाई। कड़ाही से निकलते-चलते गरम पट्टी पर मसाला छिटम तवे मशाला पट्टी से चिपकके सोंध सुगन्ध देई।"
    }
  },
  'spicy-nimki': {
    prepTime: '25 Mins',
    cookTime: '20 Mins',
    serves: {
      en: '200g Hot Spicy Nimkis',
      hi: '२०० ग्राम तीखी गुंटूर निमकी',
      bho: '२०० ग्राम तीखी देहाती सुहाली'
    },
    difficulty: {
      en: 'Teekha / Fiery Craft',
      hi: 'तीखा और चटपटा',
      bho: 'तीखा करारा (सहज तैयारी)'
    },
    historyTitle: {
      en: 'The Fiery Fields & Southern Spices',
      hi: 'गुंटूर क विख्यात तीखी मिर्च और देहाती छाछ क मेल',
      bho: 'मरिचा आ सेंधा नून क तीखा स्वाद'
    },
    history: {
      en: 'In the scorching summer of sugarcane harvesting, farmers required strong, fiery, mineral-dense snacks paired with cold earthen pot buttermilk (Chhaach) to sustain hard labor in open fields. Inspired by these traditional spice breaks, the Guntur Teekha Nimki binds fiery sun-dried red chili flakes and fresh green chilli paste into flaky layered wheat sheets, creating an endorphin rush balanced perfectly with rock salt.',
      hi: 'यह तीखी निमकी खेतों में काम करने वाले किसान भाइयों के पारंपरिक भोजन ब्रेक से प्रेरित है। तेज गर्मी और कठिन परिश्रम के दौरान शरीर में स्फूर्ति बनाए रखने के लिए वे मिर्च, सेंधा नमक और मटके के ठंडे मट्ठे का आनंद लेते थे। गुंटूर की तीखी लाल मिर्च के फ्लैक्स और ताज़ी हरी मिर्च के पेस्ट को गेहूं के आटे के साथ गूंथकर बनाई गई यह निमकी तीखा और नमकीन स्वाद का बेजोड़ संगम है।',
      bho: 'इ तीखी सुहाली पुराना देहाती गाँव के किसान भाइ लोगन क ताक़त ह। जब जेठ क दुपहरी में खेतन में काम करत घरी भूख लागे त मटका क ठंढ छाछ संग तीखा मरिच क निमकी खइला से शरीर क शिथिलता दूर भागेला। गुंटूर क तीखा मरिच आ हरी ताज़ा मिर्च क पेस्ट सुहाली में सोंध तीखापन ला देवेला।'
    },
    ingredientsTitle: {
      en: 'Fiery Natural Spices',
      hi: 'तीखी एवं प्राकृतिक जैविक सामग्री',
      bho: 'तीखा देहाती सामग्री'
    },
    ingredientsList: {
      en: [
        '300g Premium Farm Pure Whole Wheat Flour',
        '1 tbsp Crushed Guntur Sun-Dried Red Chili Flakes',
        '1 tsp Fresh Hand-pounded Green Chili Paste',
        '1 tsp Ancient Black Cumin Seeds (Kalonji or Mangrail)',
        '3 tbsp Pure Cow Ghee (Rich Moyen)',
        'Cold-pressed Groundnut Oil for deep fire fry'
      ],
      hi: [
        '३०० ग्राम खेत का शुद्ध पौष्टिक गेंहू का आटा',
        '१ बड़ी चम्मच गुंटूर की तीखी लाल मिर्च क कुटा हुआ फ्लैक्स',
        '१ छोटी चम्मच ताज़ी दरदरी हरी मिर्च का पेस्ट',
        '१ छोटी चम्मच काले मंगरैल दाने (कलौंजी)',
        '३ बड़ी चम्मच शुद्ध गाय का घी (खस्ता मोयन)',
        'तलने के लिए शुद्ध कच्ची घानी मूंगफली का तेल'
      ],
      bho: [
        '३०० ग्राम खेत क शुद्ध गेहूं क आटा',
        '१ चम्मच लाल गुंटूर तीखी मरिचा क कुचलल कतरन',
        '१ चम्मच ताज़ा हरी मरिचा क कूट पीस',
        '१ चम्मच काल कलौंजी (मंगरैल)',
        '३ चम्मच पीला घी (खस्ता मोयन बदे)',
        'कड़ाही में छने खातिर मूंगफली तेल'
      ]
    },
    stepsTitle: {
      en: 'Fiery Handcraft Sequence',
      hi: 'तीखी निमकी बनाने की पूरी हस्तविधि',
      bho: 'तीखा निमकी ढलाई क रीती'
    },
    steps: {
      en: [
        { title: 'The Fiery Knead', desc: 'Mix whole wheat, rock salt, kalonji, and Guntur chili flakes. Whisk hand-pounded green chili paste with Ghee. Rub Ghee paste into flour until sand-like. Knead very tight with ice-cold water, trapping natural herbal oils.' },
        { title: 'The Rolling Strip Cut', desc: 'Roll flat thin sheets of dough. Cut into long sharp needle strips or diamond shapes using a traditional knife. Let strips sit for 5 minutes so surface moisture dries.' },
        { title: 'The Cauldron Fry', desc: 'Heat unrefined groundnut oil in heavy iron pan on medium. Slide the chili ribbons. Fry under medium temperatures. The green and red pepper colors must preserve in oil.' },
        { title: 'The Cold Metal Tray Rest', desc: 'Drain with iron Strainer. Let cool down inside broad brass plates. Store inside airtight steel boxes to keep the hot spicy crunch live for months.' }
      ],
      hi: [
        { title: 'तीखा आटा गूंथना', desc: 'आटे में सेंधा नमक, कलौंजी, और लाल मिर्च फ्लेक्स मिलाएं। अब हरी मिर्च के पेस्ट को पिघले घी में फेंटकर आटे में रगड़ें। घड़े के शीतल पानी से दम सख्त कड़ा आटा तैयार कर ३० मिनट गीले कपड़े में रखें।' },
        { title: 'चिमटी कतरन बेलन', desc: 'आटे की महीन रोटी बेलें। अपनी पसंद के लंबे पतले सुई आकार के रिबन या छोटे चोकोर डायमंड आकार काटें।' },
        { title: 'कड़ाही स्नान', desc: 'कड़ाही में अनरिफाइंड मूंगफली का तेल गर्म करें और आंच मध्यम रखें। मिर्च के कतरन डालें। धीमी सिकाई से मिर्च अपना प्राकृतिक तीखा तेल आटे के साथ पका देगी।' },
        { title: 'हवा व सहेज भंडारण', desc: 'सुंदर तांबे सा रंग होने पर छन्नी से छान लें। बड़ी थाली में फैलाकर सोंधी हवा का आनंद दें और ठंडी होने पर ही स्टील के डिब्बे में सहेजें।' }
      ],
      bho: [
        { title: 'तीखा मसाला मनाव', desc: 'आटा में सेंधा नून, मंगरैल आ लाल कुचलल मरिचा मिलाईं। घी आ हरी मरिचा क पेस्ट आटा में खूब मलीं। ठंढा जल डालके दम सख्त आटा सान लीं।' },
        { title: 'महीन सोहारी कतरन', desc: 'कड़ा आटा क पतली रोटी बेल लीं आ महीन तिरछा लम्बा पट्टी काट के ५ मिनट सहेज दीं।' },
        { title: 'मध्यम आँच छनाई', desc: 'कड़ाही में मूंगफली तेल मध्यम गरम क के पट्टी डालीं आ धीमा आँच पर खूब तलीं जवने से मरिचा क असली रंग निखर के आए।' },
        { title: 'भंडारण', desc: 'कड़ाही से छान के थाली में सज़ा के ठंडा कके पीतल या स्टील के एयरटाइट डिब्बा में महिनों सहेजीं।' }
      ]
    },
    grandmaSecretTitle: {
      en: "Cold Clay-pot Water Secret",
      hi: "दादी माँ का तीखा नुस्खा",
      bho: "दादी माई क तीखा मंत्र"
    },
    grandmaSecret: {
      en: "To balance the Guntur heat, Beta, knead the dough with very cold water of clay pots, and do not use hot ghee for Moyen. Cold water locks the natural green spice oils inside the starch network. The ghee flakes expand perfectly during slow cooking, giving you that rich, crunchy green kick that doesn't burn your throat but sweetens your breath.",
      hi: "बेटा, तीखी मिर्च के तीखेपन को सुहाता और मनमोहक बनाने के लिए आटे को घड़े के एकदम ठंडे पानी से गूंथो। ठंडे पानी का नियम मसालों के प्राकृतिक तेलों को नष्ट होने से बचाता है। जब यह सुहाली धीमी आंच पर पकती है, तो तीखापन बिना कड़वाहट के निखर आता है।",
      bho: "बचा, तीखी मरिचा क तीखापन सोंध बनावे बदे आटा दम ठंढा माटी क घड़ा क जल से सानब! ठंढा जल मिर्च क नेचुरल सुगन्धित तेल के भीतर जकड़ के राखेला। जब निमकी लोहा के कड़ाई में मंद आँच पर पाकेला त तीखापन अमृत नियन सोंध बुझाला।"
    }
  }
};

export default function RecipeModal({ product, language, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'ingredients' | 'steps'>('history');
  const [isCopied, setIsCopied] = useState(false);

  // Fallback to gur-thekua if product id has no direct recipe mapping
  const recipe = RECIPE_DATA[product.id] || RECIPE_DATA['gur-thekua'];
  const stepsList = recipe.steps[language];

  const handleShareRecipe = () => {
    const textToCopy = `${recipe.historyTitle[language]}\n\n${recipe.grandmaSecretTitle[language]}: "${recipe.grandmaSecret[language]}"\n\nPreserved Authentic Recipes by Maati.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div id="traditional-recipe-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Blurred nostalgic brown background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#2C1D11]/90 backdrop-blur-md"
      />

      {/* Rustic Copper-Rimmed Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 30 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-[#FAF6EE] max-w-2xl w-full rounded-3xl border-4 border-[#B45309]/55 overflow-hidden shadow-2xl relative z-10 max-h-[88vh] flex flex-col justify-between"
      >
        
        {/* Clay Pattern Sieve Header strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-repeat-x bg-top z-15" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,5 L10,0 L20,5 Z\" fill=\"%23B45309\"/></svg>')" }} />

        {/* Header containing name & closing controls */}
        <div className="pt-6 px-6 pb-4 bg-[#F2ECD9]/50 border-b border-[#EADCC6] flex justify-between items-start relative">
          
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black uppercase text-[#B45309] tracking-widest flex items-center gap-1 font-mono">
              <ChefHat className="w-4 h-4 text-[#B45309]" /> 
              {language === 'en' ? 'Maa Ka Khazana • Heritage Recipe Card' : language === 'hi' ? 'माँ का खजाना • सांस्कृतिक रेसिपी' : 'मईया के रसोई क पवित्र रसीद'}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E] leading-tight">
              {product.name}
            </h2>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px] font-bold text-[#857252] uppercase">
              <span className="flex items-center gap-1 bg-[#EADCC6]/50 px-2 py-0.5 rounded">
                <Clock className="w-3 h-3 text-[#B45309]" /> Prep: {recipe.prepTime}
              </span>
              <span className="flex items-center gap-1 bg-[#EADCC6]/50 px-2 py-0.5 rounded">
                <Flame className="w-3 h-3 text-orange-500 animate-pulse" /> Cook: {recipe.cookTime}
              </span>
              <span className="flex items-center gap-1 bg-[#EADCC6]/50 px-2 py-0.5 rounded">
                <Utensils className="w-3 h-3 text-[#B45309]" /> Serves: {recipe.serves[language]}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#3F2E1E]/10 text-[#3F2E1E] hover:bg-[#3F2E1E] hover:text-[#FAF6EE] flex items-center justify-center cursor-pointer transition-all focus:outline-none"
            title="Close recipe popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TRADITIONAL TAB OPTIONS */}
        <div className="flex border-b border-[#EADCC6] bg-[#F1EAD9]/30 text-xs font-semibold relative z-10">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'history' 
                ? 'border-[#B45309] text-[#B45309] font-black bg-[#FAF6EE]' 
                : 'border-transparent text-[#857252] hover:text-[#B45309]'
            }`}
          >
            📜 {language === 'en' ? 'Cultural History' : 'सांस्कृतिक इतिहास'}
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'ingredients' 
                ? 'border-[#B45309] text-[#B45309] font-black bg-[#FAF6EE]' 
                : 'border-transparent text-[#857252] hover:text-[#B45309]'
            }`}
          >
            🥣 {language === 'en' ? 'Ingredients' : 'अनुपम सामग्री'}
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'steps' 
                ? 'border-[#B45309] text-[#B45309] font-black bg-[#FAF6EE]' 
                : 'border-transparent text-[#857252] hover:text-[#B45309]'
            }`}
          >
            🍳 {language === 'en' ? 'Kitchen Steps' : 'बनाने की हस्तविधि'}
          </button>
        </div>

        {/* SCROLLABLE DESCRIPTION PANELS */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#FAF6EE]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 text-left"
            >
              
              {/* 1. CULTURAL HISTORY TAB */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B45309]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#B45309]">
                      {recipe.historyTitle[language]}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C4D3C] font-semibold leading-relaxed font-serif italic">
                    "{recipe.history[language]}"
                  </p>

                  {/* Trust badge stamp under story */}
                  <div className="p-4 bg-emerald-500/5 rounded-2xl border-2 border-dashed border-emerald-500/25 flex items-start gap-3">
                    <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-emerald-900 uppercase">
                        {language === 'en' ? '100% Traditional Preservation standard' : 'शत-प्रतिशत विरासत परंपरा मन्यता'}
                      </h4>
                      <p className="text-[10px] text-emerald-800 font-semibold leading-normal">
                        {language === 'en' 
                          ? 'This recipe is validated by local women self-help models of Saran District. We enforce zero chemical hydrogen fats, palm refining, or white sugar substitutes.'
                          : 'सारण ज़िले की स्वयं सहायता समूहों द्वारा इस शास्त्रीय विधि का कठोरता से पालन किया जाता है। कृत्रिम रिफाइंड ऑयल या चीनी का स्थान यहाँ शून्य है।'}
                      </p>
                    </div>
                  </div>

                </div>
              )}

              {/* 2. INGREDIENTS LIST TAB */}
              {activeTab === 'ingredients' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#B45309]">
                      {recipe.ingredientsTitle[language]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {recipe.ingredientsList[language].map((ing, index) => (
                      <div key={index} className="p-3 bg-[#FBF9F4] rounded-xl border border-[#EADCC6]/70 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#B45309] shrink-0" />
                        <span className="text-xs text-[#3F2E1E] font-black leading-tight">
                          {ing}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-[11px] text-[#857252] italic font-semibold">
                    {language === 'en' 
                      ? 'Note: Local whole grains and organic sweetening syrups have distinct water retention. Adjust flour with small drops of ghee until tight as clay sand.'
                      : 'नोट: पत्थर पिसे ताजे आटे में पानी सोखने की क्षमता अलग होती है। पानी की जगह थोड़ा शुद्ध गाय का घी मिला लें, परंतु आटा सख्त ही रहना चाहिए।'}
                  </div>

                </div>
              )}

              {/* 3. STEP BY STEP COOKING SEQUENCE */}
              {activeTab === 'steps' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#B45309]" />
                      {recipe.stepsTitle[language]}
                    </h3>
                    <span className="text-[9px] font-mono font-bold text-[#857252] bg-[#EADCC6]/40 px-2 py-0.5 rounded">
                      NO AUTOMATION USED
                    </span>
                  </div>

                  <div className="space-y-4">
                    {stepsList.map((step, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        
                        {/* Numbers rail line dots */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-7 h-7 rounded-full bg-[#3F2E1E] text-[#FAF6EE] text-xs font-bold font-mono flex items-center justify-center border-2 border-amber-300 shadow-md">
                            0{idx + 1}
                          </div>
                          {idx !== stepsList.length - 1 && (
                            <div className="w-0.5 flex-1 bg-[#EADCC6] my-1" />
                          )}
                        </div>

                        {/* Step Description */}
                        <div className="pb-2 text-left space-y-1">
                          <h4 className="text-xs sm:text-sm font-serif font-black text-[#3F2E1E]">
                            {step.title}
                          </h4>
                          <p className="text-xs text-[#5C4D3C] font-semibold leading-relaxed">
                            {step.desc}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* DYNAMIC EMOTIONAL GRANDMA SECRET BANNER */}
          <div className="p-4 bg-[#B45309]/10 rounded-2xl border-2 border-[#B45309]/30 relative text-left">
            <span className="absolute top-[-10px] left-4 bg-[#B45309] text-[#FAF6EE] text-[9px] font-mono whitespace-nowrap px-2 py-0.5 rounded font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
              {recipe.grandmaSecretTitle[language]}
            </span>
            <p className="text-xs text-[#3F2E1E] font-serif font-semibold italic pt-2 leading-relaxed">
              "{recipe.grandmaSecret[language]}"
            </p>
            <p className="text-[9px] font-mono font-bold text-[#B45309] uppercase tracking-wider mt-2.5 text-right">
              — {language === 'en' ? 'Sharan Village Grandma (Founder’s Grandmother)' : 'सारण गाँव की पूजनीय दशहरा वाली दादी जी'}
            </p>
          </div>

        </div>

        {/* Recipe Footer Actions */}
        <div className="p-4 bg-[#F2ECD9]/50 border-t border-[#EADCC6] flex justify-between gap-3 relative z-10">
          <button
            onClick={handleShareRecipe}
            className="flex-1 py-3 text-xs font-bold border-2 border-[#B45309] hover:bg-[#B45309]/5 rounded-xl uppercase tracking-wider text-[#B45309] flex items-center justify-center gap-2 cursor-pointer focus:outline-none transition-colors"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'en' ? 'Recipe Copied!' : 'रेसिपी कॉपी भईल!'}</span>
              </>
            ) : (
              <>
                <span>📋 {language === 'en' ? 'Copy Memory Quote' : 'गुप्त नुस्खा कॉपी करें'}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-black bg-[#3F2E1E] hover:bg-[#B45309] text-white rounded-xl uppercase tracking-widest cursor-pointer focus:outline-none shadow active:scale-95 transition-all"
          >
            {language === 'en' ? 'Back to Order Fresh' : 'ताज़ा स्नैक ऑर्डर करें'}
          </button>
        </div>

      </motion.div>
    </div>
  );
}

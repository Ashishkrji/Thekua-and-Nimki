import React, { useState } from 'react';
import { BookOpen, Utensils, Clock, Flame, ShoppingCart, CheckCircle2, ChevronRight, HelpCircle, Check, Printer } from 'lucide-react';
import { Language, Product } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface TraditionalRecipesProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  openCart: () => void;
}

interface CulinaryRecipe {
  id: string;
  titles: Record<Language, string>;
  subtitle: Record<Language, string>;
  productRequiredId: string;
  prepTime: string;
  cookTime: string;
  difficulty: Record<Language, string>;
  ingredientsList: Record<Language, string[]>;
  steps: Record<Language, string[]>;
  imageUrl: string;
}

export default function TraditionalRecipes({ language, onAddToCart, openCart }: TraditionalRecipesProps) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('thekua-rabdi');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const t = TRANSLATIONS[language];

  const RECIPES: CulinaryRecipe[] = [
    {
      id: 'thekua-rabdi',
      titles: {
        en: '👴 Dadi’s Golden Sancha Thekua Rabdi Kheer',
        hi: '👵 दादी की ठेकुआ मलाई रबड़ी खीर',
        bho: '👵 माई के सुगन्धित ठेकुआ रबड़ी खीर'
      },
      subtitle: {
        en: 'A luxurious dessert where golden fennel-infused Thekuas are crumbled over rich, slow-simmered milk rabdi.',
        hi: 'धीमी आंच पर पकाए गए गाढ़े दूध की मलाईदार रबड़ी पर खस्ता सौंफ-गुड़ ठेकुआ का लाजवाब मिश्रण।',
        bho: 'धीमे-धीमे काढ़ल दूध क मलाईदार रबड़ी पर घी-सौंफ के ठेकुआ क चूरा क बेजोड़ मीठ जुगलबंदी।'
      },
      productRequiredId: 'gur-thekua',
      prepTime: '15 mins',
      cookTime: '30 mins',
      difficulty: {
        en: 'Easy Heritage Cook',
        hi: 'सरल पारंपरिक व्यंजन',
        bho: 'एकदम सहज देहाती मिठाई'
      },
      ingredientsList: {
        en: [
          '3-4 Maati Gur & Saunf Thekuas (crumbled coarse)',
          '1 Litre Full Cream Milk (reduced to 1/3 volume)',
          '2 tbsp Pure Jaggery or Sulphurless Sugar',
          '4-5 Almonds & Pistachios (slivered)',
          '1/2 tsp Fresh Green Cardamom powder',
          '1 Saffron strand (optional for royal touch)'
        ],
        hi: [
          '३-४ माटी गुड़ और सौंफ ठेकुआ (दरदरा चूरा किया हुआ)',
          '१ लीटर मलाईदार दूध (धीमी आंच पर पकाकर तिहाई हिस्सा बचा हुआ)',
          '२ बड़ी चम्मच जैविक गुड़ क खांड',
          '४-५ बादाम और पिस्ता (बारीक कतरन)',
          'आधा छोटा चम्मच पिसी हरी इलायची',
          '२-३ केसर के धागे (शाही सुगंध के लिए)'
        ],
        bho: [
          '३-४ गो माटी गुड़-सौंफ क सोंध ठेकुआ (दरदरा चूरा कइल)',
          '१ लीटर मलाईदार शुद्ध दूध (कढ़ाई में धीमे जलल तिहाई हिस्सा)',
          '२ चम्मच गाँव के कोल्हू क गुड़',
          '४-५ गो बादाम आ पिस्ता क महीन कतरन',
          'तनी मुनी दरदरा कुचलल हरी इलायची',
          '२ गो केसर क रेशा'
        ]
      },
      steps: {
        en: [
          'Pour the milk into a heavy-bottomed brass or iron pan and bring to a boil. Simmer on low fire, stirring frequently.',
          'Scrape the thick milk cream (malai) off the sides and stir back in until the milk reduces to a golden, thick rabdi consistency.',
          'Stir in the organic sweetener, cardamom powder, and half of the dry fruit slivers. Let it simmer for 2 more minutes, then chill in an earthen pot.',
          'Just before serving, sprinkle generous dollops of crumbled Maati Gur Thekua on top. Garnish with remaining nuts. The crunch of the Thekua combined with cold rabdi is pure heaven!'
        ],
        hi: [
          'भारी तले की कड़ाही में दूध को उबालें। आंच धीमी करके उसे लगातार चलाते हुए पकाएं।',
          'कड़ाही के किनारों पर जमने वाली गाढ़ी मलाई को खुरचकर वापस दूध में मिलाते जाएं जब तक कि दूध गाढ़ी मलाईदार रबड़ी न बन जाए।',
          'अब इसमें मिठास के लिए गुड़ की खांड, इलायची और आधे मेवे डालकर २ मिनट पकाएं और फिर मिट्टी के बर्तन में रखकर ठंडा करें।',
          'परोसने से ठीक पहले, मलाईदार रबड़ी के ऊपर माटी गुड़ ठेकुआ का दरदरा चूरा फैलाएं। यह खस्ता कड़क क्रंच रबड़ी के स्वाद को सौ गुना बढ़ा देगा!'
        ],
        bho: [
          'लोहा चाहे पीतल क भारी कड़ाही में दूध के उबालीं। आँच एकदम मध्यम रखे के बा।',
          'दूध के लगातार चलावत रही अउर कड़ाई क कोना क मलाई निकाल के ओही में घोटत रहम जबले दूध एकदम गाढ़ा पीला रबड़ी लेखा ना हो जाय।',
          'अब ओकरा में गुड़, इलायची आ आधा काजू-बादाम डाल के मिलाईं अउर माटी क कुल्हड़ में रख के तनी ठंढा करीं।',
          'खाए क समय ठंढा रबड़ी पर माटी के सोंध ठेकुआ क खूब चूरा बिखेरीं। कड़क ठेकुआ क कुरकुरापन आ रबड़ी क मिठास सीधे बचपन क याद दिला दी!'
        ]
      },
      imageUrl: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'nimki-bhel',
      titles: {
        en: '🌶️ Spicy Guntur Nimki Bhel Chaat',
        hi: '🌶️ तीखी गुंटूर निमकी भेल चाट',
        bho: '🌶️ चटकार गुंटूर निमकी भेल चाट'
      },
      subtitle: {
        en: 'A legendary sweet-spicy-tangy street food salad incorporating flaky spiced Nimki ribbons in place of standard soggy puffed rice.',
        hi: 'साधारण भेल को कहें अलविदा, अपनाएं कुरकुरी मसालेदार खस्ता निमकी से बनी तीखी चटपटी सोंधी भेल चाट।',
        bho: 'मुरमुरा क जगह १६ परतदार खस्ता निमकी आ लाल मिर्च फ्लेक्स से बनल जीभ चटकारे लेवे वाली भेल।'
      },
      productRequiredId: 'spicy-nimki',
      prepTime: '10 mins',
      cookTime: '0 mins',
      difficulty: {
        en: 'Instant snack magic',
        hi: 'झटपट ५ मिनट में तैयार',
        bho: 'तुरंत झटपट बनल टिकोरा भेल'
      },
      ingredientsList: {
        en: [
          '150g Maati Teekha Guntur Nimki (broken slightly)',
          '1 boiled potato (aloo) cubed',
          '1 small red onion finely chopped',
          '1 ripe tomato finely deseeded and diced',
          '2 tbsp Sweet Tamarind Chutney',
          '1 tbsp Spicy Mint Coriander Chutney',
          'Fresh pomegranate seeds & fresh coriander leaves'
        ],
        hi: [
          '१५० ग्राम माटी तीखा गुंटूर निमकी (हल्का हाथ से तोड़ा हुआ)',
          '१ उबला हुआ आलू (बारीक कटा हुआ)',
          '१ छोटा लाल प्याज (एकदम बारीक कटा हुआ)',
          '१ पका हुआ टमाटर (बीज निकालकर कटा हुआ)',
          '२ बड़ी चम्मच खट्टी-मीठी इमली की चटनी',
          '१ बड़ी चम्मच पुदीने और हरी धनिया की तीखी चटनी',
          'ताजे अनार के दाने और कटी हुई हरी धनिया पत्ती'
        ],
        bho: [
          '१५० ग्राम माटी चटकार तीखा गुंटूर निमकी (हाथ से तनी सुखल तोरल)',
          '१ गो उबलाल आलू क छोटा चोकोर कतरन',
          '१ गो लाल प्याज दम महीन चॉप कइल',
          '१ गो टमाटर बारीक कटा हुआ',
          '२ चम्मच खट्टी-मीठी सुहावन इमली क चटनी',
          '१ चम्मच हरी पुदीना-धनिया क तीखी चटनी',
          'अनार क दाना आ ताज़ा हरी धनिया'
        ]
      },
      steps: {
        en: [
          'In a large mixing bowl, combine the cubed boiled potato, chopped red onions, and deseeded diced tomatoes.',
          'Drizzle the sweet brown-tamarind chutney and spicy mint-coriander green chutney over the vegetables.',
          'Toss carefully, then add the Maati Teekha Guntur Nimki flakes into the mixture. Mix quickly so the Nimki remains perfectly crunchy.',
          'Divide into leaf plates (dona), scatter fresh pomegranate pearls and green coriander on top, and eat immediately. Every bite has a spicy crimson kick!'
        ],
        hi: [
          'एक बड़े चमचे के साथ बड़े बर्तन में उबला आलू, लाल प्याज और टमाटर का कतरन तैयार करें।',
          'अब उसके ऊपर खट्टी-मीठी इमली की सौंधी चटनी और हरी पुदीने वाली तीखी चटनी छिड़कें।',
          'अच्छी तरह से हिलाएं, फिर अंत में हमारी माटी तीखा गुंटूर निमकी को हल्का तोड़कर मिलाएं ताकि निमकी का करारापन बना रहे।',
          'दोनों पत्तों (दोने) में सजाएं, ऊपर से लाल अनार के दाने व हरी धनिया छिड़ककर तुरंत परोसें।'
        ],
        bho: [
          'बड़ा कटोरा में आलू क टुकड़ा, प्याज आ टमाटर मिलाईं।',
          'ओह पर इमली क सोंध चटनी आ पुदीना-धनिया क चटकार हरी चटनी टपकाईं।',
          'सबके मिलाके, परोसे से तुरंत पहिले तीखा गुंटूर निमकी के तनी मोड़ के डाल देईं (जेसे निमकी क कड़क कुरकुरापन बनल रहे)।',
          'पत्ता क दोना में निकाल के अनार क लाल दाना छिड़कीं आ तुरंत चटखारे लेके खाईं।'
        ]
      },
      imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'masala-nimki-chaat',
      titles: {
        en: '🍵 Dadi’s Chai-Corner Masala Nimki Platter',
        hi: '🍵 शाम की चाय-चौपाल मसाला निमकी प्लैटर',
        bho: '🍵 सांझ क चाय-चौपाल मसाला निमकी थाली'
      },
      subtitle: {
        en: 'A spiced savory plate highlighting raw ginger, roasted spiced chickpeas, and flaky multi-layered nimki styled alongside wood-fired jaggery dry tea.',
        hi: 'कड़क कुल्हड़ चाय के स्वाद को बढ़ाने वाला शानदार पारम्परिक शाम का नाश्ता जिसमें १२ मसालों की निमकी का सोंधा मेल है।',
        bho: 'चाय-पानी क असली मज़ा! १२ मसाला क सुगन्धित निमकी क संग भुजल चना आ अदरख क सुगन्धित मेल।'
      },
      productRequiredId: 'masala-nimki',
      prepTime: '5 mins',
      cookTime: '10 mins',
      difficulty: {
        en: 'Instant Tea Mate',
        hi: 'चाय के समय का सबसे आसान साथी',
        bho: 'चाय क संगी तुरंत तैयार'
      },
      ingredientsList: {
        en: [
          '150g Maati 12-Spices Masala Nimki',
          '1/2 cup Roasted Desi Chickpeas (Bhuna Chana)',
          '1-inch piece of Fresh organic Ginger (sliced thin)',
          '2 Cardamom-scented Kulhad Jaggery Teas',
          'A sprinkle of rock salt and fresh lemon juice'
        ],
        hi: [
          '१५० ग्राम माटी १२-मसाला रिबन निमकी',
          'आधा कप भुने हुए छिलके वाले देसी चने',
          '१ टुकड़ा ताज़ा अदरक (पतला लच्छेदार कटा हुआ)',
          '२ कुल्हड़ इलायची और गुड़ वाली कड़क चाय',
          'हल्का सा सेंधा नमक और ताज़ा नींबू का रस'
        ],
        bho: [
          '१५० ग्राम माटी १२-मसाला रिबन निमकी',
          'आधा कप भुजल देसी चना',
          '१ इंच अदरख (दम पतला लंबा कटल)',
          '२ गो माटी क कुल्हड़ वाला अदरक-गुड़ क कड़क चाय',
          'तनी मुनी सेंधा नून आ नींबू क रस'
        ]
      },
      steps: {
        en: [
          'Brew your standard dark tea with lots of crushed ginger, green cardamom and authentic village jaggery until strongly aromatic.',
          'On a flat brass snack plate, arrange the crisp layered ribbons of Maati 12-Spices Masala Nimki on one side.',
          'Pour the dry bhuna chana alongside. Toss onions and ginger juliennes together with rock salt and lemon drops and place in the center.',
          'Hand over the piping hot kulhad teas. Sip, crunch, gossip, and let the traditional spicy aromas melt across your tongue.'
        ],
        hi: [
          'खूब सारे कुचले हुए अदरक, हरी इलायची और कोल्हू के गुड़ के साथ कड़क खुशबूदार कुल्हड़ चाय तैयार करें।',
          'पीतल या तांबे की सुंदर प्लेट में एक तरफ हमारी खुशबूदार १२-मसाला निमकी को करीने से सजाएं।',
          'साथ ही भुना चना रखें। कटी अदरक, सेंधा नमक और नींबू के रस को मिलाकर बीच में सजाएं।',
          'गरमा-गरम चाय कुल्हड़ में परोसें। हर निमकी का कुरकुरा बाइट शाम का दिन बना देगा!'
        ],
        bho: [
          'खूब कुचलल अदरख, हरी इलायची आ कोल्हू के गुड़ डालके सोंध कड़क चाय खौलाईं।',
          'पीतल क सुन्दर थाली में एक तरफ मसाला निमकी क सुन्दर कतार सजाईं।',
          'ओह क संग भुजल चना राखीं। अदरख क टुकड़ा पर सेंधा नून आ नींबू निचोड़ के बीच में सजाईं।',
          'अब गरमा-गरम कड़क कुल्हड़ चाय संग एक बाइट मसाला निमकी खाईं। सांझ क चाय क आनंद १०० गुना बढ़ जाई।'
        ]
      },
      imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleBuyNow = (productRequiredId: string) => {
    const matchedProduct = PRODUCTS.find(p => p.id === productRequiredId);
    if (matchedProduct) {
       onAddToCart(matchedProduct, 1);
      const name = language === 'en' ? matchedProduct.name : matchedProduct.name; // Simple
      setSuccessMsg(
        language === 'en'
          ? `Added ${name} to your cook basket! Opening cart...`
          : language === 'hi'
          ? `${name} को आपके कुकिंग बास्केट में सहेज दिया गया है! टोकरी खोल रहा है...`
          : `${name} के रउआ टोकरी में डाल देहल गेल बा! टोकरी चालू हो रहल बा...`
      );
      
      setTimeout(() => {
        setSuccessMsg(null);
        openCart();
      }, 1500);
    }
  };

  const toggleIngredient = (recipeId: string, index: number) => {
    const key = `${recipeId}-${index}`;
    setCheckedIngredients(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleAllIngredients = (recipeId: string, ingredients: string[]) => {
    const allChecked = ingredients.every((_, idx) => checkedIngredients[`${recipeId}-${idx}`]);
    const nextState: Record<string, boolean> = { ...checkedIngredients };
    ingredients.forEach((_, idx) => {
      nextState[`${recipeId}-${idx}`] = !allChecked;
    });
    setCheckedIngredients(nextState);
  };

  const copyShoppingList = (recipeId: string, recipeTitle: string, ingredients: string[]) => {
    const header = language === 'en' 
      ? `🛒 Kitchen Shopping List for: ${recipeTitle}\n` 
      : `🛒 रसोई खरीदारी सूची: ${recipeTitle}\n`;
    const body = ingredients.map((ing, idx) => {
      const isChecked = checkedIngredients[`${recipeId}-${idx}`];
      return `${isChecked ? '✅' : '⬜'} ${ing}`;
    }).join('\n');
    const footer = language === 'en'
      ? `\nProduced with organic love by Maati Traditional Snacks.`
      : `\nमाटी ट्रेडिशनल स्नेक्स द्वारा शुद्ध प्रेम से प्रस्तुत।`;
    
    const textToCopy = `${header}${body}${footer}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setSuccessMsg(
          language === 'en' 
            ? 'Shopping list copied to clipboard!' 
            : language === 'hi' 
            ? 'खरीदारी की सूची क्लिपबोर्ड पर कॉपी हो गई है!' 
            : 'खरीदारी सूची क्लिपबोर्ड पर कॉपी हो गइल बा!'
        );
        setTimeout(() => setSuccessMsg(null), 2500);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  const handlePrint = (recipe: CulinaryRecipe) => {
    // Elegant, modular overlay print injection ensuring no iframe/window blockages.
    // We append a custom print viewport on the document, perform browser print, and clean up.
    const printId = 'recipe-custom-print-layout';
    const oldContainer = document.getElementById(printId);
    if (oldContainer) {
      oldContainer.remove();
    }

    const printContainer = document.createElement('div');
    printContainer.id = printId;
    // Overlay styled preview
    printContainer.className = 'fixed inset-0 bg-stone-900/40 backdrop-blur-md z-[9999] p-4 sm:p-10 overflow-y-auto flex items-center justify-center font-sans print:absolute print:inset-0 print:p-0 print:bg-white print:backdrop-blur-none';
    
    // Add custom stylesheet dynamically
    const styleId = 'recipe-custom-print-style';
    const oldStyle = document.getElementById(styleId);
    if (oldStyle) {
      oldStyle.remove();
    }
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @media print {
        body > *:not(#${printId}) {
          display: none !important;
        }
        #${printId} {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          background: white !important;
          color: black !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .print-btn-no-display {
          display: none !important;
        }
        .print-wrapper-card {
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          background: transparent !important;
        }
      }
    `;
    
    const ingredientsHtml = recipe.ingredientsList[language]
      .map((ing, idx) => {
        const isChecked = !!checkedIngredients[`${recipe.id}-${idx}`];
        return `
          <li style="margin-bottom: 8px; font-size: 13.5px; list-style-type: none; display: flex; align-items: center; gap: 8px; color: ${isChecked ? '#888' : '#333'}">
            <span style="font-size: 14px;">${isChecked ? '☑' : '☐'}</span>
            <span style="text-decoration: ${isChecked ? 'line-through' : 'none'}">${ing}</span>
          </li>
        `;
      })
      .join('');
      
    const stepsHtml = recipe.steps[language]
      .map((step, idx) => `
        <li style="margin-bottom: 14px; font-size: 13px; line-height: 1.6; display: flex; gap: 12px; align-items: flex-start; color: #222;">
          <span style="font-weight: bold; background: #FAF6EE; border: 1px solid #EADCC6; border-radius: 50%; min-width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; font-family: monospace; font-size: 11px; color: #B45309;">${idx + 1}</span>
          <p style="margin: 0;">${step}</p>
        </li>
      `)
      .join('');
      
    printContainer.innerHTML = `
      <div class="print-wrapper-card bg-[#FBF9F4] rounded-3xl border-2 border-[#EADCC6] max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative space-y-6">
        
        <!-- Controls overlay context -->
        <div class="print-btn-no-display flex flex-wrap justify-between items-center gap-3 bg-[#EADCC6]/30 p-4 rounded-2xl border border-[#EADCC6]">
          <div className="space-y-0.5">
            <h4 style="margin: 0; color: #3F2E1E; font-weight: 800; font-size: 12px; font-family: sans-serif;">🖨️ PRINTER-FRIENDLY PREVIEW</h4>
            <p style="margin: 0; font-size: 10px; color: #857252;">Previewing direct raw recipe with ingredients & guidelines.</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="trigger-immediate-print" style="background: #B45309; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: bold; color: white; cursor: pointer; text-transform: uppercase;">Print Recipe</button>
            <button id="close-print-overlay" style="background: white; border: 1px solid #EADCC6; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: bold; color: #5C4D3C; cursor: pointer;">Close Preview</button>
          </div>
        </div>

        <div style="text-align: center; border-bottom: 2px solid #B45309; padding-bottom: 18px;">
          <span style="font-size: 9px; font-weight: 900; letter-spacing: 0.15em; color: #B45309; text-transform: uppercase; font-family: monospace;">🌾 Grandma's Kitchen Treasury 🌾</span>
          <h1 style="font-size: 22px; font-family: serif; font-weight: 900; color: #3F2E1E; margin: 4px 0 2px 0;">${recipe.titles[language]}</h1>
          <p style="font-size: 12px; font-style: italic; color: #857252; margin: 2px 0 10px 0; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.4;">${recipe.subtitle[language]}</p>
          <div style="display: flex; gap: 15px; justify-content: center; font-size: 11px; font-weight: bold; font-family: monospace; color: #3F2E1E;">
            <span>⏱️ Prep: ${recipe.prepTime}</span>
            <span>🔥 Cook: ${recipe.cookTime}</span>
            <span>⭐ Level: ${recipe.difficulty[language]}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
          <div>
            <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #999; padding-bottom: 4px; color: #B45309; font-weight: 800; letter-spacing: 0.05em; margin: 0 0 10px 0;">
              🛒 ${language === 'en' ? 'Kitchen Checklist' : 'आवश्यक सामग्री सूची'}
            </h3>
            <ul style="padding: 0; margin: 0;">
              ${ingredientsHtml}
            </ul>
          </div>

          <div>
            <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #999; padding-bottom: 4px; color: #B45309; font-weight: 800; letter-spacing: 0.05em; margin: 0 0 10px 0;">
              📖 ${language === 'en' ? 'Cooking Instructions' : 'बनाने की सरल विधि'}
            </h3>
            <ol style="padding: 0; margin: 0; list-style: none;">
              ${stepsHtml}
            </ol>
          </div>
        </div>

        <div style="padding: 12px 16px; background: #FFFDF9; border: 1px dashed #EADCC6; border-radius: 12px;">
          <h4 style="margin: 0 0 4px 0; color: #B45309; font-size: 10px; font-weight: 950; text-transform: uppercase; tracking: 0.05em; font-family: monospace;">👵 DADI MAA'S COOKING INSIGHT</h4>
          <p style="margin: 0; font-size: 11px; font-style: italic; color: #857252; line-height: 1.5;">
            ${language === 'en'
              ? 'Beta, let the snacks remain crunchy with slightly coarser crumb, do not soak them completely or boil them! It leaves a spectacular buttery crisp contrast inside the mouth sweetness.'
              : 'बेटा, हमारे स्वैक्स घी और गेहूं से गूंथे हैं, इन्हें पानी में मत उबालना! इन्हें खीर या चाट पर अंत में सजाएं ताकि खाते समय इनका शुद्ध देशी क्रंच मुँह में सोंधा स्वाद दे।'
            }
          </p>
        </div>

        <div style="text-align: center; padding-top: 10px; border-top: 1px solid #EADCC6; font-size: 10px; color: #A39E93; font-family: monospace;">
          <span>Printed via Maati Gifting & Traditional Kitchen Archive | Saran Village, Bihar</span>
        </div>
      </div>
    `;

    document.body.appendChild(printContainer);
    document.body.appendChild(style);

    // Setup events for buttons
    const triggerBtn = printContainer.querySelector('#trigger-immediate-print');
    const closeBtn = printContainer.querySelector('#close-print-overlay');

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        printContainer.remove();
        style.remove();
      });
    }

    // Auto-launch print view natively
    window.print();
  };

  const activeRecipe = RECIPES.find(r => r.id === selectedRecipeId) || RECIPES[0];
  const requiredProduct = PRODUCTS.find(p => p.id === activeRecipe.productRequiredId);

  return (
    <section id="traditional-recipes-section" className="py-12 bg-[#FAF6EE] border-t border-[#EADCC6]/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header styling */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-extrabold text-[#B45309] bg-[#EADCC6]/30 px-3 py-1 rounded-full inline-block">
            🍲 {language === 'en' ? 'Maati Royal Culinary Guides' : language === 'hi' ? 'दादी माँ की पवित्र रसोई गाथा' : 'दादी माई के रसदार विधि'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {language === 'en' ? 'Authentic Steps for Home-Cooked Meals' : language === 'hi' ? 'माटी स्नैक्स से बनाएं अनोखे लाजवाब पकवान' : 'माटी व्यंजनों से सजे स्वादिष्ट पकवान'}
          </h2>
          <p className="text-xs sm:text-sm text-[#857252] leading-relaxed">
            {language === 'en'
              ? 'Our snacks are fabulous standalone bites, but they also turn into absolute masterpieces inside these traditional regional culinary recipes.'
              : 'हमारे पारंपरिक नमकीन और मीठे ठेकुआ को केवल सीधे ही न खाएं, बल्कि दादी माँ द्वारा तैयार इन शास्त्रीय घरेलू विधियों से घर पर बनाएं उम्दा मिठाई और चटपटी चाट।'}
          </p>
        </div>

        {/* Floating Add to Cart Success Toast inside section */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-6 p-4 bg-emerald-700 text-white font-bold rounded-2xl shadow-xl flex items-center gap-3 text-sm max-w-md mx-auto"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-300 animate-bounce" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab triggers */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipeId(recipe.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-serif font-black transition-all border shadow-sm cursor-pointer focus:outline-none ${
                selectedRecipeId === recipe.id
                  ? 'bg-[#3F2E1E] text-[#F9F5EC] border-[#3F2E1E] scale-102 ring-2 ring-[#B45309]/20'
                  : 'bg-white text-[#5C4D3C] border-[#EADCC6] hover:bg-[#F9F5EC] hover:text-[#B45309]'
              }`}
            >
              {recipe.titles[language]}
            </button>
          ))}
        </div>

        {/* Display recipe details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRecipe.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FBF9F4] rounded-3xl border border-[#EADCC6] overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12"
          >
            
            {/* Visual left / banner */}
            <div className="lg:col-span-12 xl:col-span-5 relative min-h-[300px] lg:min-h-[480px] bg-amber-50">
              <img
                src={activeRecipe.imageUrl}
                alt={activeRecipe.titles[language]}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F9A825] bg-[#3F2E1E]/80 backdrop-blur-sm px-2.5 py-1 rounded inline-block self-start">
                  ⭐ {activeRecipe.difficulty[language]}
                </span>
                <h3 className="text-lg sm:text-2xl font-serif font-extrabold text-white leading-snug drop-shadow-md">
                  {activeRecipe.titles[language]}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-3 leading-relaxed">
                  {activeRecipe.subtitle[language]}
                </p>
                
                {/* Quick diagnostic stats bar */}
                <div className="pt-3 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>Prep: {activeRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span>Cook: {activeRecipe.cookTime}</span>
                    </div>
                  </div>
  
                  <button
                    onClick={() => handlePrint(activeRecipe)}
                    className="bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all text-[10px] uppercase tracking-wider font-mono font-black border border-white/20 py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer max-w-max"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-300" />
                    <span>{language === 'en' ? 'Print Recipe' : 'प्रिंट रेसिपी'}</span>
                  </button>
                </div>
              </div>
            </div>
  
            {/* Cooking ingredients and instructions right */}
            <div className="lg:col-span-12 xl:col-span-7 p-6 sm:p-8 lg:p-10 space-y-8 flex flex-col justify-between">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Col A: Ingredients with buy now product tag info */}
                <div className="md:col-span-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#EADCC6] pb-2">
                    <h4 className="text-sm font-serif font-black uppercase tracking-wider text-[#3F2E1E] flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#B45309]" />
                      <span>{language === 'en' ? 'Shopping Checklist' : 'सामग्री चेकलिस्ट'}</span>
                    </h4>
                  </div>
  
                  {/* Checklist helper controls */}
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <button 
                      onClick={() => toggleAllIngredients(activeRecipe.id, activeRecipe.ingredientsList[language])}
                      className="text-[#B45309] hover:underline font-black cursor-pointer"
                    >
                      ✦ {language === 'en' ? 'Select/Deselect All' : 'सभी चुनें / हटाएं'}
                    </button>
  
                    <button 
                      onClick={() => copyShoppingList(activeRecipe.id, activeRecipe.titles[language], activeRecipe.ingredientsList[language])}
                      className="text-emerald-700 hover:underline font-black flex items-center gap-1 cursor-pointer"
                    >
                      📋 {language === 'en' ? 'Share List' : 'सूची शेयर करें'}
                    </button>
                  </div>
  
                  <ul className="space-y-2">
                    {activeRecipe.ingredientsList[language].map((ing, idx) => {
                      const isChecked = !!checkedIngredients[`${activeRecipe.id}-${idx}`];
                      return (
                        <li 
                          key={idx} 
                          onClick={() => toggleIngredient(activeRecipe.id, idx)}
                          className="flex items-start gap-2.5 select-none py-1 px-1.5 hover:bg-[#FAF6EE] rounded-lg transition-colors cursor-pointer"
                        >
                          <div className={`w-4 h-4 mt-0.5 rounded border border-[#CBB393] flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#B45309] border-[#B45309]' : 'bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
                          </div>
                          <span className={`text-xs select-none transition-all duration-200 ${
                            isChecked ? 'text-zinc-400 line-through italic' : 'text-[#5C4D3C] font-semibold'
                          }`}>
                            {ing}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
  
                  {/* Highly aesthetic BUY NOW highlight block */}
                  {requiredProduct && (
                    <div className="p-4 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl border border-[#B45309]/20 space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#B45309]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                      <div>
                        <span className="text-[9px] font-mono font-extrabold uppercase text-[#B45309] block">
                          {language === 'en' ? 'Secret Ingredient Needed:' : 'इस विधि का गुप्त घटक उपलब्ध है:'}
                        </span>
                        <span className="text-xs font-serif font-black text-[#5C4D3C] block leading-tight">
                          {language === 'en' ? requiredProduct.name : requiredProduct.name}
                        </span>
                        <span className="text-sm font-mono font-extrabold text-[#B45309] block mt-0.5">
                          ₹{requiredProduct.price} <span className="text-[9px] text-[#857252] font-sans font-normal">/{requiredProduct.unit}</span>
                        </span>
                      </div>
  
                      <button
                        onClick={() => handleBuyNow(activeRecipe.productRequiredId)}
                        className="w-full h-9 bg-[#B45309] hover:bg-[#3F2E1E] text-white text-[10px] uppercase tracking-wider font-extrabold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow active:scale-95 focus:outline-none"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Buy Now' : 'ताजा आर्डर करें'}</span>
                      </button>
                    </div>
                  )}
                </div>
  
                {/* Col B: Step by Step Instructions */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-sm font-serif font-black uppercase tracking-wider text-[#3F2E1E] border-b border-[#EADCC6] pb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B45309]" />
                    <span>{language === 'en' ? 'Step-by-Step Guide' : 'बनाने की सरल विधि'}</span>
                  </h4>
                  <ol className="space-y-4">
                    {activeRecipe.steps[language].map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-xs leading-relaxed text-[#5C4D3C] font-medium">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#EADCC6]/45 text-[#B45309] font-mono font-black text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
  
              </div>
  
              {/* Grandma secret advice block */}
              <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-dashed border-[#EADCC6] flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">👵</span>
                <div className="space-y-1">
                  <h5 className="text-[10px] font-mono font-black uppercase text-[#B45309]">
                    {language === 'en' ? 'Dadi Maa’s Secret Cooking Tip:' : 'दादी माँ की रसोई हस्तरेखा:'}
                  </h5>
                  <p className="text-[11px] leading-relaxed text-[#857252] italic font-serif">
                    {language === 'en'
                      ? "Beta, let the snacks remain crunchy with slightly coarser crumb, do not soak them completely or boil them! It leaves a spectacular buttery crisp contrast inside the mouth sweetness."
                      : "बेटा, हमारे स्नैक्स घी और गेहूं से गूंथे हैं, इन्हें पानी में मत उबालना! इन्हें खीर या चाट पर अंत में सजाएं ताकि खाते समय इनका शुद्ध देशी क्रंच मुँह में सोंधा स्वाद दे।"}
                  </p>
                </div>
              </div>
  
            </div>
  
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

import { Question } from '../types';

export const SCHOOL_NAME_GU = "વાંકડીયા પ્રાથમિક શાળા";
export const SCHOOL_NAME_EN = "Vankadiya Primary School";
export const TEACHER_NAME_GU = "પ્રિયંકાબેન (Priyankaben)";
export const TEACHER_NAME_EN = "Priyankaben";
export const TARGET_GRADE = "ધોરણ - ૮ (Standard 8)";

// The 5 primary questions explicitly requested by user (priyankaben)
export const PRIYANKABEN_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    questionGu: "ભારતના વર્તમાન વડાપ્રધાન (Prime Minister) કોણ છે?",
    questionEn: "Who is our Prime Minister?",
    optionsGu: [
      "શ્રી નરેન્દ્ર મોદી",
      "શ્રી રાહુલ ગાંધી",
      "શ્રી અમિત શાહ",
      "ડૉ. મનમોહન સિંહ"
    ],
    optionsEn: [
      "Shri Narendra Modi",
      "Shri Rahul Gandhi",
      "Shri Amit Shah",
      "Dr. Manmohan Singh"
    ],
    correctAnswer: 0,
    explanationGu: "શ્રી નરેન્દ્ર દામોદરદાસ મોદી ભારતના ૧૪મા વડાપ્રધાન છે. તેઓ વર્ષ ૨૦૧૪ થી સતત ભારતના વડાપ્રધાન તરીકે કાર્યરત છે અને અગાઉ ગુજરાતના મુખ્યમંત્રી પણ રહી ચૂક્યા છે.",
    explanationEn: "Shri Narendra Damodardas Modi is the 14th Prime Minister of India, serving continuously since 2014.",
    categoryGu: "રાજકારણ અને શાસન",
    categoryEn: "Politics & Governance",
    factGu: "નરેન્દ્ર મોદી આઝાદ ભારતમાં જન્મેલા પ્રથમ વડાપ્રધાન છે.",
    factEn: "Shri Narendra Modi is the first Prime Minister of India born after Independence.",
    difficulty: "Standard 8"
  },
  {
    id: 2,
    questionGu: "આપણા રાષ્ટ્રપિતા (Father of the Nation) તરીકે કોણ ઓળખાય છે?",
    questionEn: "Who is our Father of the Nation?",
    optionsGu: [
      "સરદાર વલ્લભભાઈ પટેલ",
      "મહાત્મા ગાંધી (મોહનદાસ કરમચંદ ગાંધી)",
      "જવાહરલાલ નેહરુ",
      "સુભાષચંદ્ર બોઝ"
    ],
    optionsEn: [
      "Sardar Vallabhbhai Patel",
      "Mahatma Gandhi (Mohandas Karamchand Gandhi)",
      "Jawaharlal Nehru",
      "Subhas Chandra Bose"
    ],
    correctAnswer: 1,
    explanationGu: "મહાત્મા ગાંધીજીને ભારતના 'રાષ્ટ્રપિતા' કહેવામાં આવે છે. તેમણે સત્ય અને અહિંસાના માર્ગે ભારતને આઝાદી અપાવવામાં ઐતિહાસિક નેતૃત્વ પૂરું પાડ્યું હતું. સુભાષચંદ્ર બોઝે ૧૯૪૪ માં સિંગાપોરથી રેડિયો સંબોધનમાં તેમને સૌપ્રથમ 'રાષ્ટ્રપિતા' કહ્યા હતા.",
    explanationEn: "Mahatma Gandhi is revered as the Father of the Nation in India for leading the freedom movement through truth and non-violence.",
    categoryGu: "ભારતીય ઇતિહાસ",
    categoryEn: "Indian History",
    factGu: "ગાંધીજીનો જન્મ ૨ ઓક્ટોબર ૧૮૬૯ ના રોજ પોરબંદર, ગુજરાતમાં થયો હતો. દર વર્ષે ૨ ઓક્ટોબરને 'આંતરરાષ્ટ્રીય અહિંસા દિવસ' તરીકે ઉજવાય છે.",
    factEn: "Gandhiji was born on October 2, 1869 in Porbandar, Gujarat, celebrated worldwide as International Non-Violence Day.",
    difficulty: "Standard 8"
  },
  {
    id: 3,
    questionGu: "ગુજરાત રાજ્યના વર્તમાન મુખ્યમંત્રી (Chief Minister) કોણ છે?",
    questionEn: "Who is our Chief Minister?",
    optionsGu: [
      "શ્રી ભૂપેન્દ્રભાઈ પટેલ",
      "શ્રી વિજયભાઈ રૂપાણી",
      "શ્રી આનંદીબેન પટેલ",
      "શ્રી નરેન્દ્ર મોદી"
    ],
    optionsEn: [
      "Shri Bhupendrabhai Patel",
      "Shri Vijay Rupani",
      "Smt. Anandiben Patel",
      "Shri Narendra Modi"
    ],
    correctAnswer: 0,
    explanationGu: "શ્રી ભૂપેન્દ્રભાઈ પટેલ ગુજરાત રાજ્યના ૧૭મા મુખ્યમંત્રી છે. તેઓ અમદાવાદના ઘાટલોડિયા મતવિસ્તારના ધારાસભ્ય છે.",
    explanationEn: "Shri Bhupendrabhai Patel is the current (17th) Chief Minister of Gujarat.",
    categoryGu: "ગુજરાત શાસન",
    categoryEn: "Gujarat Governance",
    factGu: "ગુજરાતના પ્રથમ મુખ્યમંત્રી ડૉ. જીવરાજ નારાયણ મહેતા હતા (૧૯૬૦).",
    factEn: "The first Chief Minister of Gujarat was Dr. Jivraj Narayan Mehta (1960).",
    difficulty: "Standard 8"
  },
  {
    id: 4,
    questionGu: "ભારતમાં કયા શહેરને 'ગુલાબી નગરી' (Pink City) તરીકે ઓળખવામાં આવે છે?",
    questionEn: "Which city is known as the 'Pink City'?",
    optionsGu: [
      "ઉદયપુર (Udaipur)",
      "જયપુર (Jaipur)",
      "જોધપુર (Jodhpur)",
      "અમદાવાદ (Ahmedabad)"
    ],
    optionsEn: [
      "Udaipur",
      "Jaipur",
      "Jodhpur",
      "Ahmedabad"
    ],
    correctAnswer: 1,
    explanationGu: "રાજસ્થાનની રાજધાની 'જયપુર' ને 'પિંક સિટી' (Pink City - ગુલાબી નગરી) કહેવાય છે. વર્ષ ૧૮૭૬ માં પ્રિન્સ ઓફ વેલ્સના સ્વાગત માટે મહારાજા સવાઈ રામસિંહે આખા શહેરને આતિથ્યના પ્રતીક તરીકે ગુલાબી રંગે રંગાવ્યું હતું.",
    explanationEn: "Jaipur, the capital of Rajasthan, is known as the 'Pink City'. In 1876, Maharaja Sawai Ram Singh painted the entire city pink (the color of hospitality) to welcome the Prince of Wales.",
    categoryGu: "ભારતીય ભૂગોળ",
    categoryEn: "Indian Geography",
    factGu: "જયપુર યુનેસ્કો વર્લ્ડ હેરિટેજ સાઇટ (વિશ્વ ધરોહર સ્થળ) તરીકે જાહેર થયેલું છે. જયપુરના હવામહલ અને આમેર કિલ્લો વિશ્વપ્રસિદ્ધ છે.",
    factEn: "Jaipur is a designated UNESCO World Heritage city, famous for Hawa Mahal and Amer Fort.",
    difficulty: "Standard 8"
  },
  {
    id: 5,
    questionGu: "ભારતની રાષ્ટ્રીય નદી (National River) કઈ છે?",
    questionEn: "Which river is our National River?",
    optionsGu: [
      "યમુના નદી (Yamuna River)",
      "નર્મદા નદી (Narmada River)",
      "ગંગા નદી (Ganga River)",
      "બ્રહ્મપુત્રા નદી (Brahmaputra River)"
    ],
    optionsEn: [
      "Yamuna River",
      "Narmada River",
      "Ganga River",
      "Brahmaputra River"
    ],
    correctAnswer: 2,
    explanationGu: "ગંગા નદી ભારતની રાષ્ટ્રીય નદી છે. ભારત સરકારે વર્ષ ૨૦૦૮ માં ગંગાને સત્તાવાર રીતે 'રાષ્ટ્રીય નદી' નો દરજ્જો આપ્યો હતો. તે ભારતની સૌથી લાંબી નદી (લગભગ ૨,૫૨૫ કિમી) છે અને હિમાલયના ગંગોત્રી હિમનદીમાંથી ભગીરથી રૂપે નીકળે છે.",
    explanationEn: "The Ganga (Ganges) is the National River of India, declared in 2008. It is India's longest river flowing over 2,525 km.",
    categoryGu: "નદીઓ અને ભૂગોળ",
    categoryEn: "Rivers & Geography",
    factGu: "ગંગા નદીમાં જોવા મળતી 'ગંગા ડોલ્ફિન' (Gangetic Dolphin) ભારતનું રાષ્ટ્રીય જળચર પ્રાણી (National Aquatic Animal) છે.",
    factEn: "The Gangetic River Dolphin found in the Ganga is India's National Aquatic Animal.",
    difficulty: "Standard 8"
  }
];

// Additional curriculum Standard 8 questions to complete the 10-question set
export const ADDITIONAL_STD_8_QUESTIONS: Question[] = [
  {
    id: 6,
    questionGu: "ભારતના બંધારણના ઘડવૈયા અને 'બંધારણના પિતા' તરીકે કોણ ઓળખાય છે?",
    questionEn: "Who is known as the 'Father of the Indian Constitution'?",
    optionsGu: [
      "મહાત્મા ગાંધી",
      "ડૉ. બાબાસાહેબ આંબેડકર",
      "સરદાર વલ્લભભાઈ પટેલ",
      "જવાહરલાલ નેહરુ"
    ],
    optionsEn: [
      "Mahatma Gandhi",
      "Dr. Babasaheb Ambedkar",
      "Sardar Vallabhbhai Patel",
      "Jawaharlal Nehru"
    ],
    correctAnswer: 1,
    explanationGu: "ડૉ. ભીમરાવ રામજી આંબેડકર ભારતીય બંધારણની મુસદ્દા (ડ્રાફ્ટિંગ) સમિતિના અધ્યક્ષ હતા. તેમના અથાક પ્રયાસોને લીધે તેમને ભારતીય બંધારણના પિતા કહેવામાં આવે છે.",
    explanationEn: "Dr. B. R. Ambedkar was the Chairman of the Constitution Drafting Committee and is revered as the Father of the Indian Constitution.",
    categoryGu: "ઇતિહાસ અને બંધારણ",
    categoryEn: "History & Civics",
    factGu: "ભારતમાં દર વર્ષે ૨૬ નવેમ્બરે 'રાષ્ટ્રીય બંધારણ દિવસ' ઉજવાય છે.",
    factEn: "November 26 is celebrated every year as National Constitution Day in India.",
    difficulty: "Standard 8"
  },
  {
    id: 7,
    questionGu: "ગુજરાતમાં નર્મદા નદી પર આવેલી વિશ્વની સૌથી ઊંચી પ્રતિમા કઈ છે?",
    questionEn: "Which is the world's tallest statue located on the Narmada River in Gujarat?",
    optionsGu: [
      "સ્ટેચ્યુ ઓફ લિબર્ટી",
      "સ્ટેચ્યુ ઓફ યુનિટી (એકતા પ્રતિમા)",
      "સ્ટેચ્યુ ઓફ ઈક્વાલિટી",
      "બુદ્ધ પ્રતિમા"
    ],
    optionsEn: [
      "Statue of Liberty",
      "Statue of Unity",
      "Statue of Equality",
      "Spring Temple Buddha"
    ],
    correctAnswer: 1,
    explanationGu: "સ્ટેચ્યુ ઓફ યુનિટી લોખંડી પુરુષ સરદાર વલ્લભભાઈ પટેલની ૧૮૨ મીટર (૫૯૭ ફૂટ) ઊંચી પ્રતિમા છે. તે ગુજરાતના નર્મદા જિલ્લાના કેવડિયા (એકતા નગર) ખાતે આવેલી છે.",
    explanationEn: "The Statue of Unity is a 182-metre (597 ft) colossal statue of Sardar Vallabhbhai Patel, located at Kevadia (Ekta Nagar), Gujarat.",
    categoryGu: "ગુજરાત વિશેષ",
    categoryEn: "Gujarat Pride",
    factGu: "૧૮૨ મીટર ઊંચાઈ એ ગુજરાત વિધાનસભાની કુલ ૧૮૨ બેઠકોનું પ્રતીક છે.",
    factEn: "The 182-meter height symbolizes the 182 legislative assembly seats of Gujarat.",
    difficulty: "Standard 8"
  },
  {
    id: 8,
    questionGu: "સમગ્ર વિશ્વમાં 'એશિયાટિક સિંહ' (Gir Lion) નું એકમાત્ર કુદરતી નિવાસસ્થાન ગુજરાતનું કયું રાષ્ટ્રીય ઉદ્યાન છે?",
    questionEn: "Which national park in Gujarat is the only natural habitat of the Asiatic Lion in the entire world?",
    optionsGu: [
      "કાઝીરંગા રાષ્ટ્રીય ઉદ્યાન",
      "ગીર રાષ્ટ્રીય ઉદ્યાન (સાસણ ગીર)",
      "જિમ કોર્બેટ રાષ્ટ્રીય ઉદ્યાન",
      "વેળાવદર કાળિયાર રાષ્ટ્રીય ઉદ્યાન"
    ],
    optionsEn: [
      "Kaziranga National Park",
      "Gir National Park (Sasan Gir)",
      "Jim Corbett National Park",
      "Velavadar Blackbuck National Park"
    ],
    correctAnswer: 1,
    explanationGu: "ગીર રાષ્ટ્રીય ઉદ્યાન અને અભયારણ્ય સૌરાષ્ટ્ર વિસ્તારમાં આવેલું છે, જે વિશ્વમાં એશિયાટિક સિંહોનું એકમાત્ર ઘર છે.",
    explanationEn: "Gir National Park and Wildlife Sanctuary in Gujarat is the only natural habitat of Asiatic Lions across the globe.",
    categoryGu: "પર્યાવરણ અને પ્રાણીસૃષ્ટિ",
    categoryEn: "Environment & Wildlife",
    factGu: "દર વર્ષે ૧૦ ઓગસ્ટના રોજ 'વિશ્વ સિંહ દિવસ' (World Lion Day) ઉજવવામાં આવે છે.",
    factEn: "August 10 is observed globally as World Lion Day.",
    difficulty: "Standard 8"
  },
  {
    id: 9,
    questionGu: "ઓગસ્ટ ૨૦૨૩ માં ચંદ્રના દક્ષિણ ધ્રુવ પર સફળ સોફ્ટ લેન્ડિંગ કરનાર ભારતના અવકાશ મિશનનું નામ શું હતું?",
    questionEn: "What was the name of India's historic space mission that successfully soft-landed near the South Pole of the Moon in August 2023?",
    optionsGu: [
      "ચંદ્રયાન-૨",
      "મંગળયાન (MOM)",
      "ચંદ્રયાન-૩",
      "આદિત્ય-L1"
    ],
    optionsEn: [
      "Chandrayaan-2",
      "Mangalyaan (MOM)",
      "Chandrayaan-3",
      "Aditya-L1"
    ],
    correctAnswer: 2,
    explanationGu: "ઇસરો (ISRO) દ્વારા ૨૩ ઓગસ્ટ ૨૦૨૩ ના રોજ ચંદ્રયાન-૩ ના વિક્રમ લેન્ડરે ચંદ્રના દક્ષિણ ધ્રુવ નજીક સફળ ઉતરાણ કર્યું હતું. ભારત આ સિદ્ધિ મેળવનાર પ્રથમ દેશ બન્યો.",
    explanationEn: "On August 23, 2023, ISRO's Chandrayaan-3 achieved a historic soft landing near the Moon's South Pole.",
    categoryGu: "વિજ્ઞાન અને અવકાશ",
    categoryEn: "Science & Space",
    factGu: "આ ઐતિહાસિક સિદ્ધિના માનમાં ૨૩ ઓગસ્ટને ભારતમાં 'રાષ્ટ્રીય અવકાશ દિવસ' (National Space Day) જાહેર કરાયો છે.",
    factEn: "India now celebrates August 23 as National Space Day.",
    difficulty: "Standard 8"
  },
  {
    id: 10,
    questionGu: "ભારતીય લોકશાહીમાં નાગરિકો માટે મતાધિકાર (વોટ આપવા) માટેની લઘુત્તમ વયમર્યાદા કેટલી નક્કી કરેલી છે?",
    questionEn: "What is the minimum age required for a citizen to vote in Indian democratic elections?",
    optionsGu: [
      "૧૬ વર્ષ (16 Years)",
      "૧૮ વર્ષ (18 Years)",
      "૨૧ વર્ષ (21 Years)",
      "૨૫ વર્ષ (25 Years)"
    ],
    optionsEn: [
      "16 Years",
      "18 Years",
      "21 Years",
      "25 Years"
    ],
    correctAnswer: 1,
    explanationGu: "ભારતમાં ૧૮ વર્ષ કે તેથી વધુ ઉંમરના દરેક નાગરિકને સાર્વત્રિક પુખ્ત મતાધિકાર પ્રાપ્ત છે (૬૧મો બંધારણીય સુધારો, ૧૯૮૯).",
    explanationEn: "In India, universal adult suffrage allows any citizen aged 18 or above to vote in elections.",
    categoryGu: "નાગરિકશાસ્ત્ર અને રાજકારણ",
    categoryEn: "Civics & Governance",
    factGu: "ભારતમાં દર વર્ષે ૨૫ જાન્યુઆરીએ 'રાષ્ટ્રીય મતદાતા દિવસ' (National Voters' Day) ઉજવવામાં આવે છે.",
    factEn: "January 25 is celebrated as National Voters' Day across India.",
    difficulty: "Standard 8"
  }
];

// Combine to form the default full 10-question set
export const STD_8_GK_QUESTIONS: Question[] = [
  ...PRIYANKABEN_QUIZ_QUESTIONS,
  ...ADDITIONAL_STD_8_QUESTIONS
];

export const BONUS_QUESTIONS_GUJARAT: Question[] = [
  {
    id: 11,
    questionGu: "સૌરમંડળના કયા ગ્રહને તેની સપાટી પર રહેલા આયર્ન ઓક્સાઈડના કારણે 'લાલ ગ્રહ' (Red Planet) કહેવામાં આવે છે?",
    questionEn: "Which planet in the solar system is known as the 'Red Planet' due to iron oxide on its surface?",
    optionsGu: [
      "બુધ (Mercury)",
      "શુક્ર (Venus)",
      "મંગળ (Mars)",
      "ગુરુ (Jupiter)"
    ],
    optionsEn: [
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter"
    ],
    correctAnswer: 2,
    explanationGu: "મંગળ ગ્રહની માટી અને ખડકોમાં વિપુલ પ્રમાણમાં આયર્ન ઓક્સાઈડ હોવાથી તે લાલ રંગનો દેખાય છે.",
    explanationEn: "Mars appears reddish because of widespread iron oxide on its surface.",
    categoryGu: "ખગોળ વિજ્ઞાન",
    categoryEn: "Astronomy",
    factGu: "મંગળ પર સૌરમંડળનો સૌથી મોટો પર્વત 'ઓલિમ્પસ મોન્સ' છે.",
    factEn: "Mars hosts Olympus Mons, the largest volcano in the solar system.",
    difficulty: "Standard 8"
  },
  {
    id: 12,
    questionGu: "ગુજરાતની સૌથી લાંબી અને પવિત્ર ગણાતી નદી કઈ છે, જેને 'રેવા' પણ કહેવાય છે?",
    questionEn: "Which is the longest river in Gujarat, also revered by the name 'Rewa'?",
    optionsGu: [
      "સાબરમતી નદી",
      "તાપી નદી",
      "નર્મદા નદી",
      "મહી નદી"
    ],
    optionsEn: [
      "Sabarmati River",
      "Tapi River",
      "Narmada River",
      "Mahi River"
    ],
    correctAnswer: 2,
    explanationGu: "નર્મદા નદી ગુજરાતની જીવાદોરી ગણાય છે. તેના પર સરદાર સરોવર ડેમ આવેલો છે.",
    explanationEn: "Narmada is considered the lifeline of Gujarat and hosts the massive Sardar Sarovar Dam.",
    categoryGu: "ગુજરાત ભૂગોળ",
    categoryEn: "Gujarat Geography",
    factGu: "નર્મદા નદી અમરકંટકમાંથી નીકળીને ખંભાતના અખાતમાં મળે છે.",
    factEn: "Narmada originates from Amarkantak and empties into the Gulf of Khambhat.",
    difficulty: "Standard 8"
  }
];

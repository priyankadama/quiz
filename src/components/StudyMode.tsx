import React, { useState } from 'react';
import { Question, LanguageMode } from '../types';
import { soundManager } from '../utils/audio';
import { SCHOOL_NAME_GU, SCHOOL_NAME_EN, TARGET_GRADE } from '../data/quizData';
import {
  Volume2,
  Copy,
  Check,
  Search,
  Filter,
  Lightbulb,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface StudyModeProps {
  questions: Question[];
  languageMode: LanguageMode;
  onStartQuiz: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({
  questions,
  languageMode,
  onStartQuiz,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(questions.map((q) => q.categoryGu)))];

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.categoryGu === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      q.questionGu.toLowerCase().includes(query) ||
      q.questionEn.toLowerCase().includes(query) ||
      q.explanationGu.toLowerCase().includes(query) ||
      q.optionsGu.some((opt) => opt.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const handleCopySingle = (q: Question) => {
    soundManager.playClick();
    const letters = ['A', 'B', 'C', 'D'];
    const optionsText = q.optionsGu.map((opt, i) => `[${letters[i]}] ${opt}`).join('\n');
    const fullText = `શાળા: ${SCHOOL_NAME_GU} (${TARGET_GRADE})\nપ્રશ્ન ${q.id}: ${q.questionGu}\n${optionsText}\nસાચો જવાબ: [${letters[q.correctAnswer]}] ${q.optionsGu[q.correctAnswer]}\nસમજૂતી: ${q.explanationGu}\nવિશેષ તથ્ય: ${q.factGu}`;

    navigator.clipboard.writeText(fullText);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    soundManager.playClick();
    const letters = ['A', 'B', 'C', 'D'];
    const header = `=== ${SCHOOL_NAME_GU} - ${TARGET_GRADE} ===\nસામાન્ય જ્ઞાન (GK) ૧૦ પ્રશ્નો અને જવાબો\n\n`;

    const body = questions
      .map((q, idx) => {
        const optionsText = q.optionsGu.map((opt, i) => `  (${letters[i]}) ${opt}`).join('\n');
        return `પ્રશ્ન ${idx + 1}: ${q.questionGu}\n${optionsText}\n✔ સાચો જવાબ: (${letters[q.correctAnswer]}) ${q.optionsGu[q.correctAnswer]}\n💡 સમજૂતી: ${q.explanationGu}\n📌 વિશેષ માહિતી: ${q.factGu}\n----------------------------------`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(header + body);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{SCHOOL_NAME_GU}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-800">{TARGET_GRADE}</span>
              <span aria-hidden="true">·</span>
              <span>સામાન્ય જ્ઞાન માર્ગદર્શિકા</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              ધોરણ ૮ સામાન્ય જ્ઞાન: ૧૦ પ્રશ્નો અને ઉત્તરોની યાદી
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              વિદ્યાર્થીઓ માટે આ તમામ પ્રશ્નોનું વિગતવાર વાંચન, સમજૂતી અને અગત્યના તથ્યો સાથે સંકલન. શિક્ષકો અને વિદ્યાર્થીઓ અહીંથી સીધા અભ્યાસ કરી શકે છે.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyAll}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
              <span>{copiedAll ? 'બધું કૉપી થયું!' : 'બધા પ્રશ્નો કૉપી કરો'}</span>
            </button>
            <button
              type="button"
              onClick={onStartQuiz}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>ક્વિઝ આપો 🎯</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="પ્રશ્ન અથવા વિષય શોધો... (Search question, topic or answer)"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-stone-900 border-stone-900 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {cat === 'all' ? 'બધા વિષયો' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Listing */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const letters = ['A', 'B', 'C', 'D'];
          const isSingleCopied = copiedId === q.id;

          return (
            <article
              key={q.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm"
            >
              {/* Question Metadata Line */}
              <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-900">પ્રશ્ન ક્રમાંક: {q.id}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-stone-700">{q.categoryGu}</span>
                  <span aria-hidden="true">·</span>
                  <span>{q.difficulty}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => soundManager.speakText(
                      languageMode === 'en' ? q.questionEn : q.questionGu,
                      languageMode === 'en' ? 'en' : 'gu'
                    )}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    title="પ્રશ્ન સાંભળો"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopySingle(q)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    title="પ્રશ્ન અને જવાબ કૉપી કરો"
                  >
                    {isSingleCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Question Heading */}
              <div className="mb-4">
                {(languageMode === 'gu' || languageMode === 'both') && (
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {q.id}. {q.questionGu}
                  </h3>
                )}
                {(languageMode === 'en' || languageMode === 'both') && (
                  <p className={`text-sm font-medium text-stone-600 ${languageMode === 'both' ? 'mt-1' : ''}`}>
                    {q.id}. {q.questionEn}
                  </p>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {q.optionsGu.map((optGu, optIdx) => {
                  const isCorrect = optIdx === q.correctAnswer;
                  const optEn = q.optionsEn[optIdx];

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                        isCorrect
                          ? 'border-emerald-400 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-300'
                          : 'border-stone-200 bg-stone-50/40 text-stone-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {letters[optIdx]}
                      </span>
                      <div className="flex-1">
                        <div>{optGu}</div>
                        {languageMode === 'both' && (
                          <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                            {optEn}
                          </div>
                        )}
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Verified Correct Answer & Explanation */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm space-y-2">
                <div className="text-emerald-900 font-semibold flex items-center gap-1.5">
                  <span className="text-stone-900 font-bold">સાચો જવાબ:</span>
                  <span>[{letters[q.correctAnswer]}] {q.optionsGu[q.correctAnswer]}</span>
                  <span className="text-xs text-stone-500">({q.optionsEn[q.correctAnswer]})</span>
                </div>

                <div className="text-stone-700 leading-relaxed">
                  <span className="font-semibold text-stone-900">સમજૂતી: </span>
                  {languageMode === 'en' ? q.explanationEn : q.explanationGu}
                </div>

                <div className="flex items-start gap-1.5 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200/70 font-medium">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">વિશેષ સામાન્ય જ્ઞાન: </span>
                    {languageMode === 'en' ? q.factEn : q.factGu}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Question, LanguageMode } from '../types';
import { soundManager } from '../utils/audio';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Volume2,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface FlashcardModeProps {
  questions: Question[];
  languageMode: LanguageMode;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({
  questions,
  languageMode,
}) => {
  const [deck, setDeck] = useState<Question[]>(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const currentQ = deck[currentIndex];
  const isMastered = masteredIds.includes(currentQ.id);
  const letters = ['A', 'B', 'C', 'D'];

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    soundManager.playClick();
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: number) => {
    soundManager.playClick();
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter((item) => item !== id));
    } else {
      soundManager.playCorrect();
      setMasteredIds([...masteredIds, id]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            સ્મૃતિ પત્તા (GK Flashcards)
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
            <span>કાર્ડ {currentIndex + 1} / {deck.length}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">યાદ રહી ગયું: {masteredIds.length}/{deck.length}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold transition-colors"
          title="કાર્ડ બદલો (Shuffle)"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>શફલ કરો</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={handleFlip}
        className="w-full min-h-[340px] cursor-pointer select-none perspective-1000 mb-6 group"
      >
        <div
          className={`relative w-full min-h-[340px] rounded-2xl border transition-all duration-500 transform-style-3d p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md ${
            isFlipped
              ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300/50'
              : 'bg-white border-stone-200'
          }`}
        >
          {/* Card Top Banner */}
          <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-amber-900">પ્રશ્ન {currentQ.id}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-stone-700">{currentQ.categoryGu}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.speakText(
                    isFlipped
                      ? `સાચો જવાબ: ${currentQ.optionsGu[currentQ.correctAnswer]}. ${currentQ.explanationGu}`
                      : currentQ.questionGu,
                    languageMode === 'en' ? 'en' : 'gu'
                  );
                }}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                title="વાંચી સંભળાવો"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-stone-400 italic">
                {isFlipped ? '(ઉત્તર તરફ)' : '(પ્રશ્ન તરફ)'}
              </span>
            </div>
          </div>

          {/* Card Content Area */}
          <div className="py-6 my-auto text-center">
            {!isFlipped ? (
              // FRONT SIDE: The Question
              <div>
                <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 mx-auto flex items-center justify-center font-bold text-sm mb-4">
                  ?
                </div>
                {(languageMode === 'gu' || languageMode === 'both') && (
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                    {currentQ.questionGu}
                  </h3>
                )}
                {(languageMode === 'en' || languageMode === 'both') && (
                  <p className={`text-base font-medium text-stone-600 ${languageMode === 'both' ? 'mt-2' : ''}`}>
                    {currentQ.questionEn}
                  </p>
                )}
                <div className="mt-6 text-xs text-stone-400">
                  👆 જવાબ જોવા માટે કાર્ડ પર ક્લિક કરો (Click to Flip)
                </div>
              </div>
            ) : (
              // BACK SIDE: The Answer & Explanation
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-800 font-bold mb-1">
                  સાચો જવાબ (Correct Answer)
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-3 text-emerald-950">
                  {currentQ.optionsGu[currentQ.correctAnswer]}
                </div>
                <div className="text-sm font-semibold text-stone-600 mb-4">
                  {currentQ.optionsEn[currentQ.correctAnswer]}
                </div>

                <div className="text-xs sm:text-sm text-stone-700 bg-white/80 p-3 rounded-xl border border-amber-200/80 mb-3 text-left">
                  <span className="font-bold text-stone-900">સમજૂતી: </span>
                  {languageMode === 'en' ? currentQ.explanationEn : currentQ.explanationGu}
                </div>

                <div className="text-xs text-amber-900 bg-amber-100/70 p-2.5 rounded-lg border border-amber-200 text-left font-medium">
                  💡 <span className="font-bold">વિશેષ તથ્ય: </span>
                  {languageMode === 'en' ? currentQ.factEn : currentQ.factGu}
                </div>
              </div>
            )}
          </div>

          {/* Card Bottom Indicator */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-400">ધોરણ ૮ સામાન્ય જ્ઞાન</span>
            <span className="text-amber-800 font-medium">વાંકડીયા પ્રાથમિક શાળા</span>
          </div>
        </div>
      </div>

      {/* Navigation & Mastery Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>અગાઉનું</span>
        </button>

        <button
          type="button"
          onClick={() => toggleMastered(currentQ.id)}
          className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
            isMastered
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'border-stone-300 text-stone-700 hover:bg-stone-100'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isMastered ? 'મને યાદ રહી ગયું ✅' : 'યાદ રહી ગયું?'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>આગળનું</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

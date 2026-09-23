import React, { useState, useEffect } from 'react';
import { Question, LanguageMode } from '../types';
import { SCHOOL_NAME_GU, SCHOOL_NAME_EN, TEACHER_NAME_GU, TEACHER_NAME_EN, TARGET_GRADE } from '../data/quizData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Timer,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface QuizModeProps {
  questions: Question[];
  languageMode: LanguageMode;
  onOpenCertificate: (score: number, total: number) => void;
  onSwitchToStudy: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({
  questions,
  languageMode,
  onOpenCertificate,
  onSwitchToStudy,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<number, number[]>>({});
  const [hintsUsed, setHintsUsed] = useState<Record<number, boolean>>({});
  const [lifelinesAvailable, setLifelinesAvailable] = useState({
    fiftyFifty: true,
    hint: true,
  });
  const [quizModeType, setQuizModeType] = useState<'practice' | 'exam'>('practice');
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reviewedMistakesOnly, setReviewedMistakesOnly] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  // Countdown timer when enabled
  useEffect(() => {
    if (!timerEnabled || isCompleted) return;
    if (selectedAnswers[currentQ.id] !== undefined) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Time out for current question: auto advance or mark unanswered
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerEnabled, currentIndex, selectedAnswers, currentQ.id, isCompleted]);

  // Reset timer on question change
  useEffect(() => {
    setSecondsRemaining(30);
  }, [currentIndex]);

  // Trigger celebration on completion
  useEffect(() => {
    if (isCompleted) {
      soundManager.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback
      }
    }
  }, [isCompleted]);

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return; // Already answered

    soundManager.playClick();
    const isCorrect = optionIndex === currentQ.correctAnswer;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));

    if (quizModeType === 'practice') {
      if (isCorrect) {
        soundManager.playCorrect();
      } else {
        soundManager.playIncorrect();
      }
    }

    // Check if this was the last question in exam mode
    const answeredCount = Object.keys(selectedAnswers).length + 1;
    if (answeredCount >= totalQuestions && quizModeType === 'exam') {
      setTimeout(() => setIsCompleted(true), 600);
    }
  };

  // 50:50 Lifeline logic
  const handleUseFiftyFifty = () => {
    if (!lifelinesAvailable.fiftyFifty || selectedAnswers[currentQ.id] !== undefined) return;

    soundManager.playClick();
    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== currentQ.correctAnswer);
    // Shuffle and pick 2 to eliminate
    const shuffled = [...wrongIndices].sort(() => Math.random() - 0.5);
    const toEliminate = shuffled.slice(0, 2);

    setEliminatedOptions((prev) => ({
      ...prev,
      [currentQ.id]: toEliminate,
    }));

    setLifelinesAvailable((prev) => ({ ...prev, fiftyFifty: false }));
  };

  // Hint Lifeline logic
  const handleUseHint = () => {
    if (!lifelinesAvailable.hint || selectedAnswers[currentQ.id] !== undefined) return;
    soundManager.playClick();
    setHintsUsed((prev) => ({ ...prev, [currentQ.id]: true }));
    setLifelinesAvailable((prev) => ({ ...prev, hint: false }));
  };

  const handleResetQuiz = () => {
    soundManager.playClick();
    setSelectedAnswers({});
    setEliminatedOptions({});
    setHintsUsed({});
    setLifelinesAvailable({ fiftyFifty: true, hint: true });
    setCurrentIndex(0);
    setIsCompleted(false);
    setReviewedMistakesOnly(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentAnswered = selectedAnswers[currentQ.id] !== undefined;
  const isCurrentCorrect = selectedAnswers[currentQ.id] === currentQ.correctAnswer;
  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  // Completion Screen
  if (isCompleted) {
    let performanceLabelGu = "ઉત્તમ પ્રયાસ!";
    let performanceLabelEn = "Good Effort!";
    if (percentage >= 90) {
      performanceLabelGu = "અસાધારણ! સુવર્ણ સિદ્ધિ (Outstanding!)";
      performanceLabelEn = "Outstanding Gold Achievement!";
    } else if (percentage >= 70) {
      performanceLabelGu = "ખૂબ સરસ! સુંદર પ્રદર્શન (Very Good!)";
      performanceLabelEn = "Very Good Performance!";
    } else if (percentage >= 50) {
      performanceLabelGu = "સંતોષકારક! વધુ મહાવરો કરો (Satisfactory)";
      performanceLabelEn = "Satisfactory, keep practicing!";
    }

    const wrongQuestions = questions.filter(
      (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctAnswer
    );

    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm text-center">
          {/* Trophy Badge */}
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-1">
            વાંકડીયા પ્રાથમિક શાળા · ધોરણ ૮
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
            કસોટી પરિણામ (Quiz Result)
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            {languageMode === 'en' ? performanceLabelEn : performanceLabelGu}
          </p>

          {/* Score Matrix */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5">
              <span className="text-xs text-stone-500 block mb-0.5">કુલ પ્રશ્નો</span>
              <span className="text-2xl font-bold text-stone-800">{totalQuestions}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <span className="text-xs text-emerald-700 block mb-0.5">સાચા ઉત્તર</span>
              <span className="text-2xl font-bold text-emerald-800">{score}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
              <span className="text-xs text-amber-700 block mb-0.5">ટકાવારી</span>
              <span className="text-2xl font-bold text-amber-800">{percentage}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => onOpenCertificate(score, totalQuestions)}
              className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Award className="w-5 h-5 text-amber-200" />
              <span>પ્રમાણપત્ર મેળવો (Get Certificate)</span>
            </button>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ફરીથી ટેસ્ટ આપો (Retake Quiz)</span>
            </button>
            <button
              type="button"
              onClick={onSwitchToStudy}
              className="w-full sm:w-auto px-5 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>બધા પ્રશ્નો વાંચો (Review All)</span>
            </button>
          </div>

          {/* Review Mistakes Section */}
          {wrongQuestions.length > 0 && (
            <div className="text-left border-t border-stone-200 pt-6">
              <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>જે પ્રશ્નોમાં ભૂલ થઈ તે ફરીથી તપાસો ({wrongQuestions.length}):</span>
              </h3>
              <div className="space-y-3">
                {wrongQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/50 text-sm"
                  >
                    <div className="font-semibold text-stone-900 mb-1">
                      પ્રશ્ન {q.id}: {q.questionGu}
                    </div>
                    <div className="text-xs text-rose-700 font-medium mb-1">
                      તમારો જવાબ: {q.optionsGu[selectedAnswers[q.id]]} ❌
                    </div>
                    <div className="text-xs text-emerald-800 font-medium">
                      સાચો જવાબ: {q.optionsGu[q.correctAnswer]} ✅
                    </div>
                    <div className="text-xs text-stone-600 mt-1 italic">
                      સમજૂતી: {q.explanationGu}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Quiz Control Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-3 sm:p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-medium">
          <button
            type="button"
            onClick={() => setQuizModeType('practice')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              quizModeType === 'practice'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            શિક્ષણ મોડ (Instant Answer)
          </button>
          <button
            type="button"
            onClick={() => setQuizModeType('exam')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              quizModeType === 'exam'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            પરીક્ષા મોડ (Exam Mode)
          </button>
        </div>

        {/* Timer & Lifelines */}
        <div className="flex items-center gap-2">
          {/* Timer Toggle */}
          <button
            type="button"
            onClick={() => setTimerEnabled(!timerEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              timerEnabled
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>
              {timerEnabled ? `${secondsRemaining} સેકન્ડ` : 'સમય મર્યાદા (Timer)'}
            </span>
          </button>

          {/* 50:50 Lifeline */}
          <button
            type="button"
            onClick={handleUseFiftyFifty}
            disabled={!lifelinesAvailable.fiftyFifty || currentAnswered}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              lifelinesAvailable.fiftyFifty && !currentAnswered
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                : 'border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
            title="૫૦:૫૦ - બે ખોટા જવાબો દૂર કરો"
          >
            ૫૦:૫૦ (50-50)
          </button>

          {/* Hint Lifeline */}
          <button
            type="button"
            onClick={handleUseHint}
            disabled={!lifelinesAvailable.hint || currentAnswered}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              lifelinesAvailable.hint && !currentAnswered
                ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                : 'border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
            title="સંકેત / Hint મેળવો"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>સંકેત (Hint)</span>
          </button>
        </div>
      </div>

      {/* Progress & Question Grid Navigator */}
      <div className="bg-white rounded-xl border border-stone-200 p-3 sm:p-4 mb-4 shadow-xs">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <div className="flex items-center gap-1.5 font-medium">
            <span>પ્રશ્ન {currentIndex + 1} / {totalQuestions}</span>
            <span aria-hidden="true">·</span>
            <span>જવાબ આપ્યા: {answeredCount}/{totalQuestions}</span>
          </div>
          {quizModeType === 'practice' && (
            <div className="font-semibold text-emerald-700">
              સાચા જવાબ: {score}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-amber-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Quick Question Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isSelected = idx === currentIndex;
            const isCorrect = selectedAnswers[q.id] === q.correctAnswer;

            let badgeStyle = "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100";
            if (isSelected) {
              badgeStyle = "ring-2 ring-stone-900 border-stone-900 font-bold";
            }
            if (isAnswered) {
              if (quizModeType === 'practice') {
                badgeStyle += isCorrect
                  ? " bg-emerald-100 border-emerald-300 text-emerald-800"
                  : " bg-rose-100 border-rose-300 text-rose-800";
              } else {
                badgeStyle += " bg-stone-200 border-stone-300 text-stone-800";
              }
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setCurrentIndex(idx);
                }}
                className={`w-8 h-8 rounded-lg border text-xs font-medium flex items-center justify-center shrink-0 transition-all ${badgeStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        {/* Category & Audio Listen Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
            <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {SCHOOL_NAME_GU}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              શિક્ષિકા: પ્રિયંકાબેન
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-stone-700">
              {languageMode === 'en' ? currentQ.categoryEn : currentQ.categoryGu}
            </span>
          </div>

          <button
            type="button"
            onClick={() => soundManager.speakText(
              languageMode === 'en' ? currentQ.questionEn : currentQ.questionGu,
              languageMode === 'en' ? 'en' : 'gu'
            )}
            className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition-colors"
            title="પ્રશ્ન સાંભળો (Read Aloud)"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">સાંભળો</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          {(languageMode === 'gu' || languageMode === 'both') && (
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              પ્રશ્ન {currentIndex + 1}. {currentQ.questionGu}
            </h3>
          )}
          {(languageMode === 'en' || languageMode === 'both') && (
            <p className={`text-base font-medium text-stone-700 ${languageMode === 'both' ? 'mt-1 text-stone-600' : ''}`}>
              Q{currentIndex + 1}. {currentQ.questionEn}
            </p>
          )}
        </div>

        {/* Hint Box (if triggered) */}
        {hintsUsed[currentQ.id] && !currentAnswered && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">સંકેત (Hint): </span>
              {currentQ.factGu}
            </div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQ.optionsGu.map((optGu, optIdx) => {
            const optEn = currentQ.optionsEn[optIdx];
            const isEliminated = (eliminatedOptions[currentQ.id] || []).includes(optIdx);
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            const isCorrect = currentQ.correctAnswer === optIdx;
            const letters = ['A', 'B', 'C', 'D'];

            if (isEliminated) {
              return (
                <div
                  key={optIdx}
                  className="opacity-30 border border-stone-200 rounded-xl p-3.5 bg-stone-50 text-stone-400 text-xs italic line-through"
                >
                  [{letters[optIdx]}] વિકલ્પ દૂર કરાયો છે (Eliminated by 50:50)
                </div>
              );
            }

            let optionClasses =
              "w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ";

            if (!currentAnswered) {
              optionClasses += "border-stone-200 hover:border-amber-400 hover:bg-amber-50/30 text-stone-800 cursor-pointer shadow-xs active:scale-[0.99]";
            } else {
              if (quizModeType === 'practice') {
                if (isCorrect) {
                  optionClasses += "border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-semibold";
                } else if (isSelected && !isCorrect) {
                  optionClasses += "border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400";
                } else {
                  optionClasses += "border-stone-200 bg-stone-50/50 text-stone-500 opacity-60";
                }
              } else {
                // Exam mode
                if (isSelected) {
                  optionClasses += "border-stone-800 bg-stone-100 text-stone-900 font-semibold ring-1 ring-stone-800";
                } else {
                  optionClasses += "border-stone-200 bg-white text-stone-700 opacity-80";
                }
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={currentAnswered}
                onClick={() => handleSelectOption(optIdx)}
                className={optionClasses}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {letters[optIdx]}
                  </span>
                  <div>
                    {(languageMode === 'gu' || languageMode === 'both') && (
                      <div className="text-sm sm:text-base font-medium">
                        {optGu}
                      </div>
                    )}
                    {(languageMode === 'en' || languageMode === 'both') && (
                      <div className={`text-xs sm:text-sm ${languageMode === 'both' ? 'text-stone-500' : 'font-medium'}`}>
                        {optEn}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Indicator Icon */}
                {currentAnswered && quizModeType === 'practice' && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Practice Mode Explanation Box */}
        {currentAnswered && quizModeType === 'practice' && (
          <div
            className={`p-4 rounded-xl border mb-6 text-sm ${
              isCurrentCorrect
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                : 'border-amber-200 bg-amber-50/70 text-stone-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1.5 text-xs uppercase tracking-wider">
              {isCurrentCorrect ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> સાચો ઉત્તર! (Correct Answer)
                </span>
              ) : (
                <span className="text-amber-800 flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" /> સાચો જવાબ અને સમજૂતી:
                </span>
              )}
            </div>

            <p className="text-stone-800 mb-2 leading-relaxed">
              <span className="font-semibold text-stone-900">સાચો જવાબ: </span>
              {currentQ.optionsGu[currentQ.correctAnswer]} ({currentQ.optionsEn[currentQ.correctAnswer]})
            </p>

            <div className="text-stone-700 mb-2 text-xs sm:text-sm">
              <span className="font-semibold">સમજૂતી: </span>
              {languageMode === 'en' ? currentQ.explanationEn : currentQ.explanationGu}
            </div>

            <div className="text-xs text-amber-900 bg-amber-100/80 p-2.5 rounded-lg border border-amber-200/60 font-medium">
              💡 <span className="font-bold">વિશેષ સામાન્ય જ્ઞાન: </span>
              {languageMode === 'en' ? currentQ.factEn : currentQ.factGu}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setCurrentIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentIndex === 0}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                : 'border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>અગાઉનો પ્રશ્ન</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setCurrentIndex((prev) => prev + 1);
              }}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>આગળનો પ્રશ્ન</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsCompleted(true);
              }}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>કસોટી પૂર્ણ કરો (Submit Quiz)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

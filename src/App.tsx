import React, { useState } from 'react';
import { STD_8_GK_QUESTIONS, BONUS_QUESTIONS_GUJARAT, SCHOOL_NAME_GU, SCHOOL_NAME_EN, TEACHER_NAME_GU, TEACHER_NAME_EN, TARGET_GRADE } from './data/quizData';
import { ActiveTab, LanguageMode, Question } from './types';
import { Header } from './components/Header';
import { QuizMode } from './components/QuizMode';
import { StudyMode } from './components/StudyMode';
import { FlashcardMode } from './components/FlashcardMode';
import { PrintWorksheet } from './components/PrintWorksheet';
import { CertificateModal } from './components/CertificateModal';
import { AddQuestionModal } from './components/AddQuestionModal';
import { PlusCircle, Sparkles, BookOpenCheck, ShieldAlert, Award } from 'lucide-react';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('gu');
  const [isMuted, setIsMuted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(STD_8_GK_QUESTIONS);
  const [hasBonusLoaded, setHasBonusLoaded] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [certificateData, setCertificateData] = useState<{ score: number; total: number }>({
    score: 10,
    total: 10,
  });

  const handleToggleBonus = () => {
    soundManager.playClick();
    if (!hasBonusLoaded) {
      setQuestions([...STD_8_GK_QUESTIONS, ...BONUS_QUESTIONS_GUJARAT]);
      setHasBonusLoaded(true);
      setCertificateData({ score: 12, total: 12 });
    } else {
      setQuestions(STD_8_GK_QUESTIONS);
      setHasBonusLoaded(false);
      setCertificateData({ score: 10, total: 10 });
    }
  };

  const handleAddCustomQuestion = (newQ: Question) => {
    setQuestions((prev) => [...prev, newQ]);
  };

  const handleOpenCertificate = (score: number, total: number) => {
    setCertificateData({ score, total });
    setActiveTab('certificate');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-['Plus_Jakarta_Sans','Noto_Sans_Gujarati',sans-serif]">
      {/* School Top Header & Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        languageMode={languageMode}
        setLanguageMode={setLanguageMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        totalQuestions={questions.length}
      />

      {/* Sub-bar / Quick Information Bar (Hidden during Print) */}
      <div className="bg-amber-50/70 border-b border-amber-200/50 py-2 px-4 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-700 text-center sm:text-left flex-wrap">
            <span className="font-bold text-amber-900">📌 શાળા:</span>
            <span className="font-semibold text-stone-900">{SCHOOL_NAME_GU}</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-emerald-800">શિક્ષિકા: પ્રિયંકાબેન</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="text-stone-600 hidden sm:inline">સામાન્ય જ્ઞાન કસોટી ({TARGET_GRADE})</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Bonus questions */}
            <button
              type="button"
              onClick={handleToggleBonus}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                hasBonusLoaded
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-100/50'
              }`}
            >
              {hasBonusLoaded ? '૧૨ પ્રશ્નો (બોનસ સક્રિય)' : '+ ગુજરાત બોનસ પ્રશ્નો ઉમેરો'}
            </button>

            {/* Teacher add question */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 transition-colors"
              title="શિક્ષક દ્વારા નવો પ્રશ્ન ઉમેરો"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>પ્રશ્ન ઉમેરો</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'quiz' && (
          <QuizMode
            questions={questions}
            languageMode={languageMode}
            onOpenCertificate={handleOpenCertificate}
            onSwitchToStudy={() => setActiveTab('study')}
          />
        )}

        {activeTab === 'study' && (
          <StudyMode
            questions={questions}
            languageMode={languageMode}
            onStartQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardMode
            questions={questions}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'print' && (
          <PrintWorksheet
            questions={questions}
            languageMode={languageMode}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateModal
            score={certificateData.score}
            totalMarks={certificateData.total}
            isStandaloneTab={true}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 px-4 text-center text-xs text-stone-500 print:hidden mt-auto">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <div className="font-semibold text-stone-800">
            {SCHOOL_NAME_GU} · {TARGET_GRADE}
          </div>
          <div>
            સામાન્ય જ્ઞાન પ્રશ્નોત્તરી (GK Quiz & Evaluation System) · પ્રાથમિક શાળા શિક્ષણ પહેલ
          </div>
          <div className="text-[11px] text-stone-400">
            GCERT / GSEB અભ્યાસક્રમ મુજબ ૧૩-૧૪ વર્ષના વિદ્યાર્થીઓ માટે ઉપયુક્ત કઠિનતા મૂલ્ય
          </div>
        </div>
      </footer>

      {/* Modal to add custom question */}
      {showAddModal && (
        <AddQuestionModal
          nextId={questions.length + 1}
          onAddQuestion={handleAddCustomQuestion}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

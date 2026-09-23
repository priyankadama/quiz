import React from 'react';
import { ActiveTab, LanguageMode } from '../types';
import { SCHOOL_NAME_GU, SCHOOL_NAME_EN, TARGET_GRADE } from '../data/quizData';
import { Volume2, VolumeX, BookOpen, CheckCircle, Printer, Award, Sparkles, GraduationCap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  languageMode: LanguageMode;
  setLanguageMode: (mode: LanguageMode) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  languageMode,
  setLanguageMode,
  isMuted,
  setIsMuted,
  totalQuestions,
}) => {
  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.isMuted = nextState;
  };

  const navItems: { id: ActiveTab; labelGu: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'quiz',
      labelGu: 'ક્વિઝ કસોટી',
      labelEn: 'Quiz Test',
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      id: 'study',
      labelGu: 'વાંચન અને સમજૂતી',
      labelEn: 'Study Guide',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'flashcards',
      labelGu: 'સ્મૃતિ પત્તા',
      labelEn: 'Flashcards',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'print',
      labelGu: 'પેપર પ્રિન્ટ / PDF',
      labelEn: 'Print Paper',
      icon: <Printer className="w-4 h-4" />,
    },
    {
      id: 'certificate',
      labelGu: 'પ્રમાણપત્ર',
      labelEn: 'Certificate',
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-30 shadow-xs print:hidden">
      {/* Top Banner with School Identity */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* School Emblem & Name */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white flex items-center justify-center shadow-sm shrink-0 border border-amber-600/30">
              <GraduationCap className="w-7 h-7 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                  {SCHOOL_NAME_GU}
                </h1>
                <span className="text-xs text-stone-400 font-medium hidden sm:inline" aria-hidden="true">|</span>
                <span className="text-sm font-semibold text-stone-600 hidden sm:inline">
                  {SCHOOL_NAME_EN}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 justify-center sm:justify-start mt-0.5">
                <span className="font-medium text-amber-800">{TARGET_GRADE}</span>
                <span aria-hidden="true">·</span>
                <span>સામાન્ય જ્ઞાન કસોટી (GK Quiz)</span>
                <span aria-hidden="true">·</span>
                <span>{totalQuestions} પ્રશ્નો</span>
              </div>
            </div>
          </div>

          {/* Quick Controls: Language Mode & Sound Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Segmented Control */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLanguageMode('gu')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  languageMode === 'gu'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="ફક્ત ગુજરાતી"
              >
                ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('both')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  languageMode === 'both'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="ગુજરાતી + English"
              >
                બંને (Dual)
              </button>
              <button
                type="button"
                onClick={() => setLanguageMode('en')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  languageMode === 'en'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English Only"
              >
                English
              </button>
            </div>

            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-colors ${
                isMuted
                  ? 'border-stone-200 text-stone-400 bg-stone-50 hover:bg-stone-100'
                  : 'border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100'
              }`}
              title={isMuted ? 'અવાજ શરૂ કરો (Unmute)' : 'અવાજ બંધ કરો (Mute)'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-stone-100 mt-2.5 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {item.icon}
                <span>
                  {languageMode === 'en' ? item.labelEn : item.labelGu}
                </span>
                {languageMode === 'both' && (
                  <span className={`text-[10px] opacity-75 hidden md:inline ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                    ({item.labelEn})
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

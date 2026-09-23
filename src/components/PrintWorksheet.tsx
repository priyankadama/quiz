import React, { useState } from 'react';
import { Question, LanguageMode } from '../types';
import { SCHOOL_NAME_GU, SCHOOL_NAME_EN, TARGET_GRADE } from '../data/quizData';
import { soundManager } from '../utils/audio';
import { Printer, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface PrintWorksheetProps {
  questions: Question[];
  languageMode: LanguageMode;
}

export const PrintWorksheet: React.FC<PrintWorksheetProps> = ({
  questions,
  languageMode,
}) => {
  const [includeAnswerKey, setIncludeAnswerKey] = useState(false);
  const [customStudentName, setCustomStudentName] = useState('');
  const [examDate, setExamDate] = useState(() => {
    const today = new Date();
    return today.toLocaleDateString('gu-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Screen Control Panel (Hidden during Print) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6 shadow-xs print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{SCHOOL_NAME_GU}</span>
              <span aria-hidden="true">·</span>
              <span>પ્રિન્ટેબલ કસોટી પેપર</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900">
              કસોટી પેપર પ્રિન્ટ / PDF ડાઉનલોડ
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              આ પેપરને સીધું પ્રિન્ટ કરી શકો છો અથવા બ્રાઉઝરના 'Save as PDF' વિકલ્પથી PDF ફાઇલ તરીકે સાચવી શકો છો.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>પ્રિન્ટ કરો / Save as PDF</span>
          </button>
        </div>

        {/* Customization Options */}
        <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              વિદ્યાર્થીનું નામ (વૈકલ્પિક):
            </label>
            <input
              type="text"
              value={customStudentName}
              onChange={(e) => setCustomStudentName(e.target.value)}
              placeholder="દા.ત. પટેલ આર્યન બી."
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              પરીક્ષાની તારીખ:
            </label>
            <input
              type="text"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-stone-200 hover:bg-stone-50 w-full">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-stone-300 focus:ring-amber-500"
              />
              <span className="text-xs font-semibold text-stone-800">
                શિક્ષક ઉત્તરવહી (Answer Key) સામેલ કરો
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="bg-white border border-stone-200 sm:rounded-2xl p-6 sm:p-10 shadow-xs print:border-none print:shadow-none print:p-0">
        {/* Official Header */}
        <div className="text-center border-b-2 border-stone-900 pb-4 mb-5">
          <div className="text-xs font-bold text-stone-600 uppercase tracking-widest mb-1">
            ગુજરાત સરકાર - પ્રાથમિક શિક્ષણ વિભાગ
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-1">
            {SCHOOL_NAME_GU}
          </h1>
          <div className="text-sm font-semibold text-stone-700 mb-2">
            {SCHOOL_NAME_EN}
          </div>
          <div className="inline-block bg-stone-100 border border-stone-300 px-4 py-1 rounded-md text-xs sm:text-sm font-bold text-stone-900">
            સામાન્ય જ્ઞાન કસોટી (GK Evaluation Test) · {TARGET_GRADE}
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm border border-stone-300 rounded-lg p-3 mb-5 bg-stone-50/50 print:bg-white">
          <div>
            <span className="font-bold text-stone-900">વિદ્યાર્થી: </span>
            <span className="border-b border-dotted border-stone-600 inline-block min-w-[100px] text-stone-800">
              {customStudentName || '________________'}
            </span>
          </div>
          <div>
            <span className="font-bold text-stone-900">રોલ નં: </span>
            <span className="border-b border-dotted border-stone-600 inline-block min-w-[50px] text-stone-800">
              ________
            </span>
          </div>
          <div>
            <span className="font-bold text-stone-900">તારીખ: </span>
            <span>{examDate}</span>
          </div>
          <div>
            <span className="font-bold text-stone-900">કુલ ગુણ: </span>
            <span>૧૦ / મેળવેલ: _____</span>
          </div>
        </div>

        {/* Exam Instructions */}
        <div className="text-xs text-stone-600 mb-5 bg-stone-50 p-2.5 rounded-lg border border-stone-200 print:bg-white print:border-dashed">
          <span className="font-bold text-stone-800">સૂચના: </span>
          (૧) દરેક પ્રશ્નનો ૧ ગુણ છે. (૨) સાચા વિકલ્પના ક્રમ અક્ષર [A, B, C, D] સામે આપેલા બોક્સ (વર્તુળ) માં ઘાટું કરો. (૩) તમામ ૧૦ પ્રશ્નો ફરજિયાત છે.
        </div>

        {/* Questions Sheet */}
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="border-b border-stone-200 pb-3 text-xs sm:text-sm last:border-b-0 break-inside-avoid"
            >
              <div className="font-bold text-stone-900 mb-1.5 flex items-start gap-1.5">
                <span className="w-5 text-right shrink-0">{idx + 1}.</span>
                <div>
                  <div>{q.questionGu}</div>
                  {languageMode === 'both' && (
                    <div className="text-xs text-stone-500 font-normal mt-0.5">
                      {q.questionEn}
                    </div>
                  )}
                </div>
              </div>

              {/* 4 Options Horizontal or Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-6">
                {q.optionsGu.map((optGu, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2 text-stone-800">
                    <span className="w-4 h-4 rounded-full border border-stone-500 inline-block shrink-0" />
                    <span className="font-semibold text-stone-900">[{letters[optIdx]}]</span>
                    <span>{optGu}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Signature Footer */}
        <div className="mt-8 pt-6 border-t border-stone-300 flex justify-between items-end text-xs sm:text-sm break-inside-avoid">
          <div className="text-center">
            <div className="w-32 border-b border-stone-400 mb-1" />
            <span className="text-stone-600">વિદ્યાર્થીની સહી</span>
          </div>
          <div className="text-center">
            <div className="w-32 border-b border-stone-400 mb-1" />
            <span className="text-stone-600">શાળા સિક્કો</span>
          </div>
          <div className="text-center">
            <div className="w-32 border-b border-stone-400 mb-1" />
            <span className="text-stone-600">વર્ગ શિક્ષકની સહી</span>
          </div>
        </div>

        {/* Optional Teacher Answer Key */}
        {includeAnswerKey && (
          <div className="mt-10 pt-6 border-t-2 border-dashed border-stone-400 break-before-page">
            <div className="text-center font-bold text-base text-stone-900 mb-3">
              શિક્ષક ઉત્તરવહી અને ગુણાંકન કૂંચી (Teacher Answer Key)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs mb-4">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-2 border border-stone-300 rounded bg-stone-50 text-center">
                  <span className="font-bold text-stone-700">પ્રશ્ન {idx + 1}: </span>
                  <span className="font-extrabold text-stone-900">[{letters[q.correctAnswer]}]</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5 text-xs text-stone-700">
              {questions.map((q, idx) => (
                <div key={q.id}>
                  <span className="font-bold">{idx + 1}. {q.optionsGu[q.correctAnswer]}</span> - {q.explanationGu}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

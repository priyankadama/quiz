import React, { useState } from 'react';
import { SCHOOL_NAME_GU, SCHOOL_NAME_EN, TARGET_GRADE } from '../data/quizData';
import { soundManager } from '../utils/audio';
import { Award, Printer, X, Download, Sparkles, Check } from 'lucide-react';

interface CertificateModalProps {
  score: number;
  totalMarks: number;
  onClose?: () => void;
  isStandaloneTab?: boolean;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  score = 10,
  totalMarks = 10,
  onClose,
  isStandaloneTab = false,
}) => {
  const [studentName, setStudentName] = useState('ચૌહાણ મનન આર.');
  const [rollNo, setRollNo] = useState('૧૫');
  const [issueDate, setIssueDate] = useState(() => {
    return new Date().toLocaleDateString('gu-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  const percentage = Math.round((score / totalMarks) * 100);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className={`max-w-4xl mx-auto ${isStandaloneTab ? 'py-6 px-4' : 'p-4'}`}>
      {/* Control Box (Hidden during print) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6 shadow-xs print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>વિદ્યાર્થી સિદ્ધિ પ્રમાણપત્ર (Certificate of Merit)</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              વિદ્યાર્થીનું નામ અને વિગત ઉમેરીને સુંદર પ્રમાણપત્ર પ્રિન્ટ કરી શકો છો.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-200" />
              <span>પ્રમાણપત્ર પ્રિન્ટ કરો</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Input Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              વિદ્યાર્થીનું નામ (Student Name):
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              placeholder="વિદ્યાર્થીનું પૂરું નામ"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              રોલ નંબર (Roll No):
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              placeholder="રોલ નં"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              તારીખ (Issue Date):
            </label>
            <input
              type="text"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>
      </div>

      {/* Official Certificate Layout */}
      <div className="relative bg-white border-8 border-double border-amber-700/80 p-8 sm:p-12 rounded-2xl shadow-md text-center overflow-hidden print:border-8 print:shadow-none print:m-0 print:p-8">
        {/* Subtle Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <Award className="w-96 h-96 text-stone-900" />
        </div>

        {/* Inner Border */}
        <div className="border border-amber-300/80 p-6 sm:p-10 rounded-xl relative bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20">
          {/* School Header */}
          <div className="mb-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-700 text-white flex items-center justify-center shadow-xs mb-3 border-2 border-amber-300">
              <Award className="w-8 h-8 text-amber-200" />
            </div>

            <div className="text-xs uppercase tracking-widest text-amber-900 font-bold mb-1">
              શિક્ષણ વિભાગ · પ્રાથમિક શાળા પરીક્ષા પરિષદ
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
              {SCHOOL_NAME_GU}
            </h1>
            <div className="text-xs sm:text-sm font-semibold text-stone-600">
              {SCHOOL_NAME_EN}
            </div>
          </div>

          {/* Certificate Title */}
          <div className="my-6">
            <div className="inline-block border-y-2 border-amber-700 py-1.5 px-6">
              <h2 className="text-lg sm:text-2xl font-black text-amber-950 tracking-wider">
                સિદ્ધિ પ્રમાણપત્ર (CERTIFICATE OF MERIT)
              </h2>
            </div>
          </div>

          {/* Citation Body */}
          <div className="max-w-xl mx-auto space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed my-6">
            <p>
              આથી ગૌરવપૂર્વક પ્રમાણિત કરવામાં આવે છે કે કુમાર / કન્યા
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-stone-900 border-b-2 border-stone-800 inline-block px-8 pb-1 my-1">
              {studentName || '__________________________'}
            </div>
            <p className="text-xs sm:text-sm text-stone-600">
              રોલ નં: <span className="font-bold text-stone-900">{rollNo}</span> · વર્ગ: <span className="font-bold text-stone-900">{TARGET_GRADE}</span>
            </p>
            <p className="text-stone-700">
              એ વાંકડીયા પ્રાથમિક શાળા દ્વારા આયોજિત <span className="font-bold text-stone-900">ધોરણ ૮ સામાન્ય જ્ઞાન (GK) સ્પર્ધા / કસોટી</span> માં શ્રેષ્ઠ દેખાવ કરીને કુલ ૧૦ ગુણમાંથી{' '}
              <span className="font-extrabold text-amber-900 text-lg sm:text-xl underline decoration-amber-600">
                {score} ગુણ ({percentage}%)
              </span>{' '}
              સાથે ઉત્તીર્ણ થયા છે. તેમના ઉજ્જવળ ભવિષ્યની શાળા પરિવાર મંગલ કામના કરે છે.
            </p>
          </div>

          {/* Golden Seal & Signatures */}
          <div className="mt-10 pt-6 border-t border-stone-300 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="text-center">
              <div className="w-28 sm:w-36 border-b border-stone-500 mb-1" />
              <div className="font-semibold text-stone-800">વર્ગ શિક્ષક શ્રી</div>
              <div className="text-[11px] text-stone-500">ધોરણ ૮</div>
            </div>

            {/* School Seal */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-700 flex items-center justify-center p-1 text-[10px] text-amber-900 font-bold uppercase text-center leading-tight">
                વાંકડીયા શાળા સીલ
              </div>
              <div className="text-[10px] text-stone-500 mt-1">તારીખ: {issueDate}</div>
            </div>

            <div className="text-center">
              <div className="w-28 sm:w-36 border-b border-stone-500 mb-1" />
              <div className="font-semibold text-stone-800">આચાર્ય શ્રી</div>
              <div className="text-[11px] text-stone-500">{SCHOOL_NAME_GU}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

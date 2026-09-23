import React, { useState } from 'react';
import { Question } from '../types';
import { soundManager } from '../utils/audio';
import { Plus, X, Check, BookOpen } from 'lucide-react';

interface AddQuestionModalProps {
  onAddQuestion: (q: Question) => void;
  onClose: () => void;
  nextId: number;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onAddQuestion,
  onClose,
  nextId,
}) => {
  const [questionGu, setQuestionGu] = useState('');
  const [questionEn, setQuestionEn] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [explanationGu, setExplanationGu] = useState('');
  const [categoryGu, setCategoryGu] = useState('સામાન્ય જ્ઞાન');
  const [factGu, setFactGu] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionGu.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      return;
    }

    soundManager.playCorrect();
    const newQ: Question = {
      id: nextId,
      questionGu: questionGu.trim(),
      questionEn: questionEn.trim() || questionGu.trim(),
      optionsGu: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      optionsEn: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer,
      explanationGu: explanationGu.trim() || 'આ પ્રશ્નનો સાચો જવાબ છે.',
      explanationEn: explanationGu.trim() || 'Correct answer.',
      categoryGu: categoryGu.trim() || 'સામાન્ય જ્ઞાન',
      categoryEn: 'General Knowledge',
      factGu: factGu.trim() || 'ધોરણ ૮ ના અભ્યાસક્રમ આધારિત પ્રશ્ન.',
      factEn: 'Standard 8 GK question.',
      difficulty: 'Standard 8',
    };

    onAddQuestion(newQ);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                નવો પ્રશ્ન ઉમેરો (Add Question)
              </h3>
              <p className="text-xs text-stone-500">વાંકડીયા પ્રાથમિક શાળા ક્વિઝ બેંક</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              પ્રશ્ન (ગુજરાતીમાં) *
            </label>
            <input
              type="text"
              required
              value={questionGu}
              onChange={(e) => setQuestionGu(e.target.value)}
              placeholder="દા.ત. ગુજરાતના પ્રથમ મુખ્યમંત્રી કોણ હતા?"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Question in English (Optional)
            </label>
            <input
              type="text"
              value={questionEn}
              onChange={(e) => setQuestionEn(e.target.value)}
              placeholder="e.g. Who was the first Chief Minister of Gujarat?"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl"
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="block font-semibold text-stone-800">
              ચાર વિકલ્પો અને સાચો જવાબ પસંદ કરો:
            </label>
            {[
              { label: 'વિકલ્પ [A]', val: optA, set: setOptA, idx: 0 },
              { label: 'વિકલ્પ [B]', val: optB, set: setOptB, idx: 1 },
              { label: 'વિકલ્પ [C]', val: optC, set: setOptC, idx: 2 },
              { label: 'વિકલ્પ [D]', val: optD, set: setOptD, idx: 3 },
            ].map((item) => (
              <div key={item.idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswerRadio"
                  checked={correctAnswer === item.idx}
                  onChange={() => setCorrectAnswer(item.idx)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  title="સાચો જવાબ તરીકે પસંદ કરો"
                />
                <input
                  type="text"
                  required
                  value={item.val}
                  onChange={(e) => item.set(e.target.value)}
                  placeholder={item.label}
                  className="flex-1 px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
                />
                <span className="text-[11px] text-stone-400">
                  {correctAnswer === item.idx ? '✔ સાચો' : ''}
                </span>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              સમજૂતી (Explanation)
            </label>
            <textarea
              rows={2}
              value={explanationGu}
              onChange={(e) => setExplanationGu(e.target.value)}
              placeholder="વિદ્યાર્થીઓ માટે સાચા ઉત્તરની સમજૂતી..."
              className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
            />
          </div>

          {/* Category & Fact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                વિષય / કેટેગરી
              </label>
              <input
                type="text"
                value={categoryGu}
                onChange={(e) => setCategoryGu(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                વિશેષ સામાન્ય જ્ઞાન તથ્ય (Fact)
              </label>
              <input
                type="text"
                value={factGu}
                onChange={(e) => setFactGu(e.target.value)}
                placeholder="દા.ત. વધારાની અગત્યની માહિતી"
                className="w-full px-3 py-1.5 border border-stone-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-medium"
            >
              રદ કરો
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>પ્રશ્ન સાચવો</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

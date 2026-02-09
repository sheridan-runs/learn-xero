import { useState } from 'react';
import { Activity, ArrowRight, Zap, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { questions, calculateHealthScore } from './utils/auditLogic';

function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleRetake = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const isComplete = answeredCount === totalCount;
  const result = calculateHealthScore(answers);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col items-center py-10 px-4 selection:bg-pink-500 selection:text-white">
      
      {/* HEADER */}
      <header className="mb-12 text-center space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 text-xs font-bold uppercase tracking-widest shadow-lg shadow-pink-900/20">
          <Activity className="w-3 h-3" /> Unofficial Guide for NZ Business
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
          LEARN <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">XERO.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          The free <strong>Xero Health Check</strong> & Efficiency Audit. <br className="hidden md:block"/>
          Find out if you are overpaying for bookkeeping or missing out on automation.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <Lock className="w-3 h-3" /> 
          <span>Privacy First: No login required. Data stays on your device.</span>
        </div>
      </header>

      {/* QUIZ SECTION */}
      {!showResult ? (
        <div className="w-full max-w-2xl pb-32"> {/* Added padding bottom so sticky bar doesn't cover last Q */}
          <div className="space-y-6">
            {questions.map((q) => {
              const isAnswered = answers[q.id] !== undefined;
              return (
                <div 
                  key={q.id} 
                  className={`border p-6 md:p-8 rounded-3xl transition-all duration-300 ${
                    isAnswered 
                      ? 'bg-slate-900/50 border-slate-800 opacity-60 hover:opacity-100' 
                      : 'bg-slate-900 border-slate-700 shadow-xl shadow-black/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-white leading-snug">{q.text}</h3>
                    {isAnswered && <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />}
                  </div>
                  
                  <div className="space-y-3">
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(q.id, idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group relative overflow-hidden ${
                          answers[q.id] === idx
                            ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-900/30'
                            : 'bg-slate-800 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-750'
                        }`}
                      >
                        <span className="relative z-10 font-medium">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* TRUST SIGNAL / AUTHOR BIO */}
          <div className="mt-12 p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50 text-center text-sm text-slate-500">
            <p>
              <strong>Why take this audit?</strong> <br/>
              Most businesses use less than 50% of Xero's power. This tool was built by 
              <a href="https://nurture.kiwi" target="_blank" className="text-pink-500 hover:underline ml-1">Nurture</a> to help NZ owners stop doing manual data entry.
            </p>
          </div>

          {/* STICKY PROGRESS BAR */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-lg border-t border-white/10 z-50">
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((answeredCount / totalCount) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 transition-all duration-500 ease-out" 
                    style={{ width: `${(answeredCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
              <button
                disabled={!isComplete}
                onClick={() => setShowResult(true)}
                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wide transition-all ${
                  isComplete
                    ? 'bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/20 scale-100 cursor-pointer'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                {isComplete ? "Reveal Score" : "Finish Quiz"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* RESULTS SECTION */
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 pt-10">
          <div className="bg-slate-900 border border-slate-700 rounded-[2rem] p-8 md:p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative space-y-2">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Efficiency Audit Complete</div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-8xl md:text-9xl font-black text-white tracking-tighter">{result.percentage}</span>
                <span className="text-4xl md:text-5xl font-bold text-pink-500 self-start mt-4">%</span>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <h2 className={`text-4xl font-black italic ${result.percentage > 79 ? 'text-emerald-400' : result.percentage > 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                {result.title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg font-medium">
                {result.description}
              </p>
            </div>

            <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 text-left flex gap-5 items-start relative z-10">
              <div className="p-3 bg-pink-500/20 rounded-xl shrink-0">
                <Zap className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <div className="font-bold text-white text-xs uppercase tracking-widest mb-1.5">Your Prescription</div>
                <p className="text-slate-300 text-sm leading-relaxed">{result.action}</p>
              </div>
            </div>

            <div className="pt-6 space-y-4 relative z-10">
              
              {/* --- DYNAMIC CALL TO ACTION BUTTON --- */}
              <a 
                href={result.ctaUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                  result.percentage > 79 
                    ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/25 text-white' 
                    : 'bg-pink-600 hover:bg-pink-500 hover:shadow-pink-500/25 text-white'
                }`}
              >
                {result.ctaText} <ArrowRight className="w-5 h-5" />
              </a>
              {/* ----------------------------------- */}
              
              <button 
                onClick={handleRetake}
                className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 text-sm font-medium hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Retake Audit
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-600">
              This tool provides general guidance only and does not constitute professional accounting advice. 
              <br/>Built by <a href="https://nurture.kiwi" className="underline hover:text-pink-500">Nurture</a>.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

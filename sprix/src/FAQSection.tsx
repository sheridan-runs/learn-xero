import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

const faqs = [
  {
    question: "How can I speed up Xero reconciliation?",
    answer: "The fastest way to reconcile is to stop typing details manually. 1) Use 'Bank Rules' for recurring costs, and 2) Use Hubdoc or email forwarding to send bills directly to Xero so the data is auto-extracted."
  },
  {
    question: "Does Xero have automated invoice reminders?",
    answer: "Yes. You can turn on 'Invoice Reminders' in settings to automatically email customers when bills are 7, 14, or 21 days overdue. This is often more effective than manual chasing."
  },
  {
    question: "How do I avoid typing bills manually?",
    answer: "Every Xero organization has a unique email address. You can auto-forward your supplier invoices (PDFs) to this address, and Xero will create a draft bill for you automatically."
  },
  {
    question: "What is a good Xero Health Score?",
    answer: "We aim for a score of 80% or higher. This indicates you are using automation features effectively. A score below 40% suggests you are spending too much time on manual data entry."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-4">
      <h2 className="text-3xl font-black italic text-center text-white mb-12 tracking-tight">
        COMMON <span className="text-pink-500">QUESTIONS</span>
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition-all hover:border-slate-700"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-bold text-slate-200 pr-8">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-pink-500 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER LINKS - The Backlink Strategy */}
      <div className="mt-24 pt-12 border-t border-slate-800 text-center space-y-6">
          <p className="text-slate-500 text-sm">
              Tool built by <a href="https://sheridanjamieson.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-white transition-colors">Sheridan Jamieson</a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              <a href="https://nurture.kiwi" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  Virtual CFO Services <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-700">•</span>
              <a href="https://yourbudget.xyz" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  Runway Visualiser <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-700">•</span>
              <a href="https://spreadsheet.school" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                  Spreadsheet School <ExternalLink className="w-3 h-3" />
              </a>
          </div>
          <div className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} Nurture. All rights reserved.
          </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import data from '../data/mock-data.json';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = [...new Set(data.faqs.map((f) => f.category))];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">常見問題</h1>
          <p className="text-white/60 max-w-2xl mx-auto">以下整理了旅客最常詢問的問題，若您有其他疑問歡迎透過 LINE 聯繫我們</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent-400 rounded-full" />
              {cat}
            </h2>
            <div className="space-y-3">
              {data.faqs
                .filter((f) => f.category === cat)
                .map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(faq.id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-navy-800 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-5 pb-4 pt-0">
                          <div className="border-t border-gray-100 pt-3">
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-navy-800 to-navy-700 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">還有其他問題嗎？</h3>
          <p className="text-white/60 mb-6">歡迎透過 LINE 與我們聯繫，將由專人即時為您解答</p>
          <a
            href={data.company.social.line}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b04c] text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            LINE 詢問
          </a>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import data from '../data/mock-data.json';

export default function DestinationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">探索目的地</h1>
          <p className="text-white/60 max-w-2xl mx-auto">從亞洲的繽紛到歐洲的浪漫，每一個目的地都有獨特的故事等你來發現</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.destinations.map((dest) => {
            const isExpanded = expandedId === dest.id;
            return (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => toggle(dest.id)}>
                  <img
                    src={dest.coverImage}
                    alt={dest.country}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{dest.country}</h2>
                      <p className="text-white/70 text-sm">{dest.cities.join('、')}</p>
                    </div>
                    <span className="bg-accent-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full">
                      {dest.packageCount} 個行程
                    </span>
                  </div>
                </div>

                {/* Expandable Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <p className="text-gray-600 leading-relaxed">{dest.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-navy-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">最佳季節</p>
                        <p className="text-sm font-medium text-navy-800">{dest.bestSeason}</p>
                      </div>
                      <div className="bg-navy-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">氣候</p>
                        <p className="text-sm font-medium text-navy-800">{dest.climate}</p>
                      </div>
                      <div className="bg-navy-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">語言</p>
                        <p className="text-sm font-medium text-navy-800">{dest.language}</p>
                      </div>
                      <div className="bg-navy-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">貨幣</p>
                        <p className="text-sm font-medium text-navy-800">{dest.currency}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-2">熱門景點</p>
                      <div className="flex flex-wrap gap-2">
                        {dest.attractions.map((a) => (
                          <span key={a} className="bg-accent-400/10 text-accent-400 text-xs font-medium px-3 py-1.5 rounded-full">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggle(dest.id)}
                  className="w-full py-3 text-sm font-medium text-navy-600 hover:text-accent-400 transition-colors flex items-center justify-center gap-1 border-t border-gray-100"
                >
                  {isExpanded ? '收起' : '查看詳情'}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

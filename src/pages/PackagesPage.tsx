import { useState, useMemo } from 'react';
import data from '../data/mock-data.json';
import PackageCard from '../components/PackageCard';

type SortKey = 'price-asc' | 'price-desc' | 'rating' | 'popularity';

export default function PackagesPage() {
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [maxPrice, setMaxPrice] = useState(120000);
  const [maxDays, setMaxDays] = useState(15);
  const [sort, setSort] = useState<SortKey>('popularity');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const uniqueDestinations = useMemo(
    () => [...new Set(data.packages.map((p) => p.destination))],
    []
  );
  const difficulties = ['輕鬆', '一般', '進階'];

  const filtered = useMemo(() => {
    let result = data.packages.filter((pkg) => {
      if (search && !pkg.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (destination && pkg.destination !== destination) return false;
      if (difficulty && pkg.difficulty !== difficulty) return false;
      if (pkg.price > maxPrice) return false;
      if (pkg.days > maxDays) return false;
      return true;
    });
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popularity': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return result;
  }, [search, destination, difficulty, maxPrice, maxDays, sort]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">探索所有行程</h1>
          <p className="text-white/60 mb-8">從輕鬆踏青到深度探險，找到最適合你的旅程</p>
          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜尋行程名稱..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:bg-white/15 transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 flex items-center justify-between text-navy-800 font-medium"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            篩選條件
          </span>
          <svg className={`w-5 h-5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`md:w-64 shrink-0 space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-800 mb-3">目的地</h3>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent-400/50"
              >
                <option value="">全部目的地</option>
                {uniqueDestinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-800 mb-3">難度</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setDifficulty('')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!difficulty ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  全部
                </button>
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${difficulty === d ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-800 mb-3">
                價格上限：<span className="text-accent-400">NT${maxPrice.toLocaleString()}</span>
              </h3>
              <input
                type="range"
                min={20000}
                max={120000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent-400"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>NT$20,000</span>
                <span>NT$120,000</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-800 mb-3">
                天數上限：<span className="text-accent-400">{maxDays} 天</span>
              </h3>
              <input
                type="range"
                min={3}
                max={15}
                step={1}
                value={maxDays}
                onChange={(e) => setMaxDays(Number(e.target.value))}
                className="w-full accent-accent-400"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3 天</span>
                <span>15 天</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                共 <span className="font-semibold text-navy-800">{filtered.length}</span> 個行程
              </p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent-400/50"
              >
                <option value="popularity">依人氣排序</option>
                <option value="rating">依評分排序</option>
                <option value="price-asc">價格：低到高</option>
                <option value="price-desc">價格：高到低</option>
              </select>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-gray-400 text-lg">沒有符合條件的行程</p>
                <p className="text-gray-300 text-sm mt-1">請嘗試調整篩選條件</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

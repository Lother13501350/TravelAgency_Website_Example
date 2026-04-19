import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import data from '../data/mock-data.json';
import StarRating from '../components/StarRating';
import PackageCard from '../components/PackageCard';
import EnquiryModal from '../components/EnquiryModal';
import { formatPrice } from '../utils/formatPrice';

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pkg = data.packages.find((p) => p.id === id);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-800 mb-2">找不到此行程</h1>
          <Link to="/packages" className="text-accent-400 hover:underline">返回行程列表</Link>
        </div>
      </div>
    );
  }

  const relatedPackages = data.packages
    .filter((p) => p.destinationId === pkg.destinationId && p.id !== pkg.id)
    .slice(0, 3);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={pkg.coverImage} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {pkg.tags.map((tag) => (
              <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{pkg.name}</h1>
          <p className="text-white/70 text-lg">{pkg.destination}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-navy-800">首頁</Link>
          <span className="mx-2">/</span>
          <Link to="/packages" className="hover:text-navy-800">行程</Link>
          <span className="mx-2">/</span>
          <span className="text-navy-800">{pkg.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: '📅', label: '天數', value: `${pkg.days}天${pkg.nights}夜` },
                { icon: '👥', label: '成團人數', value: `${pkg.groupSize.min}–${pkg.groupSize.max} 人` },
                { icon: '⛰️', label: '難度', value: pkg.difficulty },
                { icon: '⭐', label: '評分', value: `${pkg.rating} (${pkg.reviewCount} 則)` },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-xs text-gray-400 mt-1">{item.label}</p>
                  <p className="font-semibold text-navy-800 text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                行程亮點
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 bg-accent-400/5 border border-accent-400/10 rounded-lg px-4 py-3">
                    <div className="w-8 h-8 bg-accent-400/10 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-navy-800 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  費用包含
                </h3>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="text-sm text-green-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-5">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  費用不含
                </h3>
                <ul className="space-y-2">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="text-sm text-red-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Departure Dates */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-navy-800 mb-4">出發日期</h2>
              <div className="flex flex-wrap gap-3">
                {pkg.departureDates.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedDate === d
                        ? 'border-accent-400 bg-accent-400/10 text-accent-400'
                        : 'border-gray-200 text-gray-600 hover:border-accent-400/50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={pkg.rating} size="sm" showNumber />
                <span className="text-xs text-gray-400">({pkg.reviewCount} 則評價)</span>
              </div>
              <div className="mb-4">
                <span className="text-xs text-gray-400">每人</span>
                <p className="text-3xl font-bold text-accent-400">{formatPrice(pkg.price)}</p>
              </div>
              <div className="text-sm text-gray-500 space-y-2 mb-6">
                <p>📅 {pkg.days}天{pkg.nights}夜</p>
                <p>👥 {pkg.groupSize.min}–{pkg.groupSize.max} 人成團</p>
                <p>⛰️ 難度：{pkg.difficulty}</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary w-full text-center text-lg"
              >
                立即報名
              </button>
              <a
                href={data.company.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b04c] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE 詢問
              </a>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-navy-800 mb-8">你可能也會喜歡</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={pkg.name}
        departureDates={pkg.departureDates}
      />
    </div>
  );
}

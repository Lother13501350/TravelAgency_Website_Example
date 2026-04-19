import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { formatPrice } from '../utils/formatPrice';

interface Package {
  id: string;
  name: string;
  destination: string;
  coverImage: string;
  price: number;
  days: number;
  nights: number;
  difficulty: string;
  isHot: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      to={`/packages/${pkg.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md card-hover"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.coverImage}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.style.display = 'none';
            target.parentElement!.style.background = 'linear-gradient(135deg, #1E3A5F 0%, #2a4a78 100%)';
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Hot badge */}
        {pkg.isHot && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            熱門
          </span>
        )}

        {/* Days badge */}
        <span className="absolute top-3 right-3 bg-navy-800/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {pkg.days}天{pkg.nights}夜
        </span>

        {/* Difficulty */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-navy-800 text-xs font-medium px-2 py-0.5 rounded">
          {pkg.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {pkg.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-navy-50 text-navy-700">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-navy-800 mb-1 group-hover:text-accent-400 transition-colors line-clamp-1">
          {pkg.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{pkg.destination}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={pkg.rating} size="sm" />
          <span className="text-sm font-semibold text-navy-800">{pkg.rating}</span>
          <span className="text-xs text-gray-400">({pkg.reviewCount} 則評價)</span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-xs text-gray-400">每人</span>
            <p className="text-xl font-bold text-accent-400">{formatPrice(pkg.price)}</p>
          </div>
          <span className="text-sm text-navy-600 font-medium group-hover:text-accent-400 transition-colors flex items-center gap-1">
            查看詳情
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

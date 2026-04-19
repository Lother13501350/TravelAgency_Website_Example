import { Link } from 'react-router-dom';
import data from '../data/mock-data.json';
import PackageCard from '../components/PackageCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { formatPrice } from '../utils/formatPrice';
import { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-accent-400">
        {count.toLocaleString()}{suffix}
      </p>
    </div>
  );
}

export default function HomePage() {
  const featuredPackages = data.packages.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-accent-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up">
            {data.company.nameEn}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {data.company.slogan}
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {data.company.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <Link to="/packages" className="btn-primary text-lg px-8 py-4">
              探索行程
            </Link>
            <a href={data.company.social.line} target="_blank" rel="noopener noreferrer" className="btn-outline text-lg px-8 py-4 flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              透過 LINE 詢問
            </a>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-navy-800 py-16 -mt-1">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <AnimatedCounter target={data.company.stats.totalTravelers} suffix="+" />
            <p className="text-white/60 mt-2 text-sm">服務旅客</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={data.company.stats.yearsInBusiness} suffix="年" />
            <p className="text-white/60 mt-2 text-sm">深耕旅遊</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={data.company.stats.destinationCount} suffix="+" />
            <p className="text-white/60 mt-2 text-sm">旅遊目的地</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={data.company.stats.satisfactionRate} suffix="%" />
            <p className="text-white/60 mt-2 text-sm">旅客滿意度</p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PACKAGES ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">熱門行程推薦</h2>
          <p className="section-subtitle">精選最受歡迎的行程，每一段旅途都值得期待</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/packages" className="btn-navy inline-flex items-center gap-2">
              查看所有行程
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">探索熱門目的地</h2>
          <p className="section-subtitle">從亞洲到歐洲，每個角落都有令人嚮往的風景</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.destinations.map((dest) => (
              <Link
                key={dest.id}
                to="/destinations"
                className="group relative h-64 rounded-2xl overflow-hidden card-hover"
              >
                <img
                  src={dest.coverImage}
                  alt={dest.country}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-bold text-white mb-1">{dest.country}</h3>
                  <p className="text-white/70 text-sm">{dest.packageCount} 個行程</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">旅客真心推薦</h2>
          <p className="section-subtitle">聽聽參加過行程的旅客怎麼說</p>
          <TestimonialCarousel testimonials={data.testimonials} />
        </div>
      </section>

      {/* ===== PROMOTIONS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">限時優惠方案</h2>
          <p className="section-subtitle">把握機會，讓下一趟旅程更划算</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.promotions.map((promo) => (
              <div
                key={promo.id}
                className="relative bg-gradient-to-br from-navy-800 to-navy-700 text-white rounded-2xl p-6 overflow-hidden card-hover"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-400/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-400/10 rounded-full translate-y-6 -translate-x-6" />
                <div className="relative">
                  <span className="inline-block bg-accent-400 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {promo.code}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{promo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">有效至 {promo.validUntil}</span>
                    <span className="text-accent-400 font-bold text-lg">
                      {promo.discountType === 'percentage'
                        ? `${promo.discountValue}% OFF`
                        : `省 ${formatPrice(promo.discountValue)}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">準備好展開下一趟旅程了嗎？</h2>
          <p className="text-white/70 text-lg mb-8">透過 LINE 與我們聊聊，讓專業旅遊顧問為您量身打造夢想旅程</p>
          <a
            href={data.company.social.line}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b04c] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            加入 LINE 好友
          </a>
        </div>
      </section>
    </div>
  );
}

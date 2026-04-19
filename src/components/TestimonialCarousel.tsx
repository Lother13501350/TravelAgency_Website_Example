import { useState, useEffect, useCallback } from 'react';
import StarRating from './StarRating';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  packageName: string;
  comment: string;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = useCallback(() => goTo((current + 1) % testimonials.length), [current, goTo, testimonials.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Quote icon */}
      <svg className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-accent-400/20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
      </svg>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div
          className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          <img
            src={t.avatar}
            alt={t.name}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover ring-4 ring-accent-400/20"
          />
          <StarRating rating={t.rating} size="md" />
          <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg italic">
            「{t.comment}」
          </p>
          <div className="mt-6">
            <p className="font-semibold text-navy-800">{t.name}</p>
            <p className="text-sm text-gray-400">{t.packageName}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-navy-800 hover:text-white text-navy-800 transition-colors"
          aria-label="上一則"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-accent-400 w-7' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`第 ${i + 1} 則`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-navy-800 hover:text-white text-navy-800 transition-colors"
          aria-label="下一則"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  departureDates?: string[];
}

export default function EnquiryModal({ isOpen, onClose, packageName, departureDates = [] }: EnquiryModalProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    people: '2',
    date: departureDates[0] || '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = '請輸入姓名';
    if (!form.phone.trim()) errs.phone = '請輸入聯絡電話';
    else if (!/^[0-9\-+() ]{8,}$/.test(form.phone)) errs.phone = '電話格式不正確';
    if (!form.date) errs.date = '請選擇出發日期';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', phone: '', people: '2', date: departureDates[0] || '', message: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">立即報名詢問</h2>
              {packageName && <p className="text-sm text-white/70 mt-0.5">{packageName}</p>}
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {submitted ? (
          /* Success */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-2">詢問已送出！</h3>
            <p className="text-gray-500 mb-6">我們將於 24 小時內透過電話或 LINE 與您聯繫，感謝您的詢問！</p>
            <button onClick={handleClose} className="btn-navy">
              關閉
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full border ${errors.name ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition`}
                placeholder="請輸入您的姓名"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">
                聯絡電話 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full border ${errors.phone ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition`}
                placeholder="09xx-xxx-xxx"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">報名人數</label>
              <select
                value={form.people}
                onChange={(e) => setForm({ ...form, people: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n} 人</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">
                出發日期 <span className="text-red-500">*</span>
              </label>
              {departureDates.length > 0 ? (
                <select
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`w-full border ${errors.date ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition bg-white`}
                >
                  <option value="">請選擇日期</option>
                  {departureDates.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`w-full border ${errors.date ? 'border-red-400' : 'border-gray-200'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition`}
                />
              )}
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-800 mb-1">備註訊息</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition resize-none"
                placeholder="有任何特殊需求或問題，請在此告訴我們"
              />
            </div>

            <button type="submit" className="btn-primary w-full text-center">
              送出詢問
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

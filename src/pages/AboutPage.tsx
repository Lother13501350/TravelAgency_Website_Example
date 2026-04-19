import data from '../data/mock-data.json';

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">關於我們</h1>
          <p className="text-white/60 max-w-2xl mx-auto">成立超過 15 年，我們堅持做有溫度的旅行社</p>
        </div>
      </div>

      {/* Company Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wide">Our Story</span>
            <h2 className="text-3xl font-bold text-navy-800 mt-2 mb-6">{data.company.name}的故事</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {data.company.description}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              我們相信旅行不僅是移動，更是一種自我成長。每一個行程都由資深領隊與在地專家共同設計，從小團精品路線到客製化私人旅程，我們致力於創造超越期待的旅遊體驗。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-accent-400">{data.company.stats.totalTravelers.toLocaleString()}+</p>
                <p className="text-sm text-gray-500 mt-1">服務旅客</p>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-accent-400">{data.company.stats.yearsInBusiness}</p>
                <p className="text-sm text-gray-500 mt-1">年經驗</p>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-accent-400">{data.company.stats.destinationCount}+</p>
                <p className="text-sm text-gray-500 mt-1">目的地</p>
              </div>
              <div className="bg-navy-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-accent-400">{data.company.stats.satisfactionRate}%</p>
                <p className="text-sm text-gray-500 mt-1">滿意度</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
              alt="旅行"
              className="rounded-2xl shadow-lg w-full object-cover h-96"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent-400 text-navy-900 rounded-2xl p-6 shadow-xl hidden lg:block">
              <p className="text-4xl font-bold">{data.company.stats.yearsInBusiness}+</p>
              <p className="text-sm font-medium">年深耕旅遊</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">專業團隊</h2>
          <p className="section-subtitle">我們的團隊擁有豐富的旅遊經驗和熱情</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
                <div className="relative pt-8 pb-4 px-6 text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-accent-400/20"
                  />
                  <h3 className="text-lg font-bold text-navy-800 mt-4">{member.name}</h3>
                  <p className="text-accent-400 text-sm font-medium">{member.title}</p>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">專長</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specialties.map((s) => (
                          <span key={s} className="bg-navy-50 text-navy-700 text-xs px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">語言</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.languages.map((l) => (
                          <span key={l} className="bg-accent-400/10 text-accent-400 text-xs px-2 py-0.5 rounded-full">{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">聯絡資訊</h2>
          <p className="section-subtitle">歡迎隨時與我們聯繫，我們將竭誠為您服務</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center card-hover">
              <div className="w-14 h-14 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-800 mb-1">地址</h3>
              <p className="text-sm text-gray-500">{data.company.address}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center card-hover">
              <div className="w-14 h-14 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-800 mb-1">電話</h3>
              <p className="text-sm text-gray-500">{data.company.phone}</p>
              <p className="text-xs text-gray-400 mt-1">{data.company.businessHours}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 text-center card-hover">
              <div className="w-14 h-14 bg-[#06C755]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#06C755]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <h3 className="font-bold text-navy-800 mb-1">LINE</h3>
              <p className="text-sm text-gray-500">{data.company.lineId}</p>
              <a
                href={data.company.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-[#06C755] hover:underline font-medium"
              >
                加入好友
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

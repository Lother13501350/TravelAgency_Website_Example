import data from '../data/mock-data.json';

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">旅遊部落格</h1>
          <p className="text-white/60 max-w-2xl mx-auto">由我們的領隊和旅遊達人分享第一手資訊與旅途故事</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-md card-hover ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`flex flex-col ${index === 0 ? 'md:flex-row' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'md:w-1/2 h-64 md:h-auto' : 'h-52'}`}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className={`p-6 flex flex-col justify-center ${index === 0 ? 'md:w-1/2 md:p-8' : ''}`}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-navy-50 text-navy-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className={`font-bold text-navy-800 mb-2 group-hover:text-accent-400 transition-colors ${
                    index === 0 ? 'text-2xl' : 'text-lg'
                  }`}>
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.summary}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-navy-600">{post.author}</span>
                      <span>·</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingMinutes} 分鐘閱讀
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { useCmsData } from '../contexts/CmsDataContext';

interface BlogProps {
  onNavigate: (page: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('All Articles');
  const { blogPosts } = useCmsData();
  const publishedPosts = useMemo(
    () => blogPosts.filter((post) => (post.status || 'published') === 'published'),
    [blogPosts]
  );

  const tabs = useMemo(() => {
    const categories = ['All Articles', ...Array.from(new Set(publishedPosts.map((post) => post.category)))];
    return categories.map((name) => ({
      name,
      count:
        name === 'All Articles'
          ? publishedPosts.length
          : publishedPosts.filter((post) => post.category === name).length,
    }));
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    if (activeTab === 'All Articles') return publishedPosts;
    return publishedPosts.filter((post) => post.category === activeTab);
  }, [activeTab, publishedPosts]);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-white pb-12 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl font-serif">
              Articles <sup className="font-sans text-2xl font-normal text-gray-500">({publishedPosts.length})</sup>
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Explore a diverse collection of insightful articles, expert tips, and in-depth guides to empower and inspire you on your journey to radiant living.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-gray-200 bg-white">
        <div className="container mx-auto overflow-x-auto scrollbar-hide px-4">
          <div className="flex min-w-max space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`border-b-2 py-4 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                  activeTab === tab.name ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fcfcfc] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => onNavigate(`blog/${post.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={post.image} alt={post.imageAlt || post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-600 shadow-sm backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-teal-600">{post.title}</h3>
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
                  <div className="mt-auto text-sm font-medium text-gray-400">{post.date}</div>
                </div>
              </button>
            ))}
            {filteredPosts.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                No published posts in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#f5f7f9] py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-serif text-gray-800">Book A Therapeutic Facial Today</h2>
          <a href="#" className="inline-block rounded-full bg-teal-500 px-8 py-3 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-teal-600">
            Book Trial Session
          </a>
        </div>
      </section>
    </div>
  );
};

export default Blog;

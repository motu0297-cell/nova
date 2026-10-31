import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Clock, User, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const publishedPosts = posts.filter((p) => p.isPublished);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(publishedPosts.map((p) => p.category)))];

  const filtered =
    selectedCategory === 'All'
      ? publishedPosts
      : publishedPosts.filter((p) => p.category === selectedCategory);

  return (
    <section id="blog" className="relative py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              MARKET INTEL & RESEARCH
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Latest Institutional Insights
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Breakdowns of liquidity sweeps, macroeconomic shifts, and algorithmic psychology.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-sm self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filtered.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group cursor-pointer flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="sm:w-2/5 relative aspect-video sm:aspect-auto overflow-hidden bg-slate-950 shrink-0">
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-md border border-cyan-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.createdAt}</span>
                  </div>

                  <h3 className="mt-2 text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium truncate max-w-[150px]">
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

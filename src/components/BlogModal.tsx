import React from 'react';
import { BlogPost } from '../types';
import { X, Clock, User, Share2, Bookmark, Check } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Category & Meta */}
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-semibold text-cyan-400">
            {post.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{post.createdAt}</span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        {/* Author Bio Bar */}
        <div className="mt-4 flex items-center justify-between border-y border-slate-800/80 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              NV
            </div>
            <div>
              <p className="text-xs font-bold text-white">{post.author}</p>
              <p className="text-[11px] text-slate-400">Senior Research Contributor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? 'Link Copied' : 'Share'}
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 my-6">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Excerpt callout */}
        <div className="rounded-xl border-l-4 border-cyan-400 bg-slate-900/60 p-4 text-sm text-slate-200 italic mb-6">
          "{post.excerpt}"
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">NOVA FX Institutional Research Desk</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};

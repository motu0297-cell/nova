import React from 'react';
import { Course } from '../types';
import { X, Star, Clock, BookOpen, Users, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 mb-6">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="rounded-md bg-cyan-500 px-2.5 py-1 text-xs font-bold text-black uppercase">
                {course.level} Program
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                {course.title}
              </h2>
            </div>
            <div className="font-mono text-2xl font-bold text-white bg-black/60 px-3 py-1 rounded-xl backdrop-blur-md">
              ${course.price}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-slate-800/80 pb-4 text-xs text-slate-300">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" /> {course.rating.toFixed(2)} Rating
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-cyan-400" /> {course.duration}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-blue-400" /> {course.modulesCount || course.modules?.length} Modules
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4 text-emerald-400" /> {course.enrolledCount} Active Traders
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
            Course Overview
          </h4>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {course.description || course.shortDescription}
          </p>
        </div>

        {/* Modules & Syllabus */}
        <div className="mt-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4">
            Full Curriculum & Module Breakdown
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((mod, i) => (
                <div
                  key={mod.id || i}
                  className="rounded-xl border border-slate-800/90 bg-slate-900/60 p-4"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-white">
                    <span>{mod.title}</span>
                    <span className="text-cyan-400 font-mono text-xs">{mod.duration}</span>
                  </div>
                  {mod.lessons && mod.lessons.length > 0 && (
                    <ul className="mt-2 space-y-1.5 pl-2 border-l border-slate-800">
                      {mod.lessons.map((lesson, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle className="h-3 w-3 text-cyan-400 shrink-0" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">Comprehensive video archive included.</p>
            )}
          </div>
        </div>

        {/* CUSTOMIZABLE LINKS SECTION */}
        {course.customLinks && course.customLinks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Course Resources & Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.customLinks.map((linkItem, idx) => (
                <a
                  key={linkItem.id || idx}
                  href={linkItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs hover:border-cyan-500/40 hover:bg-slate-900 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {linkItem.type === 'youtube' ? (
                      <span className="flex h-5 w-6 items-center justify-center rounded-sm bg-[#FF0000] p-0.5 shrink-0">
                        <svg className="h-3 w-3 fill-white ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                        <CheckCircle className="h-3 w-3" />
                      </span>
                    )}
                    <span className="font-semibold text-white group-hover:text-cyan-300 truncate">
                      {linkItem.title}
                    </span>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-400 uppercase shrink-0 ml-2">
                    {linkItem.type || 'Link'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Lifetime Academy Access & Future Updates
          </div>

          <div className="flex items-center gap-3">
            {course.youtubeUrl && (
              <a
                href={course.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs font-bold text-red-300 hover:bg-red-900/50 hover:text-white transition-all shadow-sm shadow-red-500/10 cursor-pointer"
              >
                <span className="flex h-4 w-5 items-center justify-center rounded-sm bg-[#FF0000] p-0.5">
                  <svg className="h-2.5 w-2.5 fill-white ml-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                <span>Watch on YouTube</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Enroll In Program (${course.price})
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Course } from '../types';
import { Star, Clock, BookOpen, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface CoursesSectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onSelectCourse,
  onEnroll,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const publishedCourses = courses.filter((c) => c.isPublished);

  const filtered =
    filterLevel === 'All'
      ? publishedCourses
      : publishedCourses.filter((c) => c.level === filterLevel);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'Intermediate':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      case 'Advanced':
        return 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400';
      case 'Mastery':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <section id="courses" className="relative py-20 lg:py-28 bg-slate-950 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              STRUCTURED CURRICULUM
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Institutional Trading Programs
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              From pure price action mechanics to six-figure prop firm evaluation mastery.
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-sm self-start md:self-auto">
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'Mastery'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  filterLevel === lvl
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Level Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`rounded-md border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md ${getLevelColor(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* Flagship / Special badge */}
                  {course.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                        <Sparkles className="h-3 w-3" />
                        {course.badge}
                      </span>
                    </div>
                  )}

                  {/* Enrolled & Rating tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400" />
                      {course.rating.toFixed(2)}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-300">
                      <Users className="h-3 w-3 text-cyan-400" />
                      {course.enrolledCount.toLocaleString()} Students
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Course stats */}
                  <div className="mt-4 flex items-center gap-4 border-t border-slate-800/80 pt-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                      {course.modulesCount || course.modules?.length || 4} Modules
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Actions */}
              <div className="border-t border-slate-800/80 bg-slate-900/60 p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    One-time Access
                  </span>
                  <div className="font-mono text-xl font-bold text-white">
                    ${course.price}
                    <span className="text-xs font-normal text-slate-400 ml-1">USD</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {course.youtubeUrl && (
                    <a
                      href={course.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-2.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-900/50 hover:text-white transition-colors cursor-pointer"
                      title="Watch Preview / Stream on YouTube"
                    >
                      <span className="flex h-3.5 w-4 items-center justify-center rounded-sm bg-[#FF0000] p-0.5">
                        <svg className="h-2 w-2 fill-white ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                      <span>YouTube</span>
                    </a>
                  )}

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:text-white transition-colors cursor-pointer"
                  >
                    Curriculum
                  </button>

                  <button
                    onClick={() => onEnroll(course)}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-bold text-black hover:bg-cyan-400 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    Enroll
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

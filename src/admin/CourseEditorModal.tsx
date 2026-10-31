import React, { useState } from 'react';
import { Course, CourseModule, CourseLinkItem } from '../types';
import { ImageUploadField } from '../components/ImageUploadField';
import { X, Plus, Trash2, Save, Sparkles, Link, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';

interface CourseEditorModalProps {
  course: Course | null;
  onSave: (course: Course) => Promise<void>;
  onClose: () => void;
}

export const CourseEditorModal: React.FC<CourseEditorModalProps> = ({
  course,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Course>(() => {
    if (course) return { ...course };
    return {
      id: 'course-' + Date.now(),
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      level: 'Intermediate',
      price: 199,
      duration: '16 Hours • 4 Modules',
      modulesCount: 4,
      rating: 4.9,
      enrolledCount: 150,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      badge: '',
      youtubeUrl: '',
      customLinks: [],
      modules: [
        {
          id: 'm1',
          title: 'Module 1: Foundations & Structure',
          duration: '3h 30m',
          lessons: ['Introduction to Order Flow', 'Market Structure Basics'],
        },
      ],
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleAddLink = () => {
    const newLink: CourseLinkItem = {
      id: 'link-' + Date.now(),
      title: 'YouTube Strategy Walkthrough',
      url: 'https://youtube.com',
      type: 'youtube',
    };
    setFormData((prev) => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), newLink],
    }));
  };

  const handleRemoveLink = (idx: number) => {
    setFormData((prev) => {
      const copy = [...(prev.customLinks || [])];
      copy.splice(idx, 1);
      return { ...prev, customLinks: copy };
    });
  };

  const handleMoveLink = (idx: number, direction: -1 | 1) => {
    setFormData((prev) => {
      const list = [...(prev.customLinks || [])];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = temp;
      return { ...prev, customLinks: list };
    });
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, title: val, slug: prev.slug || slug }));
  };

  const handleAddModule = () => {
    const newMod: CourseModule = {
      id: 'm-' + Date.now(),
      title: `Module ${(formData.modules?.length || 0) + 1}: New Topic`,
      duration: '2h 30m',
      lessons: ['Key Concept Overview', 'Live Chart Demonstration'],
    };
    setFormData((prev) => ({
      ...prev,
      modules: [...(prev.modules || []), newMod],
      modulesCount: (prev.modules?.length || 0) + 1,
    }));
  };

  const handleRemoveModule = (index: number) => {
    setFormData((prev) => {
      const updated = [...(prev.modules || [])];
      updated.splice(index, 1);
      return { ...prev, modules: updated, modulesCount: updated.length };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave({
      ...formData,
      modulesCount: formData.modules?.length || formData.modulesCount,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">
          {course ? 'Edit Course Program' : 'Create New Course Program'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
          {/* Image Upload System */}
          <ImageUploadField
            label="Course Thumbnail Image"
            value={formData.thumbnailUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, thumbnailUrl: url }))}
            helperText="Upload, replace, delete or choose from institutional presets"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Smart Money Concepts Mastery"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Mastery">Mastery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Price (USD) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Flagship, 91% Pass Rate"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* YouTube Video Link Field */}
          <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wide">
                <span className="flex h-4 w-5 items-center justify-center rounded-sm bg-[#FF0000] p-0.5 shadow-sm">
                  <svg className="h-2.5 w-2.5 fill-white ml-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                Course YouTube Video / Preview Link
              </label>
              <span className="text-[10px] text-slate-400 font-mono">YouTube URL</span>
            </div>
            <input
              type="url"
              value={formData.youtubeUrl || ''}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none font-mono"
            />
            <p className="text-[11px] text-slate-400">
              Students will see a &ldquo;Watch on YouTube / Preview&rdquo; button on the course card and detail view.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Duration String
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 24 Hours • 6 Modules"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Rating (1 - 5)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5 })}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Enrolled Count
              </label>
              <input
                type="number"
                value={formData.enrolledCount}
                onChange={(e) => setFormData({ ...formData, enrolledCount: parseInt(e.target.value) || 0 })}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Short Description (Card Summary)
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Full Syllabus Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Curriculum Modules */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Curriculum Modules ({formData.modules?.length || 0})
              </label>
              <button
                type="button"
                onClick={handleAddModule}
                className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus className="h-3 w-3" /> Add Module
              </button>
            </div>

            <div className="space-y-2">
              {formData.modules?.map((mod, idx) => (
                <div
                  key={mod.id || idx}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs"
                >
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => {
                      const updated = [...(formData.modules || [])];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, modules: updated });
                    }}
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={mod.duration}
                    onChange={(e) => {
                      const updated = [...(formData.modules || [])];
                      updated[idx].duration = e.target.value;
                      setFormData({ ...formData, modules: updated });
                    }}
                    placeholder="Duration"
                    className="w-24 rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(idx)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMIZABLE LINKS SECTION */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Link className="h-3.5 w-3.5 text-cyan-400" />
                  Customizable Links Section ({formData.customLinks?.length || 0})
                </label>
                <p className="text-[11px] text-slate-400">
                  Add custom YouTube videos, Drive study materials, Discord channels, or external resources for this course.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddLink}
                className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400 hover:bg-cyan-500/20 cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add Link
              </button>
            </div>

            {formData.customLinks && formData.customLinks.length > 0 ? (
              <div className="space-y-2.5">
                {formData.customLinks.map((linkItem, idx) => (
                  <div
                    key={linkItem.id || idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs"
                  >
                    <select
                      value={linkItem.type || 'youtube'}
                      onChange={(e) => {
                        const updated = [...(formData.customLinks || [])];
                        updated[idx].type = e.target.value as any;
                        setFormData({ ...formData, customLinks: updated });
                      }}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-cyan-300 font-medium"
                    >
                      <option value="youtube">YouTube Video</option>
                      <option value="drive">Google Drive / PDF</option>
                      <option value="tradingview">TradingView Template</option>
                      <option value="telegram">Telegram Channel</option>
                      <option value="discord">Discord Community</option>
                      <option value="notion">Notion Notes</option>
                      <option value="custom">Custom Link</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Display Title (e.g. Live Strategy Walkthrough)"
                      value={linkItem.title}
                      onChange={(e) => {
                        const updated = [...(formData.customLinks || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, customLinks: updated });
                      }}
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-white"
                    />

                    <input
                      type="url"
                      placeholder="Destination URL (https://...)"
                      value={linkItem.url}
                      onChange={(e) => {
                        const updated = [...(formData.customLinks || [])];
                        updated[idx].url = e.target.value;
                        setFormData({ ...formData, customLinks: updated });
                      }}
                      className="w-full sm:w-56 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-cyan-400 font-mono"
                    />

                    <div className="flex items-center gap-1 self-end sm:self-center">
                      {linkItem.url && (
                        <a
                          href={linkItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-cyan-400"
                          title="Test Link"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveLink(idx, -1)}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === (formData.customLinks?.length || 1) - 1}
                        onClick={() => handleMoveLink(idx, 1)}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                        title="Delete Link"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 p-4 text-center text-xs text-slate-500">
                No custom links added yet. Click &ldquo;Add Link&rdquo; to attach YouTube videos, PDFs, or external materials.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
            />
            <label htmlFor="isPublished" className="text-xs text-slate-300">
              Publish on public website
            </label>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-6 py-2 text-xs font-bold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

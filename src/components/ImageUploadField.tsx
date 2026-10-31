import React, { useState, useRef } from 'react';
import { Upload, Trash2, RefreshCw, Image as ImageIcon, Sparkles, Check, Link } from 'lucide-react';
import { TRADING_IMAGE_PRESETS } from '../data/initialData';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'avatar' | 'wide';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  aspectRatio = 'video',
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size must be less than 8MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        try {
          // Attempt persistent upload to backend API with admin auth
          let token: string | null = null;
          try {
            const sessionRaw = localStorage.getItem('novafx_admin_session');
            if (sessionRaw) {
              const parsed = JSON.parse(sessionRaw);
              token = parsed.token || null;
            }
          } catch {}

          const headers: Record<string, string> = { 'Content-Type': 'application/json' };
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }

          const response = await fetch('/api/upload', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              imageBase64: base64Data,
              fileName: file.name,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            if (result.url) {
              onChange(result.url);
              setIsUploading(false);
              return;
            }
          }
        } catch {
          // If server upload failed, fallback to base64
        }

        // Resilient fallback: use base64 data directly
        onChange(base64Data);
        setIsUploading(false);
      };

      reader.onerror = () => {
        setUploadError('Failed to read image file');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch {
      setUploadError('Upload failed. Please try again.');
      setIsUploading(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = () => {
    onChange('');
  };

  const handleApplyCustomUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl('');
      setShowUrlInput(false);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[200px]';
      case 'avatar':
        return 'w-24 h-24 rounded-full';
      case 'wide':
        return 'aspect-[21/9] w-full';
      case 'video':
      default:
        return 'aspect-video w-full';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
        {helperText && <span className="text-xs text-slate-400">{helperText}</span>}
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image Preview & Action Controls */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 backdrop-blur-sm">
        {value ? (
          <div className="space-y-3">
            <div className={`relative overflow-hidden rounded-lg bg-slate-950 border border-slate-800/80 ${getAspectClass()}`}>
              <img
                src={value}
                alt={label}
                className={`h-full w-full object-cover transition-transform duration-300 hover:scale-105 ${
                  aspectRatio === 'avatar' ? 'rounded-full' : ''
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-cyan-400 backdrop-blur-md">
                <Check className="h-3 w-3" /> Image Active
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                {isUploading ? 'Uploading...' : 'Replace Image'}
              </button>

              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Select Preset
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Link className="h-3.5 w-3.5 text-blue-400" />
                URL
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <ImageIcon className="h-7 w-7" />
            </div>
            <p className="text-sm font-medium text-slate-200">No image assigned yet</p>
            <p className="mt-1 text-xs text-slate-400">
              Upload from your device, choose from high-res trading presets, or provide a URL
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-black hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Upload className="h-3.5 w-3.5" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>

              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Choose Preset
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Link className="h-3.5 w-3.5 text-blue-400" />
                Direct URL
              </button>
            </div>
          </div>
        )}

        {/* URL Input Drawer */}
        {showUrlInput && (
          <div className="mt-3 flex gap-2 border-t border-slate-800 pt-3">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCustomUrl}
              className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-cyan-400 transition-colors"
            >
              Apply
            </button>
          </div>
        )}

        {/* Error notification */}
        {uploadError && (
          <div className="mt-2 rounded-lg bg-red-500/10 border border-red-500/20 p-2 text-xs text-red-400">
            {uploadError}
          </div>
        )}

        {/* Curated Presets Grid */}
        {showPresets && (
          <div className="mt-3 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Select Institutional Visual Asset:
              </span>
              <button
                type="button"
                onClick={() => setShowPresets(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
              {TRADING_IMAGE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setShowPresets(false);
                  }}
                  className="group relative aspect-video overflow-hidden rounded-md border border-slate-800 hover:border-cyan-400 transition-all text-left"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1 flex items-end">
                    <span className="text-[10px] font-medium text-slate-200 truncate w-full">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

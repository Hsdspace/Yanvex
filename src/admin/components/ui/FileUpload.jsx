import React, { useRef, useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import clsx from 'clsx';

const FileUpload = React.forwardRef(({ label, accept = 'image/*', onFileChange, preview = true, error, className = '' }, ref) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange?.(selectedFile);

      if (preview && selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = '';
    onFileChange?.(null);
  };

  return (
    <label className="block w-full text-sm text-slate-300">
      {label && <span className="mb-3 inline-block text-sm font-medium text-slate-200">{label}</span>}

      <div
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'relative rounded-2xl border-2 border-dashed border-white/10 bg-slate-950/80 p-6 text-center cursor-pointer transition hover:border-cyan-400/50 hover:bg-slate-950/90',
          className
        )}
      >
        {previewUrl && preview ? (
          <div className="relative inline-block">
            <img src={previewUrl} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : file ? (
          <div className="flex items-center justify-center gap-3 text-slate-300">
            <File size={20} />
            <div className="text-left">
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="ml-auto rounded-full bg-red-500/20 p-1 text-red-400 hover:bg-red-500/30"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} className="text-cyan-400/60" />
            <p className="text-sm font-medium text-slate-200">Drop file here or click to upload</p>
            <p className="text-xs text-slate-500">Supported: {accept.replace('*', '*')}</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="mt-2 text-xs text-[#ff9aa2]">{error}</p>}
    </label>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const displayPages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-400">
        Page <span className="font-semibold text-slate-200">{currentPage}</span> of <span className="font-semibold text-slate-200">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>

        {displayPages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-400 hover:text-cyan-400 transition"
            >
              1
            </button>
            {displayPages[0] > 2 && <span className="text-slate-500">...</span>}
          </>
        )}

        {displayPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              'rounded-lg px-3 py-2 text-sm font-medium transition',
              currentPage === page
                ? 'bg-cyan-500 text-white'
                : 'border border-white/10 bg-slate-950/80 text-slate-400 hover:text-cyan-400'
            )}
          >
            {page}
          </button>
        ))}

        {displayPages[displayPages.length - 1] < totalPages && (
          <>
            {displayPages[displayPages.length - 1] < totalPages - 1 && <span className="text-slate-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-400 hover:text-cyan-400 transition"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-white/10 bg-slate-950/80 p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

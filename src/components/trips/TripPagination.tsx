import React from 'react';

interface TripPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TripPagination: React.FC<TripPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm mt-6">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 text-sm font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 rounded-lg transition-colors"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${
              currentPage === page 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 text-sm font-bold text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 rounded-lg transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default TripPagination;

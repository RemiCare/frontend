import React from 'react';

const TimeInputRow = ({ index, value, onChange, onDelete, showDelete = true }) => {
  return (
    <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center gap-2 flex-1">
        <span className="text-blue-600 font-medium">⏰</span>
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(index, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      {showDelete && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          title="시간 삭제"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TimeInputRow;
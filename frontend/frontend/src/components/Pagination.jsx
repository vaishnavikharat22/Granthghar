import React from 'react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`mx-1 px-4 py-2 border rounded ${
            x + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
          }`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

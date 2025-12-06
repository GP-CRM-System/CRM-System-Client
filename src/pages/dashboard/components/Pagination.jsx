import React from 'react';

const Pagination = ({ page, limit, total, onPageChange }) => {
    const totalPages = Math.ceil(total / limit);
    const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
    const endEntry = Math.min(page * limit, total);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 gap-4">
            <span className="text-gray-400 text-sm text-center sm:text-left">
                Showing data {startEntry} to {endEntry} of {total} entries
            </span>
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <button 
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    &lt;
                </button>
                
                <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-500 text-white text-sm font-medium shadow-sm">
                    {page}
                </button>
                
                {page < totalPages && (
                    <button 
                        className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-gray-200 text-sm font-medium"
                        onClick={() => onPageChange(page + 1)}
                    >
                        {page + 1}
                    </button>
                )}
                
                {totalPages > 2 && page < totalPages - 1 && (
                    <>
                        <span className="text-gray-400 text-sm px-1">...</span>
                        <button 
                            className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-gray-200 text-sm font-medium"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                
                <button 
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 hover:bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Pagination;

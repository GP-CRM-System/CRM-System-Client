import React from 'react';
import SideModal from './SideModal';

const FilterModal = ({ open, onClose, onApply, onClear, title = "Filter", children }) => {
    const handleApply = () => {
        if (onApply) onApply();
    };

    const handleClear = () => {
        if (onClear) onClear();
    };

    return (
        <SideModal open={open} onClose={onClose} title={title}>
            <div className="space-y-4 pb-20">
                {children}
            </div>
            
            <div className="sticky bottom-0 left-0 w-full px-6 py-4 bg-white border-t border-gray-100 z-20 mt-auto">
                <div className="flex gap-3">
                    <button
                        onClick={handleClear}
                        className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </SideModal>
    );
};

export default FilterModal;

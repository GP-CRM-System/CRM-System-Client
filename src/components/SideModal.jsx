import React from 'react';

function SideModal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/30" onClick={onClose} />
                
                <div className="ml-auto h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right overflow-y-auto relative hide-scrollbar">
                    <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button onClick={onClose} className="text-white text-2xl font-light bg-[#B3B3B3] rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                    </div>
                    <div className="p-6 pt-6 flex-1 min-h-0">{children}</div>
                </div>

            <style>{`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.25s cubic-bezier(0.4,0,0.2,1);
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

export default SideModal;

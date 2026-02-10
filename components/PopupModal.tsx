import React from 'react';
import { X } from 'lucide-react';

interface PopupModalProps {
    onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <button 
                onClick={onClose}
                className="absolute top-2 right-2 bg-white/50 hover:bg-white rounded-full p-1 text-gray-800 transition-colors z-10"
            >
                <X size={24} />
            </button>
            <a href="#">
                <img 
                    src="https://picsum.photos/800/600?random=99" 
                    alt="Promo" 
                    className="w-full h-auto object-cover"
                />
            </a>
        </div>
    </div>
  );
};

export default PopupModal;

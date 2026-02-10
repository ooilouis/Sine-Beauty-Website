import React from 'react';
import { MessageCircle, Calendar, MapPin } from 'lucide-react';

interface MobileBottomBarProps {
    onNavigate?: (page: string) => void;
}

const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, page: string) => {
      if (onNavigate) {
          e.preventDefault();
          onNavigate(page);
      }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a href="https://wa.me/6587680183" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center py-3 border-r border-gray-100 active:bg-gray-50">
            <MessageCircle size={20} className="text-green-500 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">WhatsApp</span>
        </a>
        <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="flex-1 flex flex-col items-center justify-center py-3 border-r border-gray-100 active:bg-gray-50">
            <Calendar size={20} className="text-teal-600 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">Book Appt</span>
        </a>
        <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="flex-1 flex flex-col items-center justify-center py-3 active:bg-gray-50">
            <MapPin size={20} className="text-blue-500 mb-1" />
            <span className="text-[10px] font-semibold text-gray-600">Locate Us</span>
        </a>
    </div>
  );
};

export default MobileBottomBar;
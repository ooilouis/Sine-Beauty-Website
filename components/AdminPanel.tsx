
import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Settings, Save, RotateCcw, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { isAdmin, toggleAdmin, resetContent, saveToDatabase } = useContent();

  if (!isAdmin) {
    return (
      <button 
        onClick={toggleAdmin}
        className="fixed bottom-4 left-4 z-[9999] bg-gray-900 text-white p-3 rounded-full shadow-lg opacity-20 hover:opacity-100 transition-opacity"
        title="Enable Admin Mode"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-white border border-gray-200 shadow-2xl rounded-lg p-4 w-64 animate-in slide-in-from-bottom-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Settings size={16} className="text-teal-600" />
            Admin Mode
        </h3>
        <button onClick={toggleAdmin} className="text-gray-400 hover:text-red-500">
            <X size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs text-gray-500 mb-3 bg-blue-50 p-2 rounded">
            Click on any highlighted text or image to edit content instantly.
        </div>

        <button 
            onClick={saveToDatabase}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors text-sm font-bold"
        >
            <Save size={14} />
            Publish Changes
        </button>

        <button 
            onClick={resetContent}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2 rounded hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
        >
            <RotateCcw size={14} />
            Reset to Default
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;

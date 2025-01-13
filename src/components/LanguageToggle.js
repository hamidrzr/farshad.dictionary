import React from 'react';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';

function LanguageToggle({ sourceLanguage, targetLanguage, toggleLanguage }) {
  return (
    <div className="flex justify-center items-center mb-6">
      <span className="text-lg font-semibold">{sourceLanguage === 'en' ? 'English' : 'Persian'}</span>
      <button 
        onClick={toggleLanguage}
        className="mx-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
      >
        <SwitchHorizontalIcon className="h-6 w-6" />
      </button>
      <span className="text-lg font-semibold">{targetLanguage === 'en' ? 'English' : 'Persian'}</span>
    </div>
  );
}

export default LanguageToggle;

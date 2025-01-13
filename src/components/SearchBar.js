import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

function SearchBar({ searchWord, setSearchWord, sourceLanguage }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder={`Enter a ${sourceLanguage === 'en' ? 'English' : 'Persian'} word`}
        className="w-full p-4 pr-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        dir={sourceLanguage === 'en' ? 'ltr' : 'rtl'}
      />
      <SearchIcon className="h-6 w-6 text-gray-400 absolute top-1/2 right-4 transform -translate-y-1/2" />
    </div>
  );
}

export default SearchBar;

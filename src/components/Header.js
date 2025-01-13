import React from 'react';
import { BookOpenIcon } from '@heroicons/react/outline';

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <BookOpenIcon className="h-8 w-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">English-Persian Dictionary</h1>
      </div>
    </header>
  );
}

export default Header;

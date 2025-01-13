import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import LanguageToggle from './components/LanguageToggle';

const queryClient = new QueryClient();

function App() {
  const [searchWord, setSearchWord] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fa');
  const [localDatabase, setLocalDatabase] = useState({});

  useEffect(() => {
    const storedDatabase = localStorage.getItem('translationDatabase');
    if (storedDatabase) {
      setLocalDatabase(JSON.parse(storedDatabase));
    }
  }, []);

  const toggleLanguage = () => {
    setSourceLanguage(prev => prev === 'en' ? 'fa' : 'en');
    setTargetLanguage(prev => prev === 'en' ? 'fa' : 'en');
    setSearchWord('');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <LanguageToggle 
            sourceLanguage={sourceLanguage} 
            targetLanguage={targetLanguage} 
            toggleLanguage={toggleLanguage} 
          />
          <SearchBar 
            searchWord={searchWord} 
            setSearchWord={setSearchWord} 
            sourceLanguage={sourceLanguage}
          />
          <Results 
            searchWord={searchWord} 
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            localDatabase={localDatabase}
            setLocalDatabase={setLocalDatabase}
          />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { TranslateIcon, BookOpenIcon, LightBulbIcon } from '@heroicons/react/outline';

async function translateWord(word, sourceLang, targetLang) {
  const response = await axios.get(`https://api.mymemory.translated.net/get?q=${word}&langpair=${sourceLang}|${targetLang}`);
  return response.data.responseData.translatedText;
}

async function fetchSynonymsAntonyms(word) {
  const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}&rel_ant=${word}`);
  const synonyms = response.data.filter(item => item.tags && item.tags.includes('syn')).slice(0, 5).map(item => item.word);
  const antonyms = response.data.filter(item => item.tags && item.tags.includes('ant')).slice(0, 5).map(item => item.word);
  return { synonyms, antonyms };
}

function Results({ searchWord, sourceLanguage, targetLanguage, localDatabase, setLocalDatabase }) {
  const { data: translation, isLoading: translationLoading, error: translationError } = useQuery(
    ['translation', searchWord, sourceLanguage, targetLanguage],
    () => translateWord(searchWord, sourceLanguage, targetLanguage),
    {
      enabled: !!searchWord,
      onSuccess: (data) => {
        const updatedDatabase = { ...localDatabase, [searchWord]: data };
        setLocalDatabase(updatedDatabase);
        localStorage.setItem('translationDatabase', JSON.stringify(updatedDatabase));
      }
    }
  );

  const { data: synonymsAntonyms, isLoading: synAntLoading, error: synAntError } = useQuery(
    ['synonymsAntonyms', searchWord],
    () => fetchSynonymsAntonyms(searchWord),
    { enabled: !!searchWord && sourceLanguage === 'en' }
  );

  if (!searchWord) return null;
  if (translationLoading || synAntLoading) return <div className="mt-8 text-center text-gray-600">Loading...</div>;
  if (translationError || synAntError) return <div className="mt-8 text-center text-red-600">Error occurred while fetching data.</div>;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <TranslateIcon className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">{searchWord}</h2>
      </div>
      <p className="text-xl text-gray-700" dir={targetLanguage === 'fa' ? 'rtl' : 'ltr'}>{translation}</p>
      
      {sourceLanguage === 'en' && synonymsAntonyms && (
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <BookOpenIcon className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Synonyms & Antonyms</h3>
          </div>
          {synonymsAntonyms.synonyms.length > 0 && (
            <p className="text-gray-700"><strong>Synonyms:</strong> {synonymsAntonyms.synonyms.join(', ')}</p>
          )}
          {synonymsAntonyms.antonyms.length > 0 && (
            <p className="text-gray-700 mt-2"><strong>Antonyms:</strong> {synonymsAntonyms.antonyms.join(', ')}</p>
          )}
        </div>
      )}
      
      <div className="mt-6">
        <div className="flex items-center mb-2">
          <LightBulbIcon className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Example Sentence</h3>
        </div>
        <p className="text-gray-700 italic">
          {`This is an example sentence using the word "${searchWord}".`}
        </p>
      </div>
    </div>
  );
}

export default Results;

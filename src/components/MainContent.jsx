import React from 'react';
import PropTypes from 'prop-types';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

function MainContent({
  outputText,
  language,
  summary,
  translatedText,
  onSummarize,
  onTranslate,
  isSummarizing,
  isTranslating,
  targetLanguage,
  setTargetLanguage,
  onSend,
  onClearChat,
}) 
  
{ 

  return (
    <div className="flex-1 flex flex-col bg-white -ml-80 md:ml-0">
    
      {/* Output Area */}
      <OutputArea
        key={translatedText}
        outputText={outputText}
        language={language}
        summary={summary}
        translatedText={translatedText}
      />

      {/* Summarize Button */}
      {outputText.length > 150 && language === 'en' && (
        <button
          onClick={onSummarize}
          disabled={isSummarizing}
          className={`bg-purple-500 text-white px-4 py-2 rounded mt-2 ${
            isSummarizing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSummarizing ? 'Summarizing...' : 'Summarize'}
        </button>
      )}

      {/* Language Selection and Translate Button */}
      <div className="p-4 border-t border-gray-200">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          disabled={isTranslating} 
        
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-10/12 p-2.5"
        >
          <option value="es">Spanish (es)</option>
          <option value="pt">Portuguese (pt)</option>
          <option value="ru">Russian (ru)</option>
          <option value="tr">Turkish (tr)</option>
          <option value="fr">French (fr)</option>
        </select>

        <button
          onClick={onTranslate}
          disabled={isTranslating || !outputText || language === 'unknown' || language === targetLanguage}
          className={`mt-2 bg-purple-500 text-white px-4 py-2 rounded ${
            isTranslating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
      </div>

      <button
        onClick={onClearChat}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-9/12 hover:bg-red-600"
      >
        Clear Chat
      </button>


      {/* Input Area */}
      <InputArea onSend={onSend} />
    </div>
  );
}

// PropType validation
MainContent.propTypes = {
  outputText: PropTypes.string.isRequired, 
  language: PropTypes.string.isRequired, 
  summary: PropTypes.string, 
  translatedText: PropTypes.string, 
  onSummarize: PropTypes.func.isRequired, 
  onTranslate: PropTypes.func.isRequired, 
  onSend: PropTypes.func.isRequired,
  onClearChat: PropTypes.func.isRequired,
  isSummarizing: PropTypes.bool.isRequired,
  isTranslating: PropTypes.bool.isRequired, 
  targetLanguage: PropTypes.string.isRequired, 
  setTargetLanguage: PropTypes.func.isRequired, 
};

export default MainContent;
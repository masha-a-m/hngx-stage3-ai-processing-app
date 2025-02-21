import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

import {
  isLanguageDetectorSupported,
  detectLanguage,
  isSummarizerSupported,
  summarizeText,
  translateText,
  isTranslatorSupported,
} 
from './utilities/api';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [language, setLanguage] = useState('');
  const [summary, setSummary] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es'); 
  
  
  useEffect(() => {
    
    if (!isLanguageDetectorSupported()) {
      alert('Language detection is not supported in this browser.');
    }
    if (!isTranslatorSupported()) {
      alert('Translation is not supported in this browser.');
    }
    if (!isSummarizerSupported()) {
      alert('Summarizer is not supported in this browser.');
    }
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const handleSend = async (text) => {
      console.log('handleSend called with text:', text);
    setOutputText(text);

    const result = await detectLanguage(text);
    setLanguage(result.detectedLanguage);
    // Reset summary and translation
    setSummary('');
    setTranslatedText('');
  };
  
  const handleSummarize = async () => {
    if (!outputText || outputText.length <= 150) {
      alert('Input text must be longer than 150 characters to summarize.');
      return;
    }
    if (language !== 'en') {
      alert('Summarization is only available for English text.');
      return;
    }
    setIsTranslating(true);
    try {
      const summarizedText = await summarizeText(outputText, {
        type: 'key-points',
        format: 'plain-text',
        length: 'medium',
      });
      if (summarizedText) {
        setSummary(summarizedText);
      } 
      else {
        alert('Failed to generate summary.');
      }
    } catch (error) {
      console.error('Error during summarization:', error);
      alert('An error occurred while generating the summary.');
    } finally {
      setIsTranslating(false);
    }
  };


const onTranslate = async () => {
  if (!outputText) {
    alert('Please enter some text to translate.');
    return;
  }
  if (language === 'unknown') {
    alert('Unable to detect the source language.');
    return;
  }
  if (language === targetLanguage) {
    alert('Source and target languages are the same.');
    return;
  }
  setIsTranslating(true);
  try {
    console.log('Starting translation...');
    const translated = await translateText(outputText, language, targetLanguage);
    if (translated && translated.trim() !== '') {
      console.log('Setting translated text:', translated);
      setTranslatedText(translated); 
    } else {
      console.warn('Empty or invalid translation received.');
      alert('Failed to generate translation.');
    }
  } catch (error) {
    console.error('Error during translation:', error.message); 
    alert('An error occurred while translating the text.');
  } finally {
    setIsTranslating(false); 
  }
};
    
const handleClearChat = () => {
    setOutputText(''); 
    setLanguage(''); 
    setSummary(''); 
    setTranslatedText('');
  };

const Spinner = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#643c6e',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
    <div
        className="spinner"
        style={{
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #886191',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 3s linear infinite',
        }}
      ></div>
    </div>
  );

  const spinKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  return (
    <>
      <style>{spinKeyframes}</style>
      {!isLoaded && <Spinner />}

      {isLoaded && (
        <div className="flex h-screen">

          {/* Sidebar */}
          <Sidebar />

      {/* Main Content */}
      <MainContent
        outputText={outputText}
        language={language}
        summary={summary}
        translatedText={translatedText}
        onSend={handleSend}
        onClearChat={handleClearChat}
        onSummarize={handleSummarize}
        onTranslate={onTranslate}
        isTranslating={isTranslating}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
      />
    </div>
  )}
  </>
);
}
export default App;
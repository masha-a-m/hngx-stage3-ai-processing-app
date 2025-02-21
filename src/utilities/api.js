export async function checkCapabilities() {
  if (!('ai' in self && 'languageDetector' in self.ai)) {
    console.error('Language Detector API is not supported.');
    return null;
  }

  try {
    const capabilities = await self.ai.languageDetector.capabilities();
    console.log('Capabilities:', capabilities);

    if (capabilities.available === 'no') {
      console.error('Language detection is not available.');
      return null;
    }

    return capabilities;
  } catch (error) {
    console.error('Error checking capabilities:', error);
    return null;
  }
}

export async function initializeLanguageDetector() {
  const capabilities = await checkCapabilities();
  if (!capabilities) {
    console.error('Failed to initialize language detector.');
    return null;
  }

  let detector;

  if (capabilities.available === 'readily') {
    detector = await self.ai.languageDetector.create();
  } else if (capabilities.available === 'after-download') {
    
    detector = await self.ai.languageDetector.create({
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloading model... ${Math.round((e.loaded / e.total) * 100)}% complete`);
        });
      },
    });

    await detector.ready;
  }

  return detector;
}

export function isLanguageDetectorSupported() {
  return 'ai' in self && 'languageDetector' in self.ai;
}

export async function detectLanguage(text) {
  
  
  try {
    if (!isLanguageDetectorSupported()) {
      console.error('Language Detector API is not supported.');
      return { detectedLanguage: 'unknown', confidence: 0 };
    }

    const detector = await self.ai.languageDetector.create();
    await detector.ready;

    const results = await detector.detect(text);

    if (results.length > 0) {
      const topResult = results[0];

    if (topResult.confidence < 0.5) {
      console.warn('Low confidence in language detection.');
      return { detectedLanguage: 'unknown', confidence: topResult.confidence };
    }

      console.log('Detected Language:', topResult.detectedLanguage, 'Confidence:', topResult.confidence);
      return topResult;
    } else {
      console.warn('No language detected.');
      return { detectedLanguage: 'unknown', confidence: 0 };
    }
  } catch (error) {
    console.error('Error detecting language:', error);
    return { detectedLanguage: 'unknown', confidence: 0 };
  }
}


//Summarizer API

export async function checkSummarizerCapabilities() {
  if (!('ai' in self && 'summarizer' in self.ai)) {
    console.error('Summarizer API is not supported.');
    return null;
  }

  try {
    const capabilitiesSum = await self.ai.summarizer.capabilities();
    console.log('Summarizer Capabilities:', capabilitiesSum);

    if (capabilitiesSum.available === 'no') {
      console.error('Summarization is not available.');
      return null;
    }

    return capabilitiesSum;
  } catch (error) {
    console.error('Error checking summarizer capabilities:', error);
    return null;
  }
}

export async function initializeSummarizer() {
  const capabilitiesSum = await checkSummarizerCapabilities();
  if (!capabilitiesSum) {
    console.error('Failed to initialize summarizer.');
    return null;
  }

  let summarizer;

  if (capabilitiesSum.available === 'readily') {
    summarizer = await self.ai.summarizer.create();
  } else if (capabilitiesSum.available === 'after-download') {
    summarizer = await self.ai.summarizer.create({
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloading model... ${Math.round((e.loaded / e.total) * 100)}% complete`);
        });
      },
    });

    await summarizer.ready;
  }

  return summarizer;
}

export function isSummarizerSupported() {
  return 'ai' in self && 'summarizer' in self.ai;
}

export async function summarizeText(text) {
  try {
    if (!isSummarizerSupported()) {
      console.error('Summarizer API is not supported.');
      return null;
    }

    const summarizer = await self.ai.initializeSummarizer();
    await summarizer.ready;



    if (!summarizer) {
      console.error('Failed to initialize summarizer.');
      return null;
    }

    console.log('Summarizing text:', text);

    const summary = await summarizer.summarize(text);
    console.log('Generated Summary:', summary);

    if (!summary || summary.trim() === '') {
      console.warn('Empty or invalid summary generated.');
      return null;
    }

    return summary;
  } catch (error) {
    console.error('Error during summarization:', error);
    alert('An error occurred while generating the summary. Please check the console for more details.');

  }
}



//Translator API

// export function isTranslatorSupported() {
//   return 'ai' in self && 'translator' in self.ai;
// }


// async function checkTranslatorCapabilities(sourceLanguage, targetLanguage) {
//   if (!isTranslatorSupported()) {
//     console.error('Translator API is not supported.');
//     return null;
//   }

//   try {
//     const capabilities = await self.ai.translator.capabilities();
//     console.log('Translator Capabilities:', capabilities);

//     const availability = capabilities.languagePairAvailable(sourceLanguage, targetLanguage);
//     if (availability === 'no') {
//       console.error(`Translation from ${sourceLanguage} to ${targetLanguage} is not supported.`);
//       return null;
//     }

//     return availability;
//   } catch (error) {
//     console.error('Error checking translator capabilities:', error);
//     return null;
//   }
// }

// export async function initializeTranslator(sourceLanguage, targetLanguage) {
//   const availability = await checkTranslatorCapabilities(sourceLanguage, targetLanguage);
//   if (!availability) {
//     console.error('Failed to initialize translator.');
//     return null;
//   }

//   let translator;

//   if (availability === 'readily') {
//     // The language pack is already available.
//     translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
//   } else if (availability === 'after-download') {
//     // The language pack needs to be downloaded.
//     translator = await self.ai.translator.create({
//       sourceLanguage,
//       targetLanguage,
//       monitor(m) {
//         m.addEventListener('downloadprogress', (e) => {
//           console.log(`Downloading model... ${Math.round((e.loaded / e.total) * 100)}% complete`);
//         });
//       },
//     });

//     // Wait for the model to be ready.
//     await translator.ready;
//   }

//   return translator;
// }



// export async function translateText(text, sourceLanguage, targetLanguage) {
//   try {
//     if (!isTranslatorSupported()) {
//       console.error('Translator API is not supported.');
//       return null;
//     }

//     const translator = await initializeTranslator(sourceLanguage, targetLanguage);
//     if (!translator) {
//       console.error('Failed to initialize translator.');
//       return null;
//     }

//     const result = await translator.translate(text);
//     console.log('Translation Result:', result); // Log the full response

//     return result.translatedContent; // Return the translated content
//   } catch (error) {
//     console.error('Error during translation:', error);
//     return null;
//   }

// }



export function isTranslatorSupported() {
  return 'ai' in self && 'translator' in self.ai;
}

async function checkTranslatorCapabilities(sourceLanguage, targetLanguage) {
  if (!isTranslatorSupported()) {
    console.error('Translator API is not supported.');
    return null;
  }

  try {
    const capabilities = await self.ai.translator.capabilities();
    console.log('Translator Capabilities:', capabilities);

    const availability = capabilities.languagePairAvailable(sourceLanguage, targetLanguage);
    if (availability === 'no') {
      console.error(`Translation from ${sourceLanguage} to ${targetLanguage} is not supported.`);
      return null;
    }

    return availability;
  } catch (error) {
    console.error('Error checking translator capabilities:', error.message);
    return null;
  }
}

export async function initializeTranslator(sourceLanguage, targetLanguage) {
  const availability = await checkTranslatorCapabilities(sourceLanguage, targetLanguage);
  if (!availability) {
    console.error('Failed to initialize translator.');
    return null;
  }

  let translator;

  if (availability === 'readily') {
    // The language pack is already available.
    translator = await self.ai.translator.create({ sourceLanguage, targetLanguage });
  } else if (availability === 'after-download') {
    // The language pack needs to be downloaded.
    translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloading model... ${Math.round((e.loaded / e.total) * 100)}% complete`);
        });
      },
    });

    // Wait for the model to be ready.
    await translator.ready;
  }

  return translator;
}

export async function translateText(text, sourceLanguage, targetLanguage) {
  try {
    if (!isTranslatorSupported()) {
      console.error('Translator API is not supported.');
      return null;
;
    }

    console.log('Initializing translator for:', { sourceLanguage, targetLanguage });

    const translator = await initializeTranslator(sourceLanguage, targetLanguage);
    if (!translator) {
      console.error('Failed to initialize translator.');
      return null;
;
    }

    const result = await translator.translate(text);
    console.log('Translation Result:', result);

    if (!result || !result.translatedContent || result.translatedContent.trim() === '') {
      return null;
;
    }

    return result.translatedContent;
  } catch (error) {
    console.error('Error during translation:', error.message);
    return null;
;
  }
}

// async function translateTextFallback(text, targetLanguage) {
//   try {
//     const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
//     if (!apiKey) {
//       console.error('Google Translate API key is missing.');
//       return null;
//     }

//     console.warn('Using Google Translate API as fallback.');

//     const response = await axios.get('https://translation.googleapis.com/language/translate/v2', {
//       params: {
//         q: text,
//         target: targetLanguage,
//         key: apiKey,
//       },
//     });

//     const translatedText = response.data.data.translations[0]?.translatedText || '';
//     console.log('Google Translate Result:', translatedText);

//     return translatedText;
//   } catch (error) {
//     console.error('Error during fallback translation:', error.message);
//     return null;
//   }
// }
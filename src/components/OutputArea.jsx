import React from 'react';
import PropTypes from 'prop-types';

function OutputArea({ outputText, language, summary, translatedText }) {

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Output Text */}
      <p>{outputText}</p>

      {/* Detected Language */}
      {language && <p>Detected Language: {language}</p>}

      {/* Summary */}
      {summary && <p>Summary: {summary}</p>}

      {/* Translation */}
       {/* <p className='text-red-700'><strong>Translated Text:</strong> {translatedText || 'No translation available.'}</p> */}

      {translatedText ? (
        <p>Translated Text: {translatedText}</p>
        ) : (
        <p>No translation available.</p>
        )}
    </div>
  );
}

OutputArea.propTypes = {
  outputText: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  summary: PropTypes.string,
  translatedText: PropTypes.string,
};

export default OutputArea;
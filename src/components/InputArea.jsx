import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InputArea({ onSend }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

 
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  
  const handleSend = () => {
    if (inputText.trim() !== '') {
      onSend(inputText); 
      setInputText(''); 
    }
  };


  const handleSubmit = () => {
    if (!inputText.trim()) return;

    onSend(inputText);

    setInputText('');
  };

  return (
    <div className="p-4 border-t border-gray-200 flex mb-8">
      <textarea
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type or paste your text here..."
        className="w-11/12 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
      />
      
      <button
        onClick={handleSubmit}
        className="ml-2 mt-8 bg-purple-500 hover:bg-purple-600 mb-10 text-white px-3 py-2 rounded transition duration-300"
        title="Send"
        disabled={inputText.trim() === ''}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.488 12c0 2.465-4.823 4.478-11.488 4.478a59.783 59.783 0 01-8.211-8.212z"
          />
        </svg>
      </button>
      
    </div>
  );
}

InputArea.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default InputArea;
'use client';

import React, { useState } from 'react';

export default function TextArea() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleEncrypt = () => {
    // Implement encryption logic here
    setOutputText(inputText); // Placeholder
  };

  return (
    <div className="p-4">
      <textarea
        className="text-area"
        placeholder="Enter text to encrypt/decrypt"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleEncrypt}
      >
        Encrypt/Decrypt
      </button>
      <textarea
        className="text-area"
        placeholder="Output will appear here"
        value={outputText}
        readOnly
      />
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { caesarCipher, vigenereCipher} from './utils/ciphers'


type Cipher = {
  name: string;
  key?: string; // Add any necessary parameters for each cipher
};

type TextAreaProps = {
  ciphers: Cipher[];
};

export default function TextArea({ ciphers }: TextAreaProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleEncrypt = () => {
    let result = inputText;

    ciphers.forEach((cipher) => {
      switch (cipher.name) {
        case 'Caesar Cipher':
          result = caesarCipher(result, 3, true); // Shift of 3 for encryption
          break;
        case 'Vigenère Cipher':
          result = vigenereCipher(result, 'key', true); // Use a key for encryption
          break;
        // Add cases for other ciphers here
        default:
          break;
      }
    });

    setOutputText(result);
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
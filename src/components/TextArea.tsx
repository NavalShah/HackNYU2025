'use client';

import React, { useState } from 'react';
import {
  caesarCipher,
  vigenereCipher,
  xorCipher,
  base64Encode,
  base64Decode,
  blowfish,
  tripleDES,
  aes,
} from './utils/ciphers';

type Cipher = {
  name: string;
  key?: string;
  defaultValue?: any;
  strength: string;
};

type TextAreaProps = {
  ciphers: Cipher[];
};

export default function TextArea({ ciphers }: TextAreaProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt'); // Add mode state

  // Real-time encryption/decryption logic
  React.useEffect(() => {
    let result = inputText;

    ciphers.forEach((cipher) => {
      switch (cipher.name) {
        case 'Caesar Cipher':
          result = caesarCipher(result, cipher.defaultValue || 3, mode === 'encrypt');
          break;
        case 'Vigenère Cipher':
          result = vigenereCipher(result, cipher.defaultValue || 'key', mode === 'encrypt');
          break;
        case 'XOR Cipher':
          result = xorCipher(result, cipher.defaultValue || 'secret', mode === 'encrypt');
          break;
        case 'Base64 Encoding':
          result = mode === 'encrypt' ? base64Encode(result) : base64Decode(result);
          break;
        case 'Base64 Decoding':
          result = mode === 'encrypt' ? base64Decode(result) : base64Encode(result);
          break;
        case 'Blowfish':
          result = blowfish(result, cipher.defaultValue || 'secret', mode === 'encrypt');
          break;
        case 'TripleDES':
          result = tripleDES(result, cipher.defaultValue || 'secret', mode === 'encrypt');
          break;
        case 'AES':
          result = aes(result, cipher.defaultValue || 'secret', mode === 'encrypt');
          break;
        default:
          break;
      }
    });

    setOutputText(result);
  }, [inputText, ciphers, mode]); // Re-run when inputText, ciphers, or mode changes

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="p-4">
      <textarea
        className="text-area"
        placeholder="Enter text to encrypt/decrypt"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === 'encrypt' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setMode('encrypt')}
        >
          Encrypt
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'decrypt' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setMode('decrypt')}
        >
          Decrypt
        </button>

        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleDownload}
          disabled={!outputText} // Disable if no output
        >
          Download
        </button>

      </div>
      <textarea
        className="text-area"
        placeholder="Output will appear here"
        value={outputText}
        readOnly
      />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleDownload}
        disabled={!outputText}
      >
        Download
      </button>
    </div>
  );
}
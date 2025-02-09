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

  const handleEncrypt = () => {
    let result = inputText;

    ciphers.forEach((cipher) => {
      switch (cipher.name) {
        case 'Caesar Cipher':
          result = caesarCipher(result, cipher.defaultValue || 3, true);
          break;
        case 'Vigenère Cipher':
          result = vigenereCipher(result, cipher.defaultValue || 'key', true);
          break;
        case 'XOR Cipher':
          result = xorCipher(result, cipher.defaultValue || 'secret', true);
          break;
        case 'Base64 Encoding':
          result = base64Encode(result);
          break;
        case 'Base64 Decoding':
          result = base64Decode(result);
          break
        case 'Blowfish':
          result = blowfish(result, cipher.defaultValue || 'secret', true);
          break;
        case 'TripleDES':
          result = tripleDES(result, cipher.defaultValue || 'secret', true);
          break;
        case 'AES':
          result = aes(result, cipher.defaultValue || 'secret', true);
          break;
        default:
          break;
      }
    });

    setOutputText(result);
  };

  const handleDecrypt = () => {
    let result = inputText;

    ciphers.reverse().forEach((cipher) => {
      switch (cipher.name) {
        case 'Caesar Cipher':
          result = caesarCipher(result, cipher.defaultValue || 3, false);
          break;
        case 'Vigenère Cipher':
          result = vigenereCipher(result, cipher.defaultValue || 'key', false);
          break;
        case 'XOR Cipher':
          result = xorCipher(result, cipher.defaultValue || 'secret', false);
          break;
        case 'Base64 Encoding':
          result = base64Decode(result);
          break;
        case 'Base64 Decoding':
          result = base64Encode(result);
          break;
        case 'Blowfish':
          result = blowfish(result, cipher.defaultValue || 'secret', false);
          break;
        case 'TripleDES':
          result = tripleDES(result, cipher.defaultValue || 'secret', false);
          break;
        case 'AES':
          result = aes(result, cipher.defaultValue || 'secret', false);
          break;
        default:
          break;
      }
    });

    setOutputText(result);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encrypted_output.txt';
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
      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleDecrypt}
        >
          Decrypt
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleDownload}
          disabled={!outputText}
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
    </div>
  );
}
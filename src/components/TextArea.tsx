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
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copyText, setCopyText] = useState('Copy to Clipboard');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setInputText(e.target.result as string);
      }
    };
    reader.readAsText(file);
  };

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
  }, [inputText, ciphers, mode]);

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy to Clipboard'), 2000);
    });
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
        <div className="flex px-4 py-4 rounded bg-gray-400">
          <button
            className={`px-4 py-2 ${mode === 'encrypt' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('encrypt')}
          >
            Encrypt
          </button>
          <button
            className={`px-4 py-2 ${mode === 'decrypt' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('decrypt')}
          >
            Decrypt
          </button>
        </div>

        <div className="relative group flex items-center">
          <button
            className={`text-white px-4 py-2 h-full rounded ${outputText ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={handleDownload}
            disabled={!outputText}
          >
            Download
          </button>
        </div>

        <div className="relative group flex items-center">
          <button
            className={`text-white px-4 py-2 h-full rounded ${outputText ? 'bg-green-500' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={handleCopy}
            disabled={!outputText}
          >
            {copyText}
          </button>
        </div>

        <div className="relative group flex items-center">
  <input
    type="file"
    accept=".txt"
    onChange={handleFileUpload}
    className="hidden"
    id="file-upload"
  />
  <label
    htmlFor="file-upload"
    className="text-white px-4 py-2 h-full rounded bg-blue-500 cursor-pointer flex items-center justify-center"
  >
    Upload File
  </label>
</div>
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
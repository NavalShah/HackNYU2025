'use client';

import React from 'react';
import DraggableComponent from './DraggableComponent';

// Define the list of ciphers with their parameters and strength levels
const CIPHERS = [
  { name: 'Caesar Cipher', key: 'shift', defaultValue: 3, strength: 'Low' },
  { name: 'Vigenère Cipher', key: 'key', defaultValue: 'key', strength: 'Medium' },
  { name: 'XOR Cipher', key: 'key', defaultValue: 'secret', strength: 'High' },
  { name: 'Base64 Encoding', key: null, defaultValue: null, strength: 'Low' },
  { name: 'Base64 Decoding', key: null, defaultValue: null, strength: 'Low' },
//   { name: 'Morse Code', key: null, defaultValue: null, strength: 'Low' },
  { name: 'Blowfish', key: 'key', defaultValue: 'secret', strength: 'High' },
  { name: 'TripleDES', key: 'key', defaultValue: 'secret', strength: 'High' },
  { name: 'AES', key: 'key', defaultValue: 'secret', strength: 'High' },
];

export default function Sidebar({ onDrop }: { onDrop: (cipher: { name: string; key?: string; defaultValue?: any; strength: string, rawStrength: number }) => void }) {
  return (
    <div className="sidebar">
      <h2 className="text-lg font-bold mb-4">Ciphers</h2>
      {CIPHERS.map((cipher, index) => (
        <DraggableComponent
          key={index}
          componentName={cipher.name}
          defaultProps={{ key: cipher.key, defaultValue: cipher.defaultValue, strength: cipher.strength }}
        >
          <div className="p-2 mb-2 bg-white shadow-md rounded cursor-move">
            <div>{cipher.name}</div>
            <div className="text-sm text-gray-600">Strength: {cipher.strength}</div>
          </div>
        </DraggableComponent>
      ))}
    </div>
  );
}
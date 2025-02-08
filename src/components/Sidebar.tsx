'use client';

import React from 'react';
import DraggableComponent from './DraggableComponent';

const CIPHERS = ['Caesar Cipher', 'Vigenère Cipher', 'AES Encryption', 'RSA Encryption'];

export default function Sidebar({ onDrop }: { onDrop: (cipher: string) => void }) {
  return (
    <div className="sidebar">
      <h2 className="text-lg font-bold mb-4">Ciphers</h2>
      {CIPHERS.map((cipher, index) => (
        <DraggableComponent key={index} componentName={cipher} defaultProps={{}}>
          <div className="p-2 mb-2 bg-white shadow-md rounded cursor-move">
            {cipher}
          </div>
        </DraggableComponent>
      ))}
    </div>
  );
}
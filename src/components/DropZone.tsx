'use client';

import React from 'react';

type Cipher = {
  name: string;
  key?: string;
  defaultValue?: any;
  strength: string;
};

type DropZoneProps = {
  ciphers: Cipher[];
  onDrop: (cipher: Cipher) => void;
  onDelete: (index: number) => void;
  onUpdateCipher: (index: number, key: string, value: any) => void;
};

export default function DropZone({ ciphers, onDrop, onDelete, onUpdateCipher }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('widgetData');
    const { name, defaultProps } = JSON.parse(data);
    onDrop({ name, ...defaultProps });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  return (
    <div
      className="drop-zone overflow-y-auto" // Make the drop zone scrollable
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-bold mb-4">Cipher List</h2>
      {ciphers.map((cipher, index) => (
        <div key={index} className="cipher-tile flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium">{cipher.name}</div>
              <div className="text-sm text-gray-600">Strength: {cipher.strength}</div>
            </div>
            {/* Move input fields beside the cipher name */}
            {cipher.name === 'Caesar Cipher' && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Shift:</label>
                <input
                  type="number"
                  defaultValue={cipher.defaultValue || 3}
                  onChange={(e) => onUpdateCipher(index, 'defaultValue', parseInt(e.target.value))}
                  className="p-1 border border-gray-300 rounded w-16"
                />
              </div>
            )}
            {(cipher.name === 'Vigenère Cipher' || cipher.name === 'XOR Cipher' || cipher.name === 'Blowfish' || cipher.name === 'TripleDES' || cipher.name === 'AES') && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Key:</label>
                <input
                  type="text"
                  defaultValue={cipher.defaultValue || 'secret'}
                  onChange={(e) => onUpdateCipher(index, 'defaultValue', e.target.value)}
                  className="p-1 border border-gray-300 rounded w-24"
                />
              </div>
            )}
          </div>
          <button
            className="delete-button"
            onClick={() => onDelete(index)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
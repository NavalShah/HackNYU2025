'use client';

import React, { useState } from 'react';

type Cipher = {
  name: string;
  key?: string;
  defaultValue?: any;
  strength: string;
  rawStrength: number;
};

type DropZoneProps = {
  ciphers: Cipher[];
  onDrop: (cipher: Cipher, index?: number) => void;
  onDelete: (index: number) => void;
  onUpdateCipher: (index: number, key: string, value: any) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
};

export default function DropZone({ ciphers, onDrop, onDelete, onUpdateCipher, onReorder }: DropZoneProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index?: number) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('widgetData');
      
      if (!data) {
        throw new Error('No drag data received');
      }

      const parsedData = JSON.parse(data);
      const { name, defaultProps } = parsedData;

      if (draggingIndex !== null) {
        // Reorder existing tile
        onReorder(draggingIndex, index ?? ciphers.length);
      } else {
        // Add new tile
        onDrop({ name, ...defaultProps }, index);
      }

      setError(null);
    } catch (err) {
      console.error('Drop handling error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process dropped item');
    }
    
    setDraggingIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    // Set the drag data for the existing cipher
    const dragData = {
      name: ciphers[index].name,
      defaultProps: {
        strength: ciphers[index].strength,
        defaultValue: ciphers[index].defaultValue,
        key: ciphers[index].key
      }
    };
    
    e.dataTransfer.setData('widgetData', JSON.stringify(dragData));
    setDraggingIndex(index);
  };

  return (
    <div
      className="drop-zone overflow-y-auto"
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-bold mb-4">Cipher List</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {ciphers.map((cipher, index) => (
        <div
          key={index}
          className="cipher-tile flex items-center justify-between"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium">{cipher.name}</div>
              <div className="text-sm text-gray-600">Strength: {cipher.strength}</div>
            </div>
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
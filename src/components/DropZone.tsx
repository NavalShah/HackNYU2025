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
  onDelete: (index: number) => void; // Add onDelete prop
};

export default function DropZone({ ciphers, onDrop, onDelete }: DropZoneProps) {
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
      className="drop-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-bold mb-4">Drop Zone</h2>
      {ciphers.map((cipher, index) => (
        <div key={index} className="cipher-tile">
          <div>
            <div>{cipher.name}</div>
            <div className="text-sm text-gray-600">Strength: {cipher.strength}</div>
          </div>
          <button
            className="delete-button"
            onClick={() => onDelete(index)} // Call onDelete when clicked
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
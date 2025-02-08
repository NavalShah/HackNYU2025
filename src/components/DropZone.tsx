'use client';

import React from 'react';

type DropZoneProps = {
  ciphers: string[];
  onDrop: (cipher: string) => void;
};

export default function DropZone({ ciphers, onDrop }: DropZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('widgetData');
    const { name } = JSON.parse(data);
    onDrop(name);
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
        <div key={index} className="p-2 mb-2 bg-white shadow-md rounded">
          {cipher}
        </div>
      ))}
    </div>
  );
}
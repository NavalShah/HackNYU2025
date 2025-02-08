'use client';

import React from 'react';

export default function DropZone({ ciphers }: { ciphers: string[] }) {
  return (
    <div className="drop-zone">
      <h2 className="text-lg font-bold mb-4">Drop Zone</h2>
      {ciphers.map((cipher, index) => (
        <div key={index} className="p-2 mb-2 bg-white shadow-md rounded">
          {cipher}
        </div>
      ))}
    </div>
  );
}
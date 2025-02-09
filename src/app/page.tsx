'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DropZone from '../components/DropZone';
import TextArea from '../components/TextArea';

type Cipher = {
  name: string;
  key?: string;
  defaultValue?: any;
  strength: string;
};

export default function Home() {
  const [ciphers, setCiphers] = useState<Cipher[]>([]);

  const handleDrop = (cipher: Cipher, index?: number) => {
    if (index !== undefined) {
      // Insert at a specific index
      const newCiphers = [...ciphers];
      newCiphers.splice(index, 0, cipher);
      setCiphers(newCiphers);
    } else {
      // Add to the end
      setCiphers([...ciphers, cipher]);
    }
  };

  const handleDelete = (index: number) => {
    const newCiphers = ciphers.filter((_, i) => i !== index);
    setCiphers(newCiphers);
  };

  const handleUpdateCipher = (index: number, key: string, value: any) => {
    const updatedCiphers = [...ciphers];
    updatedCiphers[index] = { ...updatedCiphers[index], [key]: value };
    setCiphers(updatedCiphers);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newCiphers = [...ciphers];
    const [movedCipher] = newCiphers.splice(fromIndex, 1); // Remove from old position
    newCiphers.splice(toIndex, 0, movedCipher); // Insert at new position
    setCiphers(newCiphers);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onDrop={handleDrop} />
      <div className="flex flex-col flex-grow overflow-auto">
        <DropZone
          ciphers={ciphers}
          onDrop={handleDrop}
          onDelete={handleDelete}
          onUpdateCipher={handleUpdateCipher}
          onReorder={handleReorder}
        />
        <TextArea ciphers={ciphers} />
      </div>
    </div>
  );
}
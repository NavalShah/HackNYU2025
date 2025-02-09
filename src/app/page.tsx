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
  rawStrength: number;
};
export default function Home() {
  const [ciphers, setCiphers] = useState<Cipher[]>([]);
  
  const handleDrop = (cipher: Cipher) => {
    setCiphers([...ciphers, cipher]);
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

  const [hasClicked, setClicked] = useState(false);

  return (
    hasClicked ? 
      <div className="flex h-screen">
        <Sidebar onDrop={handleDrop} />
        <div className="flex flex-col flex-grow overflow-auto">
          <DropZone
            ciphers={ciphers}
            onDrop={handleDrop}
            onDelete={handleDelete}
            onUpdateCipher={handleUpdateCipher}
          />
          <TextArea ciphers={ciphers} />
        </div>
      </div>
    : 
      <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5dc]">
        <img src="/logoX.png" alt="HackCrypt Logo"/>
        <button 
          className="px-6 py-3 text-lg font-bold text-white bg-gray-800 border-2 border-gray-900 rounded-md shadow-md hover:bg-gray-700" 
          style={{ fontFamily: 'Pixel, sans-serif' }}
          onClick={() => setClicked(true)}
        >
          Enter App
        </button>
      </div>
  );
}
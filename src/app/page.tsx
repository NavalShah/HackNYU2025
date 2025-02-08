'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DropZone from '../components/DropZone';
import TextArea from '../components/TextArea';

export default function Home() {
  const [ciphers, setCiphers] = useState<string[]>([]);

  const handleDrop = (cipher: string) => {
    setCiphers([...ciphers, cipher]);
  };

  return (
    <div className="flex">
      <Sidebar onDrop={handleDrop} />
      <div className="flex flex-col flex-grow">
        <DropZone ciphers={ciphers} onDrop={handleDrop} />
        <TextArea ciphers={ciphers.map((name) => ({ name }))} />
      </div>
    </div>
  );
}
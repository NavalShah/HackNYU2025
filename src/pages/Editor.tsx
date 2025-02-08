'use client';

import React, { useState } from 'react';
import Elementor from '../components/editor/Elementor';
import { cn } from '../libs/utils';
import EditComponent from '../components/editor/EditComponent';
import MainContainer from '../components/editor/MainContainer';

type Props = {};

export enum LAYOUT {
  GRID,
  FLEX,
}

function Editor({}: Props) {
  const [layout, setLayout] = useState<LAYOUT>(LAYOUT.FLEX);
  const [structure, setStructure] = useState();

  return (
    <main className="flex h-screen w-full gap-4">
      <Elementor className="w-1/5" />
      <MainContainer
        setStructure={setStructure}
        className={cn(
          layout === LAYOUT.FLEX ? 'flex h-full flex-col w-full' : 'grid'
        )}
      />
      <EditComponent className="w-1/5" />
    </main>
  );
}

export default Editor;

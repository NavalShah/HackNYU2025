'use client';

import React, { HTMLProps, useState } from 'react';
import { cn } from '../../libs/utils';
import Container from '../shared/Container';

type Props = {
  className?: HTMLProps<HTMLElement>['className'];
  setStructure?: React.Dispatch<React.SetStateAction<undefined>>;
};

function MainContainer({ className, setStructure }: Props) {
  const [components, setComponents] = useState<React.FC[]>();

  return (
    <Container
      setComponents={setComponents}
      className={cn(className, 'transition-all')}
    >
      {components?.map((Component, i) => (
        <Component key={i} />
      ))}
    </Container>
  );
}

export default MainContainer;

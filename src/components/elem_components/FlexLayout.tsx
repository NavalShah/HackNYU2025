'use client';

import React, { HTMLProps, useState } from 'react';
import Container from '../shared/Container';

type Props = {
  className?: HTMLProps<HTMLElement>['className'];
};

function FlexLayout({ className }: Props) {
  const [components, setComponents] = useState<React.FC[]>();

  return (
    <Container setComponents={setComponents}>
      {components && components?.length >= 1 ? (
        components?.map((Component, i) => <Component key={i} />)
      ) : (
        <NothingComponent />
      )}
    </Container>
  );
}

const NothingComponent = () => {
  return (
    <div className="w-full flex-1 h-full border">
      <p>Drop some component to show up</p>
    </div>
  );
};

export const FlexLayoutPlaceholder = () => {
  return (
    <div className="h-10 border rounded-md">
      <p className="text-center pt-2 text-sm">---Flex Layout---</p>
    </div>
  );
};

export default FlexLayout;

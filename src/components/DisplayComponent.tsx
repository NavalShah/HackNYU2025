'use client';

import React from 'react';
import DraggableComponent from './DraggableComponent';
import { COMPONENT_INFO } from '../config';

type Props = {
  name: string;
  componentInfo: COMPONENT_INFO;
  Placeholder?: React.FC | null;
};

function DisplayComponent({ name, componentInfo, Placeholder }: Props) {
  return (
    <div className="border-b pb-4 flex flex-col gap-4">
      <label>{name}</label>
      <DraggableComponent
        componentName={name}
        defaultProps={componentInfo.props}
      >
        {Placeholder ? (
          <Placeholder />
        ) : (
          <componentInfo.Node {...componentInfo.props} />
        )}
      </DraggableComponent>
    </div>
  );
}

export default DisplayComponent;

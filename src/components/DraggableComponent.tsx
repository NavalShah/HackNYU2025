'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  componentName: string;
  defaultProps?: any;
};

export type DragData = {
  name: string;
  defaultProps: any;
};

function DraggableComponent({ children, componentName, defaultProps }: Props) {
  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData(
      'widgetData',
      JSON.stringify({
        name: componentName,
        defaultProps: defaultProps,
      })
    );
  };

  return (
    <div draggable onDragStart={onDragStart}>
      {children}
    </div>
  );
}

export default DraggableComponent;

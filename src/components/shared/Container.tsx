'use client';

import React, { HTMLProps, useRef, useState } from 'react';
import { cn } from '../../libs/utils';
import { COMPONENTS } from '../../config';
import { DragData } from '../DraggableComponent';

type Props = {
  className?: HTMLProps<HTMLElement>['className'];
  children: React.JSX.Element | React.JSX.Element[] | undefined;
  setComponents: React.Dispatch<
    React.SetStateAction<React.FC<{}>[] | undefined>
  >;
};

function Container({ className, children, setComponents }: Props) {
  const mainRef = useRef<HTMLDivElement | null>(null);

  const getComponent = (key: string) => {
    return COMPONENTS.find((component) => component.Name === key);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const data_str = e.dataTransfer.getData('widgetData');
    if (!data_str) return;
    const parsed_data: DragData = JSON.parse(data_str);
    const _componentData = getComponent(parsed_data.name);
    if (!_componentData) return;

    const _component = _componentData.Node;
    (_component as any).defaultProps = _componentData.props;

    setComponents((prev) => {
      const components = [];
      if (prev) {
        components.push(...prev);
      }
      components.push(_component);
      return components;
    });
    removeBorder();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    mainRef.current?.classList.add('border', 'border-blue-500');
  };

  const removeBorder = () => {
    mainRef.current?.classList.remove('border', 'border-blue-500');
  };

  return (
    <div
      ref={mainRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={removeBorder}
      onDragExit={removeBorder}
      className={cn(className, 'transition-all')}
    >
      {children}
    </div>
  );
}

export default Container;

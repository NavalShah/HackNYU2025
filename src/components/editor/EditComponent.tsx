import React, { HTMLProps } from 'react';
import { cn } from '../../libs/utils';

type Props = {
  className?: HTMLProps<HTMLElement>['className'];
};

function EditComponent({ className }: Props) {
  return (
    <div className={cn(className, 'border-l shadow-lg p-5')}>
      <p className="border-b pb-4 font-bold mb-5">Edit Component</p>

      <div className="flex flex-col gap-4"></div>
    </div>
  );
}

export default EditComponent;

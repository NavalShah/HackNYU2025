'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../../libs/utils';

type Props = {
  text?: string;
};

function Button(defaultProps: Props) {
  const [props, setProps] = useState<Props | null>(defaultProps);

  useEffect(() => {
    setProps(defaultProps);
  }, [defaultProps]);

  return (
    <button
      className={cn('border border-gray-300 px-6 py-2 rounded-md shadow-md')}
    >
      {props?.text}
    </button>
  );
}

export default Button;

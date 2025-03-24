'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NumberedCircleProps {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-5 h-5 text-xs',
  md: 'w-7 h-7 text-sm',
  lg: 'w-9 h-9 text-base',
};

export function NumberedCircle({
  number,
  size = 'md',
  className,
}: NumberedCircleProps) {
  return (
    <div
      className={cn(
        'rounded-full bg-slate-800 text-white flex items-center justify-center font-bold',
        sizeClasses[size],
        className
      )}
    >
      {number}
    </div>
  );
}

export default NumberedCircle;

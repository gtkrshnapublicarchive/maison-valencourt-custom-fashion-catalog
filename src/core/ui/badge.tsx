import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'sage' | 'obsidian' | 'outline' | 'amber';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const base = 'inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full tracking-wide';

  const variants = {
    default: 'bg-black/5 text-editorial-text border border-black/5',
    sage: 'bg-sage-100 text-sage-600 border border-sage-200',
    obsidian: 'bg-obsidian text-white',
    outline: 'border border-black/15 text-editorial-text bg-transparent',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

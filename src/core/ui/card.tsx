import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export function Card({ children, bordered = true, className = '', ...props }: CardProps) {
  const borderStyle = bordered ? 'border border-black/[0.08]' : '';

  return (
    <div
      className={`bg-white rounded-2xl ${borderStyle} transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium uppercase tracking-wider text-editorial-muted">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-editorial-text placeholder:text-black/30 transition-colors focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500 disabled:bg-black/5 ${
            error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {hint && !error && <p className="text-xs text-editorial-muted">{hint}</p>}
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

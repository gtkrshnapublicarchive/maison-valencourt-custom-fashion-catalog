'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  align?: 'left' | 'right';
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
  ariaLabel,
  disabled = false,
  align = 'left',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`inline-flex items-center justify-between gap-3 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2 text-xs text-editorial-text transition-all hover:border-black/25 focus:outline-none focus:ring-1 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? 'border-sage-500 ring-1 ring-sage-500 shadow-sm' : ''
        }`}
      >
        <span className="truncate font-medium">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-editorial-muted flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-obsidian' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-1.5 w-max min-w-full rounded-xl border border-black/10 bg-white p-1 shadow-lg z-50 max-h-60 overflow-y-auto`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-sage-100 font-medium text-obsidian'
                    : 'text-editorial-text hover:bg-black/[0.04]'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-sage-700 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

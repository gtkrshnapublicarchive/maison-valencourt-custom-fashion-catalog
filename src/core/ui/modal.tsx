'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-black/10 transition-all max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-black/5 mb-4">
          <div>
            {title && <h3 className="font-editorial text-xl font-medium text-editorial-text">{title}</h3>}
            {description && <p className="text-xs text-editorial-muted mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-editorial-muted hover:bg-black/5 hover:text-editorial-text transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

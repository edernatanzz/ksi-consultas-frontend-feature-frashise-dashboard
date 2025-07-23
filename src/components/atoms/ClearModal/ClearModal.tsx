'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    title?: string;
    Children: React.ReactNode;
    onClose?: () => void;
}

export default function ClearModal({ title, Children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>
          { Children }
      </div>
    </div>
  );
}

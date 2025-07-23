import React from 'react';

interface ViewModeButtonProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
  className?: string; // Permite personalização de classes externas
}

const ViewModeButton: React.FC<ViewModeButtonProps> = ({ text, onClick, isSelected, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-transparent focus:outline-none transition-colors ${className}`}
    >
      <span
        className={`relative text-sm ${
          isSelected ? 'text-primary-500 font-medium' : 'text-gray-700'
        }`}
      >
        {text}
        {isSelected && (
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-500"></span>
        )}
      </span>
    </button>
  );
};

export default ViewModeButton; 
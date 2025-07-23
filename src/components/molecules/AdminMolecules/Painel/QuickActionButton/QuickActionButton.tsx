'use client'
import React from 'react'

interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  title,
  description,
  icon,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-4 rounded-lg shadow-sm ${bgColor} ${textColor} hover:opacity-90 transition-opacity w-full`}
    >
      <span className="material-icons text-2xl mr-4">{icon}</span>
      <div className="text-left">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </button>
  );
};

export default QuickActionButton;
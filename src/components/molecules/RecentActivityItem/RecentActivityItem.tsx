import React from 'react';

interface RecentActivityItemProps {
  icon: React.ReactNode;
  text: string;
  detail: string;
  time: string;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ icon, text, detail, time }) => (
  <div className="flex items-center text-sm text-gray-700">
    <span className="mr-2">{icon}</span>
    <span className="font-medium mr-1">{text}</span>
    <span className="text-gray-500 mr-1">{detail}</span>
    <span className="ml-auto text-xs text-gray-400">{time}</span>
  </div>
);

export default RecentActivityItem; 
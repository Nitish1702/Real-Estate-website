import React from 'react';
import { infoCard } from '@/app/models/page';

const InfoCard: React.FC<infoCard> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md">
      {/* Icon */}
      <div className="flex items-center justify-center bg-blue-100 rounded-full">
        {icon}
      </div>
      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;

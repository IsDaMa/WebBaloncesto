import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'deepGreen' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-4 border-b-4'
  };

  const colorClasses = {
    deepGreen: 'border-deepGreen',
    gold: 'border-gold',
    gray: 'border-gray-400'
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
import React from "react";

const SocialCard = ({ name, icon, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col hover:shadow-lg transition-shadow social-card">
      <div className="flex items-center mb-4">
        <img src={icon} alt={name} className="w-8 h-8 mr-2" />
        <h3 className="text-xl font-bold text-deepGreen">{name}</h3>
      </div>
      {children}
    </div>
  );
};

export default SocialCard;

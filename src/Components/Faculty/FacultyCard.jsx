import React from "react";

const FacultyCard = ({ faculty }) => {
  const { name, role, description, imageUrl } = faculty;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-137.5 object-cover"
      />

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {name}
        </h3>

        <p className="text-lg text-blue-600 font-medium mt-1"> 
          {role}
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FacultyCard;

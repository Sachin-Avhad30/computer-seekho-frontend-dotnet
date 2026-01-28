// import React from "react";

// const FacultyCard = ({ faculty }) => {
//   const { name, role, description, imageUrl } = faculty;

//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      
//       {/* IMAGE */}
//       <img
//         src={imageUrl}
//         alt={name}
//         className="w-full h-137.5 object-cover"
//       />

//       {/* CONTENT */}
//       <div className="p-6">
//         <h3 className="text-2xl font-bold text-gray-800">
//           {name}
//         </h3>

//         <p className="text-lg text-blue-600 font-medium mt-1"> 
//           {role}
//         </p>

//         <p className="text-gray-600 mt-4 leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FacultyCard;

import React from "react";

const FacultyCard = ({ faculty }) => {
  const { name, role, description, imageUrl, email } = faculty;

  // Handle image load errors
  const handleImageError = (e) => {
    e.target.src = "/assets/Faculty/default-avatar.png";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">
      
      {/* IMAGE - Smaller squarish container */}
      <div className="md:w-64 md:h-64 w-full h-64 flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-1">
        <h3 className="text-2xl font-bold text-gray-800">
          {name}
        </h3>

        <p className="text-lg text-blue-600 font-medium mt-1"> 
          {role}
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {description}
        </p>

        {/* Email only */}
        {email && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span>{" "}
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
                {email}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
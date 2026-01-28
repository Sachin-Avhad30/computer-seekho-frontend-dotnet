// import React, { useEffect, useState } from "react";
// import { getFacultyList } from "../Services/facultyService";
// import FacultyCard from "../Components/Faculty/FacultyCard";

// function Faculty() {
//   const [facultyList, setFacultyList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFaculty = async () => {
//       try {
//         const data = await getFacultyList();
//         setFacultyList(data);
//       } catch (error) {
//         console.error("Failed to load faculty", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFaculty();
//   }, []);

//   // if (loading) {
//   //   return (
//   //     <div className="py-20 text-center text-gray-500">
//   //       Loading faculty...
//   //     </div>
//   //   );
//   // }
//   if (loading) {
//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Our Faculty
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Learn from industry experts at Computer Seekho
//           </p>
//         </div>
//         <div className="flex flex-col gap-16">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
//               <div className="w-full h-137.5 bg-gray-300"></div>
//               <div className="p-6">
//                 <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Our Faculty
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Learn from industry experts at Computer Seekho
//           </p>
//         </div>

//         {/* ONE BELOW ANOTHER */}
//         <div className="flex flex-col gap-16">
//           {facultyList.map((faculty) => (
//             <FacultyCard key={faculty.id} faculty={faculty} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Faculty;

import React, { useEffect, useState } from "react";
import { getFacultyList } from "../Services/facultyService";
import FacultyCard from "../Components/Faculty/FacultyCard";

function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await getFacultyList();
        setFacultyList(data);
        setError(null);
      } catch (error) {
        console.error("Failed to load faculty", error);
        setError("Failed to load faculty. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading faculty...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (facultyList.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No faculty members found.
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Faculty
          </h2>
          <p className="text-gray-600 mt-2">
            Learn from industry experts at Computer Seekho
          </p>
        </div>

        {/* ONE BELOW ANOTHER */}
        <div className="flex flex-col gap-16">
          {facultyList.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faculty;

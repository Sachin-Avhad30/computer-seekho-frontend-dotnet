// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CoursesDetails() {
//   const { slug } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/courses")
//       .then((res) => {
//         const selectedCourse = res.data.find(
//           (c) => c.courseName.toLowerCase().replace(/\s+/g, "-") === slug,
//         );
//         setCourse(selectedCourse);
//       })
//       .catch((err) => console.error(err));
//   }, [slug]);

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-lg font-medium text-gray-600">
//           Loading course details...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12">
//       {/* MAIN CARD */}
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-10 py-14">
//         {/* TITLE */}
//         <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-6">
//           {course.courseName}
//         </h1>

//         {/* DESCRIPTION */}
//         <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12">
//           <span className="font-semibold text-blue-900">
//             {course.courseName}
//           </span>{" "}
//           focuses on data engineering, analytics, and machine learning,
//           equipping learners with industry-ready skills.
//         </p>

//         {/* INFO GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
//           {/* Duration */}
//           <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
//             <span className="font-semibold text-gray-700">Duration</span>
//             <span className="text-blue-900 font-bold">
//               {course.courseDuration} Months
//             </span>
//           </div>

//           {/* Fees */}
//           <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
//             <span className="font-semibold text-gray-700">Fees</span>
//             <span className="text-blue-900 font-bold">
//               ₹ {course.courseFees}
//             </span>
//           </div>

//           {/* Age Group */}
//           <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
//             <span className="font-semibold text-gray-700">Age Group</span>
//             <span className="text-gray-800 font-medium">
//               {course.ageGrpType || "—"}
//             </span>
//           </div>

//           {/* Status */}
//           <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
//             <span className="font-semibold text-gray-700">Status</span>
//             <span
//               className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
//                 course.courseIsActive
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {course.courseIsActive ? "Active" : "Inactive"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CoursesDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursesDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => {
        const selectedCourse = res.data.find(
          (c) => c.courseName.toLowerCase().replace(/\s+/g, "-") === slug,
        );

        setCourse(selectedCourse || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading course details...
        </p>
      </div>
    );
  }

  // ✅ Course not found state
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-600">Course not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12">
      {/* MAIN CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-10 py-14">
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-6">
          {course.courseName}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12">
          <span className="font-semibold text-blue-900">
            {course.courseName}
          </span>{" "}
          focuses on data engineering, analytics, and machine learning,
          equipping learners with industry-ready skills.
        </p>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Duration */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
            <span className="font-semibold text-gray-700">Duration</span>
            <span className="text-blue-900 font-bold">
              {course.courseDuration} Months
            </span>
          </div>

          {/* Fees */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
            <span className="font-semibold text-gray-700">Fees</span>
            <span className="text-blue-900 font-bold">
              ₹ {course.courseFees}
            </span>
          </div>

          {/* Age Group */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
            <span className="font-semibold text-gray-700">Age Group</span>
            <span className="text-gray-800 font-medium">
              {course.ageGrpType || "—"}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm">
            <span className="font-semibold text-gray-700">Status</span>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                course.courseIsActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {course.courseIsActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesDetails;

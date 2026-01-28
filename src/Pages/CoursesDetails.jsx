// export default CoursesDetails;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaRupeeSign, FaUsers, FaCheckCircle } from "react-icons/fa";

function CoursesDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          Loading course details...
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-600">Course not found</p>
      </div>
    );
  }

  return (
    // ✅ BACKGROUND CHANGED HERE
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-12">
      {/* ✅ CARD STYLE IMPROVED */}
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-14 border border-white/40">
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
            <span className="flex items-center gap-2 font-semibold text-gray-700">
              <FaClock className="text-blue-600" /> Duration
            </span>
            <span className="text-blue-900 font-bold">
              {course.courseDuration} Months
            </span>
          </div>

          {/* Fees */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
            <span className="flex items-center gap-2 font-semibold text-gray-700">
              <FaRupeeSign className="text-green-600" /> Fees
            </span>
            <span className="text-blue-900 font-bold">
              ₹ {course.courseFees}
            </span>
          </div>

          {/* Age Group */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
            <span className="flex items-center gap-2 font-semibold text-gray-700">
              <FaUsers className="text-purple-600" /> Age Group
            </span>
            <span className="text-gray-800 font-medium">
              {course.ageGrpType || "—"}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-6 py-4 shadow-sm border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
            <span className="flex items-center gap-2 font-semibold text-gray-700">
              <FaCheckCircle className="text-yellow-600" /> Status
            </span>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold animate-pulse ${
                course.courseIsActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {course.courseIsActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-12">
          <button className="px-7 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition">
            Download Syllabus
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursesDetails;

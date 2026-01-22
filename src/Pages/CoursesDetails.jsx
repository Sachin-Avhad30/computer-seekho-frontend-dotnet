import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursesDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => {
        const selectedCourse = res.data.find(
          (c) =>
            c.courseName.toLowerCase().replace(/\s+/g, "-") === slug
        );
        setCourse(selectedCourse);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!course) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-blue-900 text-center">
        {course.courseName}
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-4 text-gray-700 text-lg">
        {course.courseDescription}
      </p>

      {/* 🔥 COURSE MODULES HEADING (CENTER)
      <h2 className="text-2xl font-semibold text-center text-blue-900 mt-10">
        Course Modules
      </h2> */}

      {/* SYLLABUS */}
      <div className="mt-6 bg-blue-50 p-6 rounded-lg text-center">
        <p className="font-semibold text-gray-800">
          {course.courseSyllabus}
        </p>
      </div>

      {/* 🔥 DETAILS TABLE */}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-100">Duration</td>
              <td className="p-4">{course.courseDuration} Months</td>
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-100">Fees</td>
              <td className="p-4">₹ {course.courseFees}</td>
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold bg-gray-100">Age Group</td>
              <td className="p-4">{course.ageGrpType}</td>
            </tr>

            <tr>
              <td className="p-4 font-semibold bg-gray-100">Active</td>
              <td className="p-4">
                {course.courseIsActive ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default CoursesDetails;

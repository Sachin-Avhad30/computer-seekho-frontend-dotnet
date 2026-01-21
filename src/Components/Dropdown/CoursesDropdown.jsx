import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursesDropdown() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <li className="relative group list-none">
      {/* COURSES label */}
      <span className="relative cursor-pointer text-blue-900 font-semibold inline-block">
        COURSES
        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red-600"></span>
      </span>

      {/* DROPDOWN */}
      <ul
        className="
          absolute left-0 top-full
          w-64
          bg-white
          shadow-lg
          rounded-md
          hidden group-hover:block
          z-50
        "
      >
        {courses.map((course) => (
          <li key={course.courseId}>
            <NavLink
              to={`/courses/${course.courseName
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="
                block
                px-4 py-3
                text-blue-900
                font-semibold
                hover:bg-blue-50
              "
            >
              {course.courseName}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default CoursesDropdown;

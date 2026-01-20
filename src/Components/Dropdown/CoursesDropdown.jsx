import { NavLink } from "react-router-dom";

function CoursesDropdown() {
  // 🔥 HARD CODED DATA (no useEffect, no async)
  const courses = [
    { id: 1, label: "PGCP-AC", to: "/courses/pgcp-ac" },
    { id: 2, label: "PGCP-BDA", to: "/courses/pgcp-bda" },
    { id: 3, label: "Pre CAT", to: "/courses/pre-cat" },
  ];

  return (
    <li className="relative group list-none">
      {/* COURSES label */}
      <span className="relative cursor-pointer text-blue-900 font-semibold">
        COURSES
        <span className="absolute left-0 -bottom-3 w-full h-[2px] bg-red-600"></span>
      </span>

      {/* DROPDOWN */}
      <ul
        className="
          absolute left-0 top-full mt-4
          w-64
          bg-white
          shadow-lg
          rounded-md
          hidden group-hover:block
          z-50
        "
      >
        {courses.map(course => (
          <li key={course.id}>
            <NavLink
              to={course.to}
              className="
                block
                px-4 py-3
                text-blue-900   /* FORCE COLOR */
                font-semibold
                bg-white
                hover:bg-blue-50
              "
            >
              {course.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default CoursesDropdown;

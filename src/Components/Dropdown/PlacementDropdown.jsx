import { NavLink } from "react-router-dom";

function PlacementDropdown({ label, items }) {
  return (
    <li className="relative group">
      {/* Label */}
      <span className="cursor-pointer hover:text-red-600">{label}</span>

      {/* Dropdown menu */}
      <ul
        className="
          absolute top-full left-1/2 -translate-x-1/2 mt-2
          w-56 bg-white shadow-lg border rounded-md py-2
          hidden group-hover:block
          z-50
        "
      >
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className="block px-4 py-2 text-sm text-gray-700
                         hover:bg-gray-100 hover:text-red-600"
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default PlacementDropdown;

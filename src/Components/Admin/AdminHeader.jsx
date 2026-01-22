// import appLogo3 from "../../assets/CSlogo3.jpg";

// function AdminHeader() {
//   return (
//     <header className="bg-white shadow-sm border-b px-6 py-2 flex items-center justify-between">
//       {/* Left: Logo */}
//       <div className="flex items-center gap-3">
//         <img
//           src={appLogo3}
//           alt="Computer Seekho Logo"
//           className="h-12 object-contain"
//         />
//         <span className="text-lg font-semibold text-gray-700">
//           Computer Seekho
//         </span>
//       </div>

//       {/* Right: Admin Info */}
//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-600">Welcome, Admin</span>
//         <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }

// export default AdminHeader;
import appLogo3 from "../../assets/CSlogo3.jpg";

function AdminHeader() {
  const staffData = JSON.parse(localStorage.getItem("staff"));

  const staffName = staffData?.staffName || "Sachin";

  const firstLetter = staffName.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-2 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <img
          src={appLogo3}
          alt="Computer Seekho Logo"
          className="h-12 object-contain"
        />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-xl font-bold text-gray-700">Computer Seekho</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, {staffName}</span>

        <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
          {firstLetter}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import authService from "../../Services/authService.js";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     staffName: "",
//     staffMobile: "",
//     staffEmail: "",
//     staffUsername: "",
//     staffPassword: "",
//     staffRole: "teaching",
//     staffDesignation: "",
//     staffBio: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const response = await authService.signup(formData);

//       console.log("Signup successful:", response);
//       setSuccess(response.message);

//       setTimeout(() => {
//         navigate("/admin/login");
//       }, 2000);
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError(
//         err.response?.data?.message || "Registration failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 px-4 py-8">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl animate-fadeIn">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Staff Registration
//           </h2>
//           <p className="text-gray-600 text-sm">Join Computer Seekho Team</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
//             <p className="text-sm">{success}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="staffName"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 id="staffName"
//                 name="staffName"
//                 value={formData.staffName}
//                 onChange={handleChange}
//                 placeholder="Enter full name"
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="staffMobile"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Mobile Number *
//               </label>
//               <input
//                 type="tel"
//                 id="staffMobile"
//                 name="staffMobile"
//                 value={formData.staffMobile}
//                 onChange={handleChange}
//                 placeholder="Enter mobile number"
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="staffEmail"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 id="staffEmail"
//                 name="staffEmail"
//                 value={formData.staffEmail}
//                 onChange={handleChange}
//                 placeholder="Enter email address"
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="staffUsername"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Username *
//               </label>
//               <input
//                 type="text"
//                 id="staffUsername"
//                 name="staffUsername"
//                 value={formData.staffUsername}
//                 onChange={handleChange}
//                 placeholder="Choose username"
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="staffPassword"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Password *
//               </label>
//               <input
//                 type="password"
//                 id="staffPassword"
//                 name="staffPassword"
//                 value={formData.staffPassword}
//                 onChange={handleChange}
//                 placeholder="Create password (min 6 chars)"
//                 minLength="6"
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="staffRole"
//                 className="block text-sm font-semibold text-gray-700 mb-2"
//               >
//                 Staff Role *
//               </label>
//               <select
//                 id="staffRole"
//                 name="staffRole"
//                 value={formData.staffRole}
//                 onChange={handleChange}
//                 required
//                 disabled={loading}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//               >
//                 <option value="teaching">Teaching</option>
//                 <option value="non-teaching">Non-Teaching</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="staffDesignation"
//               className="block text-sm font-semibold text-gray-700 mb-2"
//             >
//               Designation
//             </label>
//             <input
//               type="text"
//               id="staffDesignation"
//               name="staffDesignation"
//               value={formData.staffDesignation}
//               onChange={handleChange}
//               placeholder="e.g., Professor, Admin Officer"
//               disabled={loading}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="staffBio"
//               className="block text-sm font-semibold text-gray-700 mb-2"
//             >
//               Bio
//             </label>
//             <textarea
//               id="staffBio"
//               name="staffBio"
//               value={formData.staffBio}
//               onChange={handleChange}
//               placeholder="Brief bio or description"
//               rows="3"
//               disabled={loading}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 resize-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 text-sm mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/admin/login"
//             className="text-purple-600 font-semibold hover:text-purple-700 transition"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FolderOpen, Image as ImageIcon, CheckCircle } from "lucide-react";
import authService from "../../Services/authService.js";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffName: "",
    staffMobile: "",
    staffEmail: "",
    staffUsername: "",
    staffPassword: "",
    staffRole: "teaching",
    staffDesignation: "",
    staffBio: "",
    photoUrl: "", // Photo path will be stored here
  });
  
  // IMAGE STATES 🖼️
  const [staffImage, setStaffImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Image path selection state
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📸 HANDLE IMAGE SELECTION
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image (JPG, JPEG, or PNG)");
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Set image and create preview
      setStaffImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(""); // Clear any previous errors
    }
  };

  // 🗑️ REMOVE IMAGE
  const handleRemoveImage = () => {
    setStaffImage(null);
    setImagePreview(null);
    // Reset file input
    document.getElementById("staffImage").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authService.signup(formData, staffImage);

      console.log("Signup successful:", response);
      setSuccess(response.message);

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-5xl animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Staff Registration
          </h2>
          <p className="text-gray-600 text-sm">Join Computer Seekho Team</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🖼️ IMAGE UPLOAD SECTION */}
          <div className="flex flex-col items-center mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Profile Picture
            </label>
            
            {/* Image Preview */}
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={loading}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition shadow-lg disabled:opacity-50"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-dashed border-gray-400">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}

            {/* File Input */}
            <input
              type="file"
              id="staffImage"
              name="staffImage"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
              disabled={loading}
              className="hidden"
            />
            
            <label
              htmlFor="staffImage"
              className="mt-4 px-6 py-2 bg-purple-100 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-200 transition font-semibold text-sm disabled:opacity-50"
            >
              {imagePreview ? "Change Photo" : "Upload Photo"}
            </label>
            
            <p className="text-xs text-gray-500 mt-2">
              JPG, JPEG, or PNG (Max 5MB)
            </p>
          </div>

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="staffDesignation"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Designation
              </label>
              <input
                type="text"
                id="staffDesignation"
                name="staffDesignation"
                value={formData.staffDesignation}
                onChange={handleChange}
                placeholder="e.g., Professor, Admin Officer"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="staffBio"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Bio
              </label>
              <textarea
                id="staffBio"
                name="staffBio"
                value={formData.staffBio}
                onChange={handleChange}
                placeholder="Brief bio or description"
                rows="3"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 resize-none"
              />
            </div>
          </div>

          {/* Staff Photo Path Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Staff Photo (Optional)
            </h3>
            
            {/* File Browser */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="staff-photo-select"
                disabled={loading}
              />
              <label
                htmlFor="staff-photo-select"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FolderOpen className="w-12 h-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <span className="text-purple-600 font-medium">Click to browse</span> for a photo
                </div>
                <p className="text-xs text-gray-500">Select image to get its path</p>
              </label>
            </div>

            {/* Show selected file info */}
            {selectedFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">File Selected</p>
                    <p className="text-xs text-green-700 mt-1">
                      <strong>Name:</strong> {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-700">
                      <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Manual path input */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Photo Path (Edit if needed)
              </label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handlePhotoPathChange}
                placeholder="/assets/staff/photo.jpg or leave empty"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                This path will be stored in the database
              </p>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">How it works:</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• Select a photo file to get its name</li>
                    <li>• The path will be constructed automatically</li>
                    <li>• Edit the path field if needed</li>
                    <li>• <strong>No file upload</strong> - only path is saved</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-purple-600 font-semibold hover:text-purple-700 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
// src/components/Admin/AddStaff.jsx
import React, { useState } from "react";
import { Upload, X, User, CheckCircle } from "lucide-react";
import authService from "../../Services/authService.js";

function AddStaff() {
  const [formData, setFormData] = useState({
    staffName: "",
    staffMobile: "",
    staffEmail: "",
    staffUsername: "",
    staffPassword: "",
    staffRole: "teaching",
    staffDesignation: "",
    staffBio: "",
  });

  const [staffImage, setStaffImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image (JPG, JPEG, or PNG)");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("Image size should be less than 5MB");
        return;
      }

      setStaffImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setStaffImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("staffImage");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !formData.staffName ||
      !formData.staffMobile ||
      !formData.staffEmail ||
      !formData.staffUsername ||
      !formData.staffPassword
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.staffPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.signup(formData, staffImage);
      setSuccess(response.message || "Staff added successfully!");

      // Reset form
      setFormData({
        staffName: "",
        staffMobile: "",
        staffEmail: "",
        staffUsername: "",
        staffPassword: "",
        staffRole: "teaching",
        staffDesignation: "",
        staffBio: "",
      });
      setStaffImage(null);
      setImagePreview(null);

      // Reset file input
      const fileInput = document.getElementById("staffImage");
      if (fileInput) {
        fileInput.value = "";
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      console.error("Add staff error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data) {
        setError(err.response.data);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to add staff. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Staff</h2>
        <p className="text-gray-500">Add staff members to the system</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <p className="text-sm">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          {imagePreview ? (
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">
                  Profile picture selected
                </p>
                <p className="text-xs text-gray-500">
                  {staffImage?.name || "Image uploaded"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={loading}
                className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="staffImage"
              className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload profile picture
                </p>
                <p className="text-xs text-gray-500">
                  JPG, JPEG, or PNG (Max 5MB)
                </p>
              </div>
            </label>
          )}
          <input
            type="file"
            id="staffImage"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
            disabled={loading}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="staffName"
              value={formData.staffName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="staffMobile"
              value={formData.staffMobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="staffEmail"
              value={formData.staffEmail}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="staffUsername"
              value={formData.staffUsername}
              onChange={handleChange}
              placeholder="Choose username"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="staffPassword"
              value={formData.staffPassword}
              onChange={handleChange}
              placeholder="Create password (min 6 chars)"
              minLength="6"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Staff Role *
            </label>
            <select
              name="staffRole"
              value={formData.staffRole}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
            >
              <option value="teaching">Teaching</option>
              <option value="non-teaching">Non Teaching</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            name="staffDesignation"
            value={formData.staffDesignation}
            onChange={handleChange}
            placeholder="e.g., Professor, Admin Officer"
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="staffBio"
            value={formData.staffBio}
            onChange={handleChange}
            placeholder="Brief bio or description"
            rows="3"
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding Staff...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Add Staff
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddStaff;

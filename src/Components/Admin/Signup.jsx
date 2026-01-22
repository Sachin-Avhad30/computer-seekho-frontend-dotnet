import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authService.signup(formData);

      console.log("Signup successful:", response);
      setSuccess(response.message);

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl animate-fadeIn">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="staffName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="staffName"
                name="staffName"
                value={formData.staffName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="staffMobile"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mobile Number *
              </label>
              <input
                type="tel"
                id="staffMobile"
                name="staffMobile"
                value={formData.staffMobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="staffEmail"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="staffEmail"
                name="staffEmail"
                value={formData.staffEmail}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="staffUsername"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username *
              </label>
              <input
                type="text"
                id="staffUsername"
                name="staffUsername"
                value={formData.staffUsername}
                onChange={handleChange}
                placeholder="Choose username"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="staffPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="staffPassword"
                name="staffPassword"
                value={formData.staffPassword}
                onChange={handleChange}
                placeholder="Create password (min 6 chars)"
                minLength="6"
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="staffRole"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Staff Role *
              </label>
              <select
                id="staffRole"
                name="staffRole"
                value={formData.staffRole}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
              >
                <option value="teaching">Teaching</option>
                <option value="non-teaching">Non-Teaching</option>
              </select>
            </div>
          </div>

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

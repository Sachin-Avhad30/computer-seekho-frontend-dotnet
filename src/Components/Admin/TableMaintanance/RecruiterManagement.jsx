import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, Trash2, Upload, X } from "lucide-react";
import Pagination from "./Pagination";

const API_BASE = "https://localhost:7018"; // Update with your API URL

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    recruiterName: "",
    status: true, // Changed from isActive to status
  });

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/recruiters`);
      setRecruiters(response.data);
    } catch (error) {
      console.error("Error fetching recruiters:", error);
      alert("Failed to fetch recruiters");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object
      const submitData = new FormData();
      submitData.append("recruiterName", formData.recruiterName);
      submitData.append("status", formData.status);

      // Only append logo if a new file is selected
      if (imageFile) {
        submitData.append("logo", imageFile);
      }

      if (editingId) {
        await axios.put(`${API_BASE}/api/recruiters/${editingId}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${API_BASE}/api/recruiters`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchRecruiters();
      closeModal();
      alert(
        editingId
          ? "Recruiter updated successfully"
          : "Recruiter created successfully",
      );
    } catch (error) {
      console.error("Error saving recruiter:", error);
      alert("Failed to save recruiter");
    }
  };

  const handleEdit = (recruiter) => {
    setEditingId(recruiter.recruiterId);
    setFormData({
      recruiterName: recruiter.recruiterName,
      status: recruiter.status, // Changed from isActive to status
    });

    // Set preview from existing logo (using logoUrl from API response)
    if (recruiter.logoUrl) {
      setImagePreview(`${API_BASE}${recruiter.logoUrl}`);
    }

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      try {
        await axios.delete(`${API_BASE}/api/recruiters/${id}`);
        fetchRecruiters();
        alert("Recruiter deleted successfully");
      } catch (error) {
        console.error("Error deleting recruiter:", error);
        alert("Failed to delete recruiter");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setFormData({
      recruiterName: "",
      status: true, // Changed from isActive to status
    });
  };

  // Filter recruiters based on search term
  const filteredRecruiters = recruiters.filter((recruiter) =>
    recruiter.recruiterName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecruiters = filteredRecruiters.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Recruiter Management
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Recruiter
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recruiters..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recruiter Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecruiters.length > 0 ? (
              currentRecruiters.map((recruiter) => (
                <tr key={recruiter.recruiterId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recruiter.recruiterId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recruiter.logoUrl ? (
                      <img
                        src={`${API_BASE}${recruiter.logoUrl}`}
                        alt={recruiter.recruiterName}
                        className="h-12 w-12 object-contain rounded"
                        onError={(e) => {
                          console.error(
                            "Failed to load image:",
                            `${API_BASE}${recruiter.logoUrl}`,
                          );
                          e.target.src =
                            "https://via.placeholder.com/50?text=Logo";
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Logo</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {recruiter.recruiterName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        recruiter.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recruiter.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(recruiter)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(recruiter.recruiterId)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No recruiters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRecruiters.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={filteredRecruiters.length}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? "Edit Recruiter" : "Add Recruiter"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recruiter Name *
                </label>
                <input
                  type="text"
                  value={formData.recruiterName}
                  onChange={(e) =>
                    setFormData({ ...formData, recruiterName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo {!editingId && "*"}
                </label>

                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-32 object-contain border-2 border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required={!editingId}
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload logo
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked })
                    }
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Active
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default RecruiterManagement;

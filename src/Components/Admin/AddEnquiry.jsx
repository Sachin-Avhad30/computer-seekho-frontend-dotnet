import { useEffect, useState } from "react";
import axios from "axios";

function AddEnquiry() {
  const [courses, setCourses] = useState([]); // ✅ course list from API

  const [formData, setFormData] = useState({
    enquirerName: "",
    studentName: "",
    enquirerAddress: "",
    enquirerMobile: "",
    enquirerAlternateMobile: "",
    enquirerEmailId: "",
    enquirerQuery: "",
    enquirySource: "",
    courseId: "",
    followupDate: "",
    specialInstructions: "",
  });

  // ✅ Fetch active courses from backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const staffData = JSON.parse(localStorage.getItem("staff"));
        const token = staffData?.token;

        const response = await axios.get(
          "http://localhost:8080/api/courses/active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const staffData = JSON.parse(localStorage.getItem("staff"));

    const payload = {
      ...formData,
      staffId: staffData?.staffId, // ✅ dynamic staffId
    };

    console.log("Submitting Enquiry:", payload);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add / Update Enquiry</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Enquirer Name */}
        <div>
          <label className="block font-medium mb-1">Enquirer Name</label>
          <input
            type="text"
            name="enquirerName"
            value={formData.enquirerName}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>

        {/* Student Name */}
        <div>
          <label className="block font-medium mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            type="number"
            name="enquirerMobile"
            value={formData.enquirerMobile}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>

        {/* Alternate Mobile */}
        <div>
          <label className="block font-medium mb-1">Alternate Mobile</label>
          <input
            type="number"
            name="enquirerAlternateMobile"
            value={formData.enquirerAlternateMobile}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="enquirerEmailId"
            value={formData.enquirerEmailId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Enquiry Source */}
        <div>
          <label className="block font-medium mb-1">Enquiry Source</label>
          <select
            name="enquirySource"
            value={formData.enquirySource}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">Select Source</option>
            <option value="Telephonic">Telephonic</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Email">Email</option>
            <option value="Online">Online</option>
            <option value="Fax">Fax</option>
          </select>
        </div>

        {/* ✅ Course Dropdown (Dynamic API Binding) */}
        <div>
          <label className="block font-medium mb-1">Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Follow-up Date */}
        <div>
          <label className="block font-medium mb-1">Follow-up Date</label>
          <input
            type="date"
            name="followupDate"
            value={formData.followupDate}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="enquirerAddress"
            value={formData.enquirerAddress}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            rows="2"
          />
        </div>

        {/* Enquiry Query */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Enquiry Query</label>
          <textarea
            name="enquirerQuery"
            value={formData.enquirerQuery}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            rows="3"
          />
        </div>

        {/* Special Instructions */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            rows="2"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 hover:bg-green-800"
          >
            Save Enquiry
          </button>

          <button
            type="reset"
            className="border px-6 py-2"
            onClick={() =>
              setFormData({
                enquirerName: "",
                studentName: "",
                enquirerAddress: "",
                enquirerMobile: "",
                enquirerAlternateMobile: "",
                enquirerEmailId: "",
                enquirerQuery: "",
                enquirySource: "",
                courseId: "",
                followupDate: "",
                specialInstructions: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEnquiry;

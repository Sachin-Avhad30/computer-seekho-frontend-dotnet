import { useState } from "react";

function StudentRegistration() {
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "",
    dob: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    courseId: "",
    batchId: "",
    registrationDate: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registration Payload:", formData);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Registration</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Student Name */}
        <div>
          <label className="block font-medium mb-1">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-medium mb-1">Mobile Number</label>
          <input
            type="number"
            name="mobile"
            value={formData.mobile}
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
            name="alternateMobile"
            value={formData.alternateMobile}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            rows="2"
          />
        </div>

        {/* City */}
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* State */}        <div>
          <label className="block font-medium mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block font-medium mb-1">Pincode</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Course */}
        <div>
          <label className="block font-medium mb-1">Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">Select Course</option>
            <option value="1">PG DAC</option>
            <option value="2">PG DBDA</option>
            <option value="3">JAVA</option>
          </select>
        </div>

        {/* Batch */}
        <div>
          <label className="block font-medium mb-1">Batch</label>
          <select
            name="batchId"
            value={formData.batchId}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="">Select Batch</option>
            <option value="1">Aug 2025</option>
            <option value="2">Jan 2026</option>
          </select>
        </div>

        {/* Registration Date */}
        <div>
          <label className="block font-medium mb-1">Registration Date</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-700 text-white px-8 py-2 hover:bg-green-800"
          >
            Register Student
          </button>

          <button
            type="reset"
            className="border px-8 py-2"
            onClick={() =>
              setFormData({
                studentName: "",
                gender: "",
                dob: "",
                mobile: "",
                alternateMobile: "",
                email: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                courseId: "",
                batchId: "",
                registrationDate: "",
                status: "ACTIVE",
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

export default StudentRegistration;

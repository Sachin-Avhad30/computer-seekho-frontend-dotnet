import React, { useState, useEffect } from 'react';
import { X, Upload, User } from 'lucide-react';
import { getAllCourses } from '../../../Services/enquiryService';
import { getBatchesByCourse } from '../../../Services/studentService';
import PaymentModal from '../Payment/PaymentModal';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7018/api';

const RegisterStudentModal = ({ enquiryId, onClose, onSuccess }) => {
  const [enquiry, setEnquiry] = useState(null);
  const [loadingEnquiry, setLoadingEnquiry] = useState(true);
  
  const [formData, setFormData] = useState({
    studentName: '',
    studentMobile: '',
    studentEmail: '',
    studentGender: '',
    studentDob: '',
    studentAddress: '',
    studentQualification: '',
    courseId: '',
    batchId: '',
    studentPassword: '',
    photo: null,
    enquiryId: enquiryId // ✅ Include enquiry ID
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ✅ Fetch enquiry details on mount
  useEffect(() => {
    fetchEnquiryDetails();
    fetchCourses();
  }, [enquiryId]);

  useEffect(() => {
    if (formData.courseId) {
      fetchBatches(formData.courseId);
    } else {
      setBatches([]);
      setSelectedBatch(null);
    }
  }, [formData.courseId]);

  // ✅ NEW: Fetch enquiry details
  const fetchEnquiryDetails = async () => {
    setLoadingEnquiry(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/enquiries/${enquiryId}`);
      const enquiryData = response.data;
      setEnquiry(enquiryData);

      // ✅ Auto-populate form from enquiry
      setFormData(prev => ({
        ...prev,
        studentName: enquiryData.enquirerName || '',
        studentMobile: enquiryData.enquirerMobile?.toString() || '',
        studentEmail: enquiryData.enquirerEmailId || '',
        studentAddress: enquiryData.enquirerAddress || '',
        courseId: enquiryData.courseId?.toString() || '',
        enquiryId: enquiryId
      }));
    } catch (error) {
      console.error('Error fetching enquiry:', error);
      alert('Error loading enquiry details');
    } finally {
      setLoadingEnquiry(false);
    }
  };

  const fetchCourses = async () => {
    setLoadingCourses(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Error loading courses. Please refresh the page.');
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchBatches = async (courseId) => {
    setLoadingBatches(true);
    setBatches([]);
    setFormData(prev => ({ ...prev, batchId: '' }));
    setSelectedBatch(null);
    
    try {
      const data = await getBatchesByCourse(courseId);
      console.log('Fetched batches:', data);
      setBatches(data);
    } catch (error) {
      console.error('Error fetching batches:', error);
      alert('Error loading batches for this course.');
    } finally {
      setLoadingBatches(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBatchChange = (batchId) => {
    const batch = batches.find(b => b.batchId === parseInt(batchId));
    setSelectedBatch(batch);
    setFormData({ ...formData, batchId });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, PNG, GIF, WEBP)');
        e.target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        e.target.value = '';
        return;
      }

      setFormData({ ...formData, photo: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo: null });
    setPhotoPreview(null);
  };

  const validateForm = () => {
    const required = [
      { field: 'studentName', label: 'Student Name' },
      { field: 'studentMobile', label: 'Mobile Number' },
      { field: 'studentEmail', label: 'Email' },
      { field: 'studentGender', label: 'Gender' },
      { field: 'courseId', label: 'Course' },
      { field: 'batchId', label: 'Batch' },
      { field: 'studentPassword', label: 'Password' }
    ];

    for (const { field, label } of required) {
      if (!formData[field]) {
        alert(`Please fill in ${label}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.studentEmail)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Mobile validation
    if (formData.studentMobile.length !== 10) {
      alert('Mobile number must be 10 digits');
      return false;
    }

    return true;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) return;
    
    if (!selectedBatch || !selectedBatch.courseFees) {
      alert('Please select a batch with valid course fees');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    onSuccess();
    onClose();
  };

  if (loadingEnquiry) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading enquiry details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-purple-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Register Student</h2>
            <button onClick={onClose} className="hover:bg-purple-700 p-1 rounded">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {/* Enquiry Info Banner */}
            {enquiry && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Converting Enquiry</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Enquiry ID:</span> #{enquiry.enquiryId}</div>
                  <div><span className="font-medium">Source:</span> {enquiry.enquirySource}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              {/* LEFT COLUMN: Student Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg border-b pb-2">Student Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => handleChange('studentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.studentMobile}
                    onChange={(e) => handleChange('studentMobile', e.target.value)}
                    maxLength="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address * (Used for login)
                  </label>
                  <input
                    type="email"
                    value={formData.studentEmail}
                    onChange={(e) => handleChange('studentEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.studentPassword}
                    onChange={(e) => handleChange('studentPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Create password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={formData.studentGender}
                    onChange={(e) => handleChange('studentGender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.studentDob}
                    onChange={(e) => handleChange('studentDob', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.studentQualification}
                    onChange={(e) => handleChange('studentQualification', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., B.Tech, BCA, 12th Pass"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.studentAddress}
                    onChange={(e) => handleChange('studentAddress', e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Full address"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Course, Batch & Photo */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg border-b pb-2">Course & Batch</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course * (Pre-filled from enquiry, editable)
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => handleChange('courseId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    disabled={loadingCourses}
                  >
                    <option value="">
                      {loadingCourses ? 'Loading courses...' : 'Select a course'}
                    </option>
                    {courses.map(course => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch *
                  </label>
                  <select
                    value={formData.batchId}
                    onChange={(e) => handleBatchChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    disabled={!formData.courseId || loadingBatches}
                  >
                    <option value="">
                      {loadingBatches 
                        ? 'Loading batches...' 
                        : formData.courseId 
                          ? 'Select a batch' 
                          : 'Select course first'}
                    </option>
                    {batches.map(batch => (
                      <option key={batch.batchId} value={batch.batchId}>
                        {batch.batchName} 
                        {batch.courseFees && ` - ₹${batch.courseFees}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Fees Display */}
                {selectedBatch && selectedBatch.courseFees && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Course Fees</div>
                    <div className="text-3xl font-bold text-green-700">
                      ₹{selectedBatch.courseFees.toLocaleString('en-IN')}
                    </div>
                    {selectedBatch.batchStartDate && (
                      <div className="text-sm text-gray-600 mt-2">
                        Starts: {new Date(selectedBatch.batchStartDate).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>
                )}

                {/* Photo Upload Section */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-4">Student Photo (Optional)</h3>
                  
                  {!photoPreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload student photo
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG, GIF, WEBP (max 5MB)
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Student Preview"
                        className="w-full h-64 object-cover rounded-lg border-2 border-purple-300"
                      />
                      <button
                        onClick={handleRemovePhoto}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                      >
                        <X size={20} />
                      </button>
                      <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                        <User size={16} />
                        <span>{formData.photo?.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToPayment}
                disabled={loading || !selectedBatch}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          studentData={formData}
          selectedBatch={selectedBatch}
          selectedCourse={courses.find(c => c.courseId === parseInt(formData.courseId))}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default RegisterStudentModal;
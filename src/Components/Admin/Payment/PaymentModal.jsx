import React, { useState } from 'react';
import { X, CreditCard, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7018/api';

const PAYMENT_TYPES = [
  { id: 1, name: 'Cash' },
  { id: 2, name: 'Cheque' },
  { id: 3, name: 'Demand Draft (DD)' },
  { id: 4, name: 'Bank Transfer (NEFT/RTGS)' },
  { id: 5, name: 'UPI' },
  { id: 6, name: 'Credit Card' },
  { id: 7, name: 'Debit Card' },
  { id: 8, name: 'Net Banking' }
];

const PaymentModal = ({ studentData, selectedBatch, selectedCourse, onClose, onSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    paymentAmount: '',
    paymentTypeId: '',
    transactionReference: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const courseFees = selectedBatch?.courseFees || 0;
  const minimumPayment = 1000;

  const handleChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
    setError(null);
  };

  const validatePayment = () => {
    if (!paymentData.paymentAmount) {
      setError('Please enter payment amount');
      return false;
    }

    const amount = parseFloat(paymentData.paymentAmount);
    if (isNaN(amount) || amount < minimumPayment) {
      setError(`Minimum payment amount is ₹${minimumPayment}`);
      return false;
    }

    if (amount > courseFees) {
      setError(`Payment amount cannot exceed course fees (₹${courseFees})`);
      return false;
    }

    if (!paymentData.paymentTypeId) {
      setError('Please select payment type');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validatePayment()) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create FormData for student registration
      const formData = new FormData();
      formData.append('StudentName', studentData.studentName);
      formData.append('StudentMobile', studentData.studentMobile);
      formData.append('StudentUsername', studentData.studentEmail); // Email IS username
      formData.append('StudentPassword', studentData.studentPassword);
      formData.append('StudentGender', studentData.studentGender);
      formData.append('StudentAddress', studentData.studentAddress || '');
      formData.append('StudentQualification', studentData.studentQualification || '');
      formData.append('CourseId', studentData.courseId);
      formData.append('BatchId', studentData.batchId);
      
      // ✅ Include enquiry ID if present
      if (studentData.enquiryId) {
        formData.append('EnquiryId', studentData.enquiryId);
      }
      
      if (studentData.studentDob) {
        formData.append('StudentDob', studentData.studentDob);
      }
      
      if (studentData.photo) {
        formData.append('Photo', studentData.photo);
      }

      // Register student
      console.log('Registering student...');
      const studentResponse = await axios.post(
        `${API_BASE_URL}/students`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Student registered:', studentResponse.data);

      // Step 2: Get the student ID (fetch all students and find the latest one)
      const studentsResponse = await axios.get(`${API_BASE_URL}/students`);
      const students = studentsResponse.data;
      const newStudent = students.find(s => 
        s.studentUsername === studentData.studentEmail
      );

      if (!newStudent) {
        throw new Error('Student registered but ID not found');
      }

      console.log('Found student ID:', newStudent.studentId);

      // Step 3: Create payment
      const paymentPayload = {
        studentId: newStudent.studentId,
        batchId: parseInt(studentData.batchId),
        paymentTypeId: parseInt(paymentData.paymentTypeId),
        paymentAmount: parseFloat(paymentData.paymentAmount),
        transactionReference: paymentData.transactionReference || null,
        remarks: paymentData.remarks || `Initial payment for ${selectedCourse?.courseName || 'course'}`
      };

      console.log('Creating payment:', paymentPayload);
      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payments`,
        paymentPayload
      );

      console.log('Payment created:', paymentResponse.data);

      // Step 4: Generate receipt and send email
      const paymentId = paymentResponse.data.paymentId;
      
      console.log('Generating receipt for payment:', paymentId);
      const receiptResponse = await axios.post(
        `${API_BASE_URL}/payments/${paymentId}/receipt`
      );

      console.log('Receipt generated:', receiptResponse.data);

      // Step 5: Send receipt email
      const receiptId = receiptResponse.data.receiptId;
      
      console.log('Sending receipt email:', receiptId);
      await axios.get(
        `${API_BASE_URL}/payments/receipt/${receiptId}/email`
      );

      alert(`✅ Success! 
      
Student registered successfully!
Payment of ₹${paymentData.paymentAmount} recorded.
Receipt generated and sent to ${studentData.studentEmail}

Student ID: ${newStudent.studentId}
Receipt ID: ${receiptId}`);

      onSuccess();
    } catch (error) {
      console.error('Error during registration/payment:', error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Failed to process registration and payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CreditCard size={24} />
            <h2 className="text-xl font-bold">Initial Payment</h2>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-green-800 p-1 rounded"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Student & Course Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Registration Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Student:</span>
                <div className="text-gray-900 font-semibold">{studentData.studentName}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <div className="text-gray-900">{studentData.studentEmail}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Course:</span>
                <div className="text-gray-900">{selectedCourse?.courseName || 'N/A'}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Batch:</span>
                <div className="text-gray-900">{selectedBatch?.batchName || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Course Fees Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Course Fees</div>
                <div className="text-3xl font-bold text-green-700">
                  ₹{courseFees.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Minimum Payment</div>
                <div className="text-2xl font-semibold text-orange-600">
                  ₹{minimumPayment.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-600 bg-white/50 rounded p-2">
              💡 You can pay in installments. Minimum ₹1,000 per installment.
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount * (Min: ₹{minimumPayment}, Max: ₹{courseFees})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  value={paymentData.paymentAmount}
                  onChange={(e) => handleChange('paymentAmount', e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                  placeholder={`Enter amount (min ₹${minimumPayment})`}
                  min={minimumPayment}
                  max={courseFees}
                  step="100"
                  disabled={loading}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Remaining balance will be collected in future installments
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type *
              </label>
              <select
                value={paymentData.paymentTypeId}
                onChange={(e) => handleChange('paymentTypeId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                disabled={loading}
              >
                <option value="">Select payment method</option>
                {PAYMENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Reference (Optional)
              </label>
              <input
                type="text"
                value={paymentData.transactionReference}
                onChange={(e) => handleChange('transactionReference', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Cheque No., Transaction ID, etc."
                maxLength="100"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks (Optional)
              </label>
              <textarea
                value={paymentData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Any additional notes..."
                maxLength="500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Student account will be created</li>
              <li>✅ Payment will be recorded</li>
              <li>✅ Receipt will be generated with payment history</li>
              <li>✅ Receipt PDF will be sent to {studentData.studentEmail}</li>
              {studentData.enquiryId && <li>✅ Enquiry will be marked as converted</li>}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition font-bold text-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing...
                </span>
              ) : (
                `Pay ₹${paymentData.paymentAmount || '0'} & Register`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
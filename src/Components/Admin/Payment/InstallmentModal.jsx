import React, { useState, useEffect } from "react";
import { X, CreditCard, AlertCircle, History, DollarSign } from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5087/api";

const PAYMENT_TYPES = [
  { id: 1, name: "Cash" },
  { id: 2, name: "Cheque" },
  { id: 3, name: "Demand Draft (DD)" },
  { id: 4, name: "Bank Transfer (NEFT/RTGS)" },
  { id: 5, name: "UPI" },
  { id: 6, name: "Credit Card" },
  { id: 7, name: "Debit Card" },
  { id: 8, name: "Net Banking" },
];

const InstallmentModal = ({ student, onClose, onSuccess }) => {
  const [installmentData, setInstallmentData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentAmount: "",
    paymentTypeId: "",
    transactionReference: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const minimumPayment = 1000;

  useEffect(() => {
    fetchInstallmentCalculation();
  }, []);

  const fetchInstallmentCalculation = async () => {
    setFetching(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payments/installment-calculation`,
        {
          params: {
            studentId: student.studentId,
            batchId: student.batchId,
          },
        },
      );
      setInstallmentData(response.data);
    } catch (error) {
      console.error("Error fetching installment calculation:", error);
      setError("Failed to load payment details. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
    setError(null);
  };

  const validatePayment = () => {
    if (!installmentData) {
      setError("Payment details not loaded");
      return false;
    }

    if (!paymentData.paymentAmount) {
      setError("Please enter payment amount");
      return false;
    }

    const amount = parseFloat(paymentData.paymentAmount);
    if (isNaN(amount) || amount < minimumPayment) {
      setError(`Minimum payment amount is ₹${minimumPayment}`);
      return false;
    }

    if (amount > installmentData.remainingBalance) {
      setError(
        `Payment amount cannot exceed remaining balance (₹${installmentData.remainingBalance})`,
      );
      return false;
    }

    if (!paymentData.paymentTypeId) {
      setError("Please select payment type");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validatePayment()) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create payment
      const paymentPayload = {
        studentId: student.studentId,
        batchId: student.batchId,
        paymentTypeId: parseInt(paymentData.paymentTypeId),
        paymentAmount: parseFloat(paymentData.paymentAmount),
        transactionReference: paymentData.transactionReference || null,
        remarks:
          paymentData.remarks ||
          `Installment payment #${installmentData.installmentsPaid + 1}`,
      };

      console.log("Creating installment payment:", paymentPayload);
      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payments`,
        paymentPayload,
      );

      console.log("Payment created:", paymentResponse.data);

      // Step 2: Generate receipt
      const paymentId = paymentResponse.data.paymentId;

      console.log("Generating receipt for payment:", paymentId);
      const receiptResponse = await axios.post(
        `${API_BASE_URL}/payments/${paymentId}/receipt`,
      );

      console.log("Receipt generated:", receiptResponse.data);

      // Step 3: Send receipt email
      const receiptId = receiptResponse.data.receiptId;

      console.log("Sending receipt email:", receiptId);
      await axios.get(`${API_BASE_URL}/payments/receipt/${receiptId}/email`);

      const newRemainingBalance =
        installmentData.remainingBalance -
        parseFloat(paymentData.paymentAmount);

      alert(`✅ Payment Successful! 
      
Installment #${installmentData.installmentsPaid + 1} recorded
Amount: ₹${paymentData.paymentAmount}
New Remaining Balance: ₹${newRemainingBalance.toFixed(2)}

Receipt sent to ${student.studentName}'s email

Receipt ID: ${receiptId}`);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error processing installment payment:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to process payment. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[60]">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CreditCard size={24} />
            <h2 className="text-xl font-bold">Accept Installment Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-blue-800 p-1 rounded"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Student Info */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Name:</span>
                <div className="text-gray-900 font-semibold">
                  {student.studentName}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Student ID:</span>
                <div className="text-gray-900">#{student.studentId}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Mobile:</span>
                <div className="text-gray-900">{student.studentMobile}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Batch ID:</span>
                <div className="text-gray-900">#{student.batchId}</div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          {installmentData && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-blue-600" />
                  <div className="text-xs text-gray-600">Total Fees</div>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  ₹{installmentData.totalCourseFees.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-green-600" />
                  <div className="text-xs text-gray-600">Total Paid</div>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  ₹{installmentData.totalPaid.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {installmentData.installmentsPaid} installment(s)
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-orange-600" />
                  <div className="text-xs text-gray-600">Remaining</div>
                </div>
                <div className="text-2xl font-bold text-orange-700">
                  ₹{installmentData.remainingBalance.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          )}

          {/* Payment History */}
          {installmentData && installmentData.previousPayments.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <History size={18} className="text-gray-600" />
                <h3 className="font-semibold text-gray-800">Payment History</h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {installmentData.previousPayments.map((payment, index) => (
                  <div
                    key={payment.paymentId}
                    className="flex justify-between items-center text-sm bg-white p-2 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        #{index + 1}
                      </span>
                      <span className="text-gray-700">
                        {payment.paymentTypeDesc}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500">
                        {new Date(payment.paymentDate).toLocaleDateString(
                          "en-IN",
                        )}
                      </span>
                      <span className="font-semibold text-green-700">
                        ₹{payment.paymentAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle
                className="text-red-600 flex-shrink-0 mt-0.5"
                size={20}
              />
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {/* Payment Form */}
          {installmentData && installmentData.remainingBalance > 0 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Installment Amount * (Min: ₹{minimumPayment}, Max: ₹
                  {installmentData.remainingBalance})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={paymentData.paymentAmount}
                    onChange={(e) =>
                      handleChange("paymentAmount", e.target.value)
                    }
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                    placeholder={`Enter amount (min ₹${minimumPayment})`}
                    min={minimumPayment}
                    max={installmentData.remainingBalance}
                    step="100"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type *
                </label>
                <select
                  value={paymentData.paymentTypeId}
                  onChange={(e) =>
                    handleChange("paymentTypeId", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  <option value="">Select payment method</option>
                  {PAYMENT_TYPES.map((type) => (
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
                  onChange={(e) =>
                    handleChange("transactionReference", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional notes..."
                  maxLength="500"
                  disabled={loading}
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  What happens next?
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✅ Payment will be recorded</li>
                  <li>✅ Receipt will be generated with payment history</li>
                  <li>✅ Receipt PDF will be sent to student's email</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Processing...
                    </span>
                  ) : (
                    `Submit Payment of ₹${paymentData.paymentAmount || "0"}`
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-700 font-bold text-xl mb-2">
                ✅ Fees Fully Paid!
              </div>
              <p className="text-green-600">
                This student has completed all payments for the course.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallmentModal;

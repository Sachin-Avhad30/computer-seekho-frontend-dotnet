import React, { useState, useEffect } from 'react';
import { X, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  studentId, 
  batchId, 
  courseFees,
  onPaymentSuccess,
  isFirstPayment = false 
}) => {
  const [paymentData, setPaymentData] = useState({
    studentId: studentId,
    batchId: batchId,
    paymentTypeId: '',
    paymentAmount: '',
    transactionReference: '',
    remarks: ''
  });

  const [paymentTypes, setPaymentTypes] = useState([]);
  const [installmentData, setInstallmentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchPaymentTypes();
      if (!isFirstPayment) {
        fetchInstallmentCalculation();
      } else {
        // For first payment, set amount to full course fees
        setPaymentData(prev => ({
          ...prev,
          paymentAmount: courseFees || ''
        }));
      }
    }
  }, [isOpen, studentId, batchId, isFirstPayment, courseFees]);

  const fetchPaymentTypes = async () => {
    try {
      const response = await fetch('http://localhost:5164/api/PaymentType');
      const data = await response.json();
      setPaymentTypes(data);
    } catch (error) {
      console.error('Error fetching payment types:', error);
      setError('Failed to load payment types');
    }
  };

  const fetchInstallmentCalculation = async () => {
    try {
      const response = await fetch(
        `http://localhost:5164/api/Payment/installment-calculation?studentId=${studentId}&batchId=${batchId}`
      );
      const data = await response.json();
      setInstallmentData(data);
      
      // Auto-fill remaining balance
      setPaymentData(prev => ({
        ...prev,
        paymentAmount: data.remainingBalance
      }));
    } catch (error) {
      console.error('Error fetching installment calculation:', error);
      setError('Failed to load payment history');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (parseFloat(paymentData.paymentAmount) < 1000) {
      setError('Minimum payment amount is ₹1000');
      setLoading(false);
      return;
    }

    if (!isFirstPayment && installmentData && parseFloat(paymentData.paymentAmount) > installmentData.remainingBalance) {
      setError('Payment amount cannot exceed remaining balance');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Process Payment
      const paymentResponse = await fetch('http://localhost:5164/api/Payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          paymentAmount: parseFloat(paymentData.paymentAmount)
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment processing failed');
      }

      const paymentResult = await paymentResponse.json();

      // Step 2: Generate Receipt
      const receiptResponse = await fetch(
        `http://localhost:5164/api/Payment/${paymentResult.paymentId}/receipt`,
        { method: 'POST' }
      );

      if (!receiptResponse.ok) {
        throw new Error('Receipt generation failed');
      }

      const receipt = await receiptResponse.json();

      alert(`✅ Payment Successful!\n\nReceipt ID: ${receipt.receiptId}\nAmount Paid: ₹${receipt.receiptAmount}\nRemaining Balance: ₹${receipt.remainingBalance}`);
      
      onPaymentSuccess(receipt);
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      setError(error.message || 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center sticky top-0">
          <div className="flex items-center gap-3">
            <CreditCard size={28} />
            <div>
              <h2 className="text-2xl font-bold">
                {isFirstPayment ? 'Registration Payment' : 'Make Payment'}
              </h2>
              <p className="text-sm text-purple-100">
                {isFirstPayment ? 'Complete payment to activate registration' : 'Pay installment'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Payment History (only for subsequent payments) */}
          {!isFirstPayment && installmentData && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Payment Summary</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Total Course Fees</div>
                  <div className="text-xl font-bold text-gray-800">
                    ₹{installmentData.totalCourseFees.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Paid</div>
                  <div className="text-xl font-bold text-green-600">
                    ₹{installmentData.totalPaid.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Remaining Balance</div>
                  <div className="text-xl font-bold text-red-600">
                    ₹{installmentData.remainingBalance.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Previous Payments */}
              {installmentData.previousPayments.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Previous Payments:</h4>
                  <div className="space-y-2">
                    {installmentData.previousPayments.map((payment, index) => (
                      <div key={payment.paymentId} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                        <div>
                          <span className="font-medium">Payment #{index + 1}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({payment.paymentTypeDesc})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ₹{payment.paymentAmount.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(payment.paymentDate).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* First Payment Info */}
          {isFirstPayment && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">First Payment Required</h3>
                  <p className="text-sm text-yellow-800">
                    Minimum payment of ₹1000 is required to activate your registration. 
                    You can pay the full amount or make partial payments later.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Payment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentTypeId"
                  value={paymentData.paymentTypeId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Payment Type</option>
                  {paymentTypes.map((type) => (
                    <option key={type.paymentTypeId} value={type.paymentTypeId}>
                      {type.paymentTypeDesc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(Min: ₹1000)</span>
                </label>
                <input
                  type="number"
                  name="paymentAmount"
                  value={paymentData.paymentAmount}
                  onChange={handleChange}
                  required
                  min="1000"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Transaction Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Reference (Optional)
              </label>
              <input
                type="text"
                name="transactionReference"
                value={paymentData.transactionReference}
                onChange={handleChange}
                maxLength="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter transaction/reference number"
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks (Optional)
              </label>
              <textarea
                name="remarks"
                value={paymentData.remarks}
                onChange={handleChange}
                maxLength="500"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Add any notes or remarks"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Process Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
import React from 'react';
import { X, FileText, Download, Printer, CheckCircle } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download feature will be implemented');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center sticky top-0 print:hidden">
          <div className="flex items-center gap-3">
            <CheckCircle size={28} />
            <div>
              <h2 className="text-2xl font-bold">Payment Receipt</h2>
              <p className="text-sm text-green-100">Receipt #{receipt.receiptId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-8 space-y-6">
          {/* Institute Header */}
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Computer Seekho</h1>
            <p className="text-gray-600">Payment Receipt</p>
            <div className="mt-2 inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
              PAID
            </div>
          </div>

          {/* Receipt Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">RECEIPT DETAILS</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Receipt Number:</span>
                  <div className="font-semibold text-gray-800">#{receipt.receiptId}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Date:</span>
                  <div className="font-semibold text-gray-800">
                    {formatDate(receipt.receiptDate)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Time:</span>
                  <div className="font-semibold text-gray-800">
                    {formatTime(receipt.receiptDate)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">STUDENT DETAILS</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Name:</span>
                  <div className="font-semibold text-gray-800">{receipt.studentName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Mobile:</span>
                  <div className="font-semibold text-gray-800">{receipt.studentMobile}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Course:</span>
                  <div className="font-semibold text-gray-800">{receipt.courseName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Batch:</span>
                  <div className="font-semibold text-gray-800">{receipt.batchName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Payment */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">CURRENT PAYMENT</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Amount Paid:</span>
                <div className="text-3xl font-bold text-green-600">
                  ₹{receipt.receiptAmount.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Payment Method:</span>
                <div className="text-lg font-semibold text-gray-800">
                  {receipt.paymentTypeDesc}
                </div>
              </div>
              {receipt.transactionReference && (
                <div className="col-span-2">
                  <span className="text-sm text-gray-600">Transaction Reference:</span>
                  <div className="font-mono text-sm text-gray-800 bg-white p-2 rounded border">
                    {receipt.transactionReference}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t border-b py-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">PAYMENT SUMMARY</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Course Fees:</span>
                <span className="font-semibold text-gray-900">
                  ₹{receipt.totalCourseFees.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Paid Till Now:</span>
                <span className="font-semibold text-green-600">
                  ₹{receipt.totalPaidTillNow.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                <span className="font-bold text-gray-800 text-lg">Remaining Balance:</span>
                <span className="font-bold text-red-600 text-xl">
                  ₹{receipt.remainingBalance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          {receipt.allPreviousPayments && receipt.allPreviousPayments.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">PAYMENT HISTORY</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        #
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                        Payment Method
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.allPreviousPayments.map((payment, index) => (
                      <tr key={payment.paymentId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                          {formatDate(payment.paymentDate)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                          {payment.paymentTypeDesc}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-semibold text-green-600">
                          ₹{payment.paymentAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-green-100 font-bold">
                      <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right text-gray-800">
                        TOTAL PAID:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right text-green-700">
                        ₹{receipt.totalPaidTillNow.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-6 border-t">
            <p>Thank you for your payment!</p>
            <p className="mt-1">This is a computer-generated receipt.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-8 py-4 flex gap-3 border-t print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            <Printer size={20} />
            Print Receipt
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Download,
  Send,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { downloadReceipt, sendReceipt } from "../../../Services/receiptService";
import InstallmentModal from "../Payment/InstallmentModal";

import courseService from "../../../Services/courseService";
import batchService from "../../../Services/batchService";

const RegisteredStudentCard = ({ students, onRefresh }) => {
  const [sending, setSending] = useState({});
  const [showInstallmentModal, setShowInstallmentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;
  const [courseNames, setCourseNames] = useState({});
  const [batchNames, setBatchNames] = useState({});

  // Calculate pagination
  const totalPages = Math.ceil((students?.length || 0) / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = students?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    const loadNames = async () => {
      const courseMap = {};
      const batchMap = {};

      for (const student of students || []) {
        if (student.courseId && !courseMap[student.courseId]) {
          courseMap[student.courseId] = await courseService.getCourseNameById(
            student.courseId,
          );
        }

        if (student.batchId && !batchMap[student.batchId]) {
          batchMap[student.batchId] = await batchService.getBatchNameById(
            student.batchId,
          );
        }
      }

      setCourseNames(courseMap);
      setBatchNames(batchMap);
    };

    if (students?.length) loadNames();
  }, [students]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!students || students.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-600">No registered students found</p>
      </div>
    );
  }

  const handleDownloadReceipt = async (student) => {
    if (!student.receiptId) {
      alert("No receipt available for this student");
      return;
    }

    try {
      await downloadReceipt(student.receiptId);
      alert("Receipt download feature will be implemented by your friend");
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Download feature coming soon!");
    }
  };

  const handleSendReceipt = async (student) => {
    if (!student.receiptId) {
      alert("No receipt available for this student");
      return;
    }

    try {
      setSending((prev) => ({ ...prev, [student.studentId]: true }));
      const res = await sendReceipt(student.receiptId);
      alert(res);
    } catch (error) {
      console.error("Error sending receipt:", error);
      alert("Failed to send receipt email!");
    } finally {
      setSending((prev) => ({ ...prev, [student.studentId]: false }));
    }
  };

  const handleAcceptInstallment = (student) => {
    setSelectedStudent(student);
    setShowInstallmentModal(true);
  };

  const handleInstallmentSuccess = () => {
    setShowInstallmentModal(false);
    setSelectedStudent(null);
    if (onRefresh) {
      onRefresh();
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="space-y-4">
      {/* Student Cards */}
      {currentStudents.map((student) => {
        if (!student) {
          console.error("Student object is undefined");
          return null;
        }

        console.log("Student data:", student);
        const isSending = sending[student.studentId] || false;

        return (
          <div
            key={student.studentId}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4 border-l-4 border-purple-500"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 grid grid-cols-6 gap-4">
                {/* Column 1: Student Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={16} className="text-gray-500" />
                    <span className="font-semibold text-gray-800">
                      {student.studentName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Phone size={14} />
                    <span>{student.studentMobile || "N/A"}</span>
                  </div>
                  {/* <div className="text-xs text-gray-500">
                    ID: #{student.studentId || "N/A"}
                  </div> */}
                </div>

                {/* Column 2: Course & Batch */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-blue-600" />
                    <span className="font-medium text-gray-700">
                      {courseNames[student.courseId] || "Loading..."}
                    </span>
                  </div>
                  {/* <div className="text-sm text-gray-600">
                    Batch ID: {student.batchId || "N/A"}
                  </div> */}
                </div>

                {/* Column 3: Payment Info */}

                <div>
                  {/* <div className="flex items-center gap-2 mb-2">
                    <CreditCard size={16} className="text-green-600" />
                    <span className="font-semibold text-green-700">
                      ₹{student.amount || "0"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {student.paymentTypeDesc || "N/A"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(student.paymentDate)}
                  </div> */}

                  <div className="text-sm text-gray-600">
                    {batchNames[student.batchId] || "Loading..."}
                  </div>
                </div>

                {/* Column 4: Receipt Info */}
                {/* <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-purple-600" />
                    <span className="font-medium text-gray-700">
                      Receipt #{student.receiptId || "N/A"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {formatDate(student.receiptDate)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Registered: {formatDate(student.registeredAt)}
                  </div>
                </div> */}

                {/* Column 5: Receipt Actions */}
                <div className="flex items-center justify-end gap-2">
                  {/* <button
                    onClick={() => handleDownloadReceipt(student)}
                    disabled={!student.receiptId}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                    title="Download Receipt"
                  >
                    <Download size={16} />
                    Download
                  </button> */}
                  <button
                    onClick={() => handleSendReceipt(student)}
                    disabled={!student.receiptId || isSending}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 font-medium text-sm shadow-md
                      ${
                        isSending
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    title="Send Receipt via Email"
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Receipt
                      </>
                    )}
                  </button>
                </div>

                {/* Column 6: Installment Action */}
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleAcceptInstallment(student)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition flex items-center gap-2 font-medium text-sm shadow-md"
                    title="Accept Further Installment"
                  >
                    <DollarSign size={16} />
                    Accept Installment
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, students.length)} of{" "}
            {students.length} students
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition
                      ${
                        currentPage === pageNumber
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition
                ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Installment Modal */}
      {showInstallmentModal && selectedStudent && (
        <InstallmentModal
          student={selectedStudent}
          onClose={() => {
            setShowInstallmentModal(false);
            setSelectedStudent(null);
          }}
          onSuccess={handleInstallmentSuccess}
        />
      )}
    </div>
  );
};

export default RegisteredStudentCard;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://localhost:7018";

const RecruiterStudents = () => {
  const { recruiterId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [recruiterId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const studentsRes = await axios.get(
        `${API_BASE}/api/placements/${recruiterId}/placed-students`,
      );
      setStudents(studentsRes.data || []);

      if (studentsRes.data && studentsRes.data.length > 0) {
        setRecruiterInfo({
          name: studentsRes.data[0].comapnyName,
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load placed students");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/recruiters")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Recruiters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Recruiters
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {recruiterInfo?.name || "Placed Students"}
          </h1>
          <p className="text-gray-600">
            {students.length} Student{students.length !== 1 ? "s" : ""} Placed
          </p>
        </div>

        {/* Students Grid - 3 per row */}
        {students.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">
              No placed students for this recruiter yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.studentId}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Student Photo */}
                <div className="h-72 bg-gray-100 overflow-hidden">
                  {student.photoUrl ? (
                    <img
                      src={`${API_BASE}${student.photoUrl}`}
                      alt={student.studentName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=No+Photo";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {student.studentName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Student Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {student.studentName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    ID: {student.studentId}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievement Footer */}
        {students.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations to All!
              </h3>
              <p className="text-gray-600">
                We're proud of every student who secured their dream job at{" "}
                {recruiterInfo?.name || "this company"}. Your hard work and
                dedication have paid off!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add fadeInUp animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RecruiterStudents;

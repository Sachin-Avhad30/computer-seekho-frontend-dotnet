//

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBatchesWithPlacements } from "../Services/PlacementApi";

function Placement() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getBatchesWithPlacements();
      console.log("Batches Response:", response.data);

      setBatches(response.data || []);
    } catch (err) {
      console.error("Error fetching batches:", err);
      setError(err.message || "Failed to load placement batches");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchBatches}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Our Placement Success
          </h1>
          <p className="text-gray-600 text-lg">
            Explore batch-wise placement achievements
          </p>
        </div>

        {/* Batches Grid */}
        {batches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No placements available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {batches.map((batch) => (
              <div
                key={batch.batchId}
                onClick={() => navigate(`/placement/batch/${batch.batchId}`)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Batch Logo */}
                <div className="relative h-56 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                  {batch.batchLogo ? (
                    <img
                      src={`http://localhost:5087${batch.batchLogo}`}
                      alt={batch.batchName}
                      className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        console.error("Failed to load logo:", batch.batchLogo);
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white text-3xl font-bold">
                        {batch.batchName.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Placement Count Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                    <span className="text-blue-600 font-bold text-sm">
                      {batch.placedStudentCount} Placed
                    </span>
                  </div>
                </div>

                {/* Batch Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {batch.batchName}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{batch.placedStudentCount} Students Placed</span>
                  </div>

                  {/* View Button */}
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Placements →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Placement;

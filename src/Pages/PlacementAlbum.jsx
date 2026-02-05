// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPlacementAlbumImages } from "../Services/PlacementApi";

// const PlacementAlbum = () => {
//   const { albumId } = useParams();
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!albumId || isNaN(albumId)) {
//       console.error("Invalid albumId:", albumId);
//       setError("Invalid album ID");
//       setLoading(false);
//       return;
//     }

//     fetchImages();
//   }, [albumId]);

//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await getPlacementAlbumImages(albumId);

//       if (res && res.data) {
//         setImages(res.data);
//       } else {
//         setImages([]);
//       }
//     } catch (err) {
//       console.error("Error fetching images:", err);
//       setError("Failed to load images");
//       setImages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         <div className="text-lg">Loading gallery...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p className="font-bold">Error</p>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   // Helper function to extract and format student name from image path
//   const extractStudentName = (imagePath) => {
//     try {
//       // Extract filename from path: /assets/.../ABHISHEK_GUPTA.jpg -> ABHISHEK_GUPTA.jpg
//       const filename = imagePath.split('/').pop();

//       // Remove file extension and _SMVITA suffix
//       const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|gif)$/i, '');
//       const nameWithoutSuffix = nameWithoutExt.replace(/_SMVITA$/i, '');

//       // Convert ABHISHEK_GUPTA to Abhishek Gupta
//       const formattedName = nameWithoutSuffix
//         .split('_')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//         .join(' ');

//       return formattedName;
//     } catch (error) {
//       console.error("Error extracting name:", error);
//       return "Student";
//     }
//   };

//   return (
//     <div className="p-6">
//      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Placement Gallery</h2>

//       {images.length === 0 ? (
//         <p className="text-gray-500">No images found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {images.map((img) => (
//             <div
//               key={img.imageId}
//               className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
//             >
//               <div className="h-80 overflow-hidden">
//                 <img
//                   src={img.imagePath}
//                   alt={extractStudentName(img.imagePath)}
//                   className="w-full h-full object-cover object-top"
//                   onError={(e) => {
//                     console.error("Failed to load image:", img.imagePath);
//                     e.target.style.display = 'none';
//                   }}
//                 />
//               </div>
//               <div className="p-4 text-center bg-gray-50">
//                 <p className="font-semibold text-base text-gray-800">
//                   {extractStudentName(img.imagePath)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlacementAlbum;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlacedStudentsByBatch } from "../Services/PlacementApi";

const PlacementAlbum = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [batchInfo, setBatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!batchId || isNaN(batchId)) {
      console.error("Invalid batchId:", batchId);
      setError("Invalid batch ID");
      setLoading(false);
      return;
    }

    fetchStudents();
  }, [batchId]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getPlacedStudentsByBatch(batchId);

      if (res && res.data) {
        setStudents(res.data);
        // Set batch info from first student (all students have same batch info)
        if (res.data.length > 0) {
          setBatchInfo({
            batchId: res.data[0].batchId,
            batchName: res.data[0].batchName,
          });
        }
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load student placements");
      setStudents([]);
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
            onClick={() => navigate("/placement")}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Batches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/placement")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
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
            Back to Batches
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              {batchInfo?.batchName || "Batch Placements"}
            </h1>
            <p className="text-gray-600 text-lg">
              {students.length} Student{students.length !== 1 ? "s" : ""} Placed
            </p>
          </div>
        </div>

        {/* Students Grid */}
        {students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No placements found for this batch.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <div
                key={student.studentId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Student Photo */}
                <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
                  {student.photoUrl ? (
                    <img
                      src={`http://localhost:5087${student.photoUrl}`}
                      alt={student.studentName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Failed to load photo:",
                          student.photoUrl,
                        );
                        e.target.src =
                          "https://via.placeholder.com/400x500?text=No+Photo";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {student.studentName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Company Logo Badge */}
                  {student.companyLogo && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                      <img
                        src={student.companyLogo}
                        alt={student.companyName}
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Student Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">
                    {student.studentName}
                  </h3>

                  {/* Company Name */}
                  <div className="flex items-center mb-3 text-blue-600">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-semibold">{student.companyName}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {student.email && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="truncate">{student.email}</span>
                      </div>
                    )}

                    {student.mobile && (
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>{student.mobile}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementAlbum;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE = "https://localhost:7018";

// const MoreRecruiters = () => {
//   const [logos, setLogos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/api/recruiters/active`)
//       .then((response) => {
//         setLogos(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching recruiter images:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p className="text-center">Loading recruiters...</p>;
//   }

//   return (
//     <section className="py-12 text-center">
//       <h2 className="text-2xl font-semibold text-blue-900 mb-8">
//         Major Recruiters
//       </h2>

//       <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
//         {logos.map((item) => (
//           <img
//             key={item.recruiterId}
//             src={`${API_BASE}${item.logoUrl}`}
//             alt="Recruiter"
//             className="h-12  hover:grayscale-0 transition cursor-pointer"
//             onClick={() => navigate(`/recruiters/${item.recruiterId}`)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MoreRecruiters;

//const API_BASE = "https://localhost:7018";

const MoreRecruiters = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/recruiters/active`)
      .then((response) => {
        setLogos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recruiter images:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Major Recruiters
          </h2>
          <p className="text-gray-500">Companies that hire our students</p>
        </div>

        {/* Recruiters Grid - 4 per row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {logos.map((item) => (
            <div
              key={item.recruiterId}
              onClick={() => navigate(`/recruiters/${item.recruiterId}`)}
              className="group cursor-pointer"
            >
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg flex items-center justify-center h-32">
                <img
                  src={`${API_BASE}${item.logoUrl}`}
                  alt={item.recruiterName || "Recruiter"}
                  className="max-h-16 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Logo";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreRecruiters;

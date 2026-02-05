import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = "http://localhost:5087";

const Recruiters = () => {
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
    return <p className="text-center">Loading recruiters...</p>;
  }

  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-semibold text-blue-900 mb-8">
        Major Recruiters
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
        {logos.slice(0, 8).map((item) => (
          <img
            key={item.recruiterId}
            src={`${API_BASE}${item.logoUrl}`} // 🔥 prepend backend URL
            alt="Recruiter"
            className="h-12 hover:grayscale-0 transition"
            onError={(e) => {
              e.target.src = "/assets/Recruiters/default.png";
            }}
          />
        ))}
      </div>

      <button
        onClick={() => navigate("/more-recruiters")}
        className="mt-10 bg-red-600 text-white px-8 py-3 rounded"
      >
        SEE MORE
      </button>
    </section>
  );
};

export default Recruiters;

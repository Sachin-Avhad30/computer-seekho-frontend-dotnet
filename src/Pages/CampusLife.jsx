import { useEffect, useState } from "react";

function CampusLife() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampusLife = async () => {
      try {
        const res = await fetch(
          "https://localhost:7018/api/albums/Campus-Life",
        );

        if (!res.ok) {
          throw new Error("Failed to load campus life");
        }

        const data = await res.json();

        // API already returns flat image list
        setImages(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load campus life images");
      } finally {
        setLoading(false);
      }
    };

    fetchCampusLife();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading campus life...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-600">{error}</p>;
  }

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-[#12355b]">
          Campus Life @ Computer Seekho
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-md"
            >
              <img
                src={encodeURI(img.imagePath)}
                alt="Campus Life"
                className="w-full h-[280px] object-cover"
              />

              <div
                className="absolute bottom-0 left-0 w-full
                bg-gradient-to-t from-red-700/90 via-red-600/60 to-transparent
                px-6 py-5"
              >
                <h3 className="text-white text-lg font-semibold">
                  Campus Life
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampusLife;

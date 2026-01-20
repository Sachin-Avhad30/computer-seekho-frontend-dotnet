import React, { useEffect, useState } from "react";
import { getFacultyList } from "../Services/facultyService";
import FacultyCard from "../Components/Faculty/FacultyCard";

function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await getFacultyList();
        setFacultyList(data);
      } catch (error) {
        console.error("Failed to load faculty", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading faculty...
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Faculty
          </h2>
          <p className="text-gray-600 mt-2">
            Learn from industry experts at Computer Seekho
          </p>
        </div>

        {/* ONE BELOW ANOTHER */}
        <div className="flex flex-col gap-16">
          {facultyList.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faculty;

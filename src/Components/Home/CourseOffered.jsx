import React from "react";
import Courses from "./Courses";

function CourseOffered() {
  return (
    <div className="bg-gray-50 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Courses Offered</h2>

      <div className="flex justify-center gap-10 flex-wrap">
        <Courses
          title="PGCP-AC"
          description="PG Certificate Programme in Advanced Computing (PGCP-AC) grooms engineers and IT professionals for a career in Software Development."
        />
        <Courses
          title="PGCP-BDA"
          description="PG Certificate Programme in Big Data Analytics (PGCP-BDA) enables students to explore the fundamentals of big data analytics."
        />
        <Courses
          title="Pre CAT"
          description="Admission to all PG courses by C-DAC ACTS is through the All-India C-DAC Common Admission Test (C-CAT)."
        />
      </div>
    </div>
  );
}

export default CourseOffered;

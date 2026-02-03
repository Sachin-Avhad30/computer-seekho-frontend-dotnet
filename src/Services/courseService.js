import api from "./api";

const courseService = {
  createCourse: async (courseData, coverPhoto) => {
    const formData = new FormData();

    // Append text fields
    formData.append("courseName", courseData.courseName);
    formData.append("courseDescription", courseData.courseDescription || "");
    formData.append("courseDuration", courseData.courseDuration || "");
    formData.append("courseFees", courseData.courseFees || "");
    formData.append("courseFeesFrom", courseData.courseFeesFrom || "");
    formData.append("courseFeesTo", courseData.courseFeesTo || "");
    formData.append("courseSyllabus", courseData.courseSyllabus || "");
    formData.append("ageGrpType", courseData.ageGrpType || "Adult");
    formData.append("videoId", courseData.videoId || "");
    formData.append("courseIsActive", courseData.courseIsActive);

    // Append image
    if (coverPhoto) {
      formData.append("coverPhoto", coverPhoto);
    }

    const response = await api.post("/Courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateCourse: async (courseId, courseData, coverPhoto) => {
    const formData = new FormData();

    // Append text fields
    formData.append("courseName", courseData.courseName);
    formData.append("courseDescription", courseData.courseDescription || "");
    formData.append("courseDuration", courseData.courseDuration || "");
    formData.append("courseFees", courseData.courseFees || "");
    formData.append("courseFeesFrom", courseData.courseFeesFrom || "");
    formData.append("courseFeesTo", courseData.courseFeesTo || "");
    formData.append("courseSyllabus", courseData.courseSyllabus || "");
    formData.append("ageGrpType", courseData.ageGrpType || "Adult");
    formData.append("videoId", courseData.videoId || "");

    // Append image if provided (new image uploaded)
    if (coverPhoto) {
      formData.append("coverPhoto", coverPhoto);
    }

    const response = await api.put(`/Courses/${courseId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export default courseService;

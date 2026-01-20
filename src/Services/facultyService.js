import { facultyMockData } from "../data/faculty.mock";

//  Later replace this with real API call
export const getFacultyList = async () => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(facultyMockData);
    }, 500);
  });
};

/*
🔁 FUTURE (no UI change needed):

import axios from "axios";

export const getFacultyList = async () => {
  const response = await axios.get("/api/faculty");
  return response.data;
};
*/
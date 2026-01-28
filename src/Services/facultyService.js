import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const BASE_IMAGE_PATH = "C:\\Users\\disha\\client_computer_seekho\\src\\assets";

export const getFacultyList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/staff/faculty`);
    
    // Map backend DTO to frontend format
    return response.data.map(faculty => ({
      id: faculty.staffId,
      name: faculty.staffName,
      role: faculty.staffDesignation || "Faculty Member",
      description: faculty.staffBio || "No bio available",
      // UPDATED: Use the exact path from backend, or default to base path + default avatar
      imageUrl: faculty.photoUrl || `${BASE_IMAGE_PATH}\\default-avatar.png`,
      email: faculty.staffEmail,
      mobile: faculty.staffMobile
    }));
  } catch (error) {
    console.error("Error fetching faculty list:", error);
    throw error;
  }
};

// Optional: Get single staff member by ID
export const getStaffById = async (staffId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/staff/${staffId}`);
    const staff = response.data;
    
    return {
      id: staff.staffId,
      name: staff.staffName,
      role: staff.staffDesignation || "Faculty Member",
      description: staff.staffBio || "No bio available",
      // UPDATED: Use the exact path from backend, or default to base path + default avatar
      imageUrl: staff.photoUrl || `${BASE_IMAGE_PATH}\\default-avatar.png`,
      email: staff.staffEmail,
      mobile: staff.staffMobile
    };
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    throw error;
  }
};
import api from "./api";

const authService = {
  // Login
  login: async (staffUsername, staffPassword) => {
    const response = await api.post("/auth/login", {
      staffUsername,
      staffPassword,
    });

    if (response.data.token) {
      // Store token and staff data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("staff", JSON.stringify(response.data));
    }

    return response.data;
  },

  // Signup
  signup: async (signupData) => {
    const response = await api.post("/auth/signup", signupData);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff");
  },

  // Get current staff
  getCurrentStaff: () => {
    const staffData = localStorage.getItem("staff");
    return staffData ? JSON.parse(staffData) : null;
  },

  // Check if logged in
  isLoggedIn: () => {
    return localStorage.getItem("token") !== null;
  },
};

export default authService;

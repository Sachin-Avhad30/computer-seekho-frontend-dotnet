import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instances
const studentApi = axios.create({
  baseURL: `${API_BASE_URL}/students`,
  headers: { 'Content-Type': 'application/json' }
});

const batchApi = axios.create({
  baseURL: `${API_BASE_URL}/batches`,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Register student from enquiry
 */
export const registerStudent = async (registrationData) => {
  try {
    const response = await studentApi.post('/register', registrationData);
    return response.data;
  } catch (error) {
    console.error('Error registering student:', error);
    throw error;
  }
};

/**
 * Get all batches
 */
export const getAllBatches = async () => {
  try {
    const response = await batchApi.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching batches:', error);
    throw error;
  }
};

/**
 * Get active batches only
 */
export const getActiveBatches = async () => {
  try {
    const response = await batchApi.get('/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching active batches:', error);
    throw error;
  }
};

/**
 * Get batches by course - USE BACKEND ENDPOINT
 */
 export const getBatchesByCourse = async (courseId) => {
    try {
      // Use the dedicated backend endpoint instead of filtering on frontend
      const response = await batchApi.get(`/course/${courseId}`);
      console.log('Batches from backend for courseId:', courseId, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching batches by course:', error);
      throw error;
    }
  };

/**
 * Get all students
 */
export const getAllStudents = async () => {
  try {
    const response = await studentApi.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export default {
  registerStudent,
  getAllBatches,
  getBatchesByCourse,
  getAllStudents
};
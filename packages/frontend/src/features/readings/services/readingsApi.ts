import axios from 'axios';
import { Reading, CreateReadingDto, ReadingQueryParams, ApiResponse } from '@/shared/types/reading.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5011';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Resource not found.');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error(error.message || 'An unexpected error occurred');
  }
);

export const readingsApi = {
  // Get all readings with optional filters
  getReadings: async (params?: ReadingQueryParams): Promise<Reading[]> => {
    const response = await apiClient.get<Reading[]>('/api/readings', { params });
    return response.data;
  },

  // Get latest reading for each device
  getLatestReadings: async (): Promise<Reading[]> => {
    const response = await apiClient.get<Reading[]>('/api/readings/latest');
    return response.data;
  },

  // Create a new reading
  createReading: async (reading: CreateReadingDto): Promise<Reading> => {
    const response = await apiClient.post<Reading>('/api/readings', reading);
    return response.data;
  },

  // Get basic statistics
  getStats: async (): Promise<{ totalReadings: number; deviceCount: number }> => {
    const response = await apiClient.get('/api/readings/stats');
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default readingsApi;

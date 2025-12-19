import axios from 'axios';
import logger from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    const startTime = Date.now();
    config.metadata = { startTime };

    logger.debug('API Request', {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      hasData: !!config.data,
    });

    return config;
  },
  (error) => {
    logger.error('API Request Error', {
      error: error.message,
      config: error.config,
    });
    return Promise.reject(error);
  }
);

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config.metadata?.startTime || 0);

    logger.info('API Response', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      duration: `${duration}ms`,
    });

    return response;
  },
  (error) => {
    const duration = Date.now() - (error.config?.metadata?.startTime || 0);

    logger.error('API Error', {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      errorMessage: error.message,
      responseData: error.response?.data,
      duration: `${duration}ms`,
    });

    return Promise.reject(error);
  }
);

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
  }
}

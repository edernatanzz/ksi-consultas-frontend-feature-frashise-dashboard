import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'Ocorreu um erro na requisição';
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const handleApiError = (error: Error | unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string }; status?: number; statusText?: string } };
    return {
      success: false,
      message: axiosError.response?.data?.message || `Erro ${axiosError.response?.status}: ${axiosError.response?.statusText}`
    };
  } else if (error && typeof error === 'object' && 'request' in error) {
    return {
      success: false,
      message: 'Não foi possível conectar ao servidor. Verifique sua conexão.'
    };
  } else {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ocorreu um erro na requisição'
    };
  }
};
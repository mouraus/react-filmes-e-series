import axios from 'axios';

const apiToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWI2MzQyODkwYWQyNWQ0MTg3OGM1MDQ1ZThkMDcxOCIsInN1YiI6IjYxZTZkZTIzYjdhYmI1MDA0MTAwZWQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESFY_prYdFRx2ODKD0L4wRgyjErz70QqD83cX3GMzp8';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL.toString(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiToken}`,
  },
});

export default axiosInstance;

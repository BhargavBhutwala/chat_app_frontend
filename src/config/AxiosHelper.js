import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/room';

export const httpClient = axios.create({
  baseURL: baseUrl,
});

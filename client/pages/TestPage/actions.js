import axios from 'axios';

export const loadTestData = async () => {
  const response = await axios.get('/api/test');
  return response.data;
};

export const loadTestItem = async (params) => {
  const response = await axios.get(`/api/test/${params.id}`);
  return response.data;
};

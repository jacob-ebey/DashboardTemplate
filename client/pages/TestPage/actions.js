import axios from 'axios';

export const search = async (params) => {
  if (params.query && params.method) {
    const response = await axios.get(`/api/search/${params.method}/${params.query}`);
    return response.data;
  }
  return null;
};

export const loadDetailData = async (params) => {
  const response = await axios.get(`/api/contrib/${params.id}`);
  return response.data;
};

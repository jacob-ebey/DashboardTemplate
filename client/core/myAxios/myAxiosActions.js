import axios from 'axios';

import { axiosConfig } from '~/client/appConfig';

export default {
  get: (url, config) => axios.get(axiosConfig.baseUrl + url, config),
  post: (url, data, config) => axios.post(axiosConfig.baseUrl + url, data, config),
  put: (url, data, config) => axios.put(axiosConfig.baseUrl + url, data, config),
  delete: (url, config) => axios.delete(url, config),
};

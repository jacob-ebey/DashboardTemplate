import axios from 'axios';

import { testActions } from './actionTypes';

export const loadTestData = async () => {
  try {
    const response = await axios.get('/api/test');
    return response.data;
  }
  catch (exception) {
    throw exception;
  }
};

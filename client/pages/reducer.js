import { combineReducers } from 'redux';

import TestPage from './TestPage';

export default combineReducers({
  [TestPage.name]: TestPage.reducer,
});

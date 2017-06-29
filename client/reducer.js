import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { Shell } from './core';
import Page from './pages';

export default combineReducers({
  [Shell.name]: Shell.reducer,
  [Page.name]: Page.reducer,
  form: formReducer,
});

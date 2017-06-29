import { testActions } from './actionTypes';

import { createLoaderModel, forceLoad, handleLoad } from '~/client/core';

const initialState = {
  testPage2Data: createLoaderModel(),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case testActions.handleLoad: {
      return {
        ...state,
        testPage2Data: handleLoad(action),
      };
    }
    case testActions.loadFailed: {
      return {
        ...state,
        testPage2Data: forceLoad(null),
      };
    }
  }

  return state;
}

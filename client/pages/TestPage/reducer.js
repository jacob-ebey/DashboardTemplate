import { testActions } from './actionTypes';

import { createLoaderModel, forceLoad, handleLoad } from '~/client/core';

const initialState = {
  testPage2Data: createLoaderModel(),
  testPage2ItemData: createLoaderModel(),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case testActions.handleLoad: {
      return {
        ...state,
        testPage2Data: handleLoad(action),
      };
    }
    case testActions.handleItemLoad: {
      return {
        ...state,
        testPage2ItemData: handleLoad(action),
      };
    }
  }

  return state;
}

import { testActions } from './actionTypes';

import { createLoaderModel, forceLoad, handleLoad } from '~/client/core';

const initialState = {
  searchResults: createLoaderModel(),
  detailData: createLoaderModel(),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case testActions.handleSearchLoad: {
      return {
        ...state,
        searchResults: handleLoad(action),
      };
    }
    case testActions.handleDetailLoad: {
      return {
        ...state,
        detailData: handleLoad(action),
      };
    }
  }

  return state;
}

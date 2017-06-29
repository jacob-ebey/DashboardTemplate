import * as actionTypes from './actionTypes';

export const drawerActions = {
  setDrawerState: (state) => {
    return {
      type: actionTypes.drawerActions.setDrawerState,
      state,
    };
  }
};

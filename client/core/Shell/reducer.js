import { drawerActions } from './actionTypes';


const initialState = {
  drawerOpen: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case drawerActions.setDrawerState: {
      return {
        ...state,
        drawerOpen: action.state,
      };
    }
  }

  return state;
}

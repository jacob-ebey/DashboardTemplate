import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { shellConfig } from '~/client/appConfig';

import { loggerMiddleware, Shell } from './core';
import reducer from './reducer';
import routes from './routes';

const { appName } = shellConfig;

const history = createHistory();
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    loggerMiddleware, thunk
  )
);

const getRoutes = (routes) => {
  if (!routes || !routes.length) {
    return [];
  }

  const childRoutes = [];
  const newRoutes = routes.map((route) => {
    if (route.childRoutes) {
      childRoutes.push(...route.childRoutes);
    }
    return route;
  });

  return [
    ...newRoutes,
    ...getRoutes(childRoutes),
  ];
};

const flatRoutes = getRoutes(routes);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Fabric>
          <Provider store={store}>
            <Shell.component
              title={appName}
              history={history}
              routes={flatRoutes}
            />
          </Provider>
        </Fabric>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { HashRouter as Router, Route, Link } from 'react-router-dom';

import { AppBar, Drawer, MenuItem } from 'material-ui';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

import * as actions from '../actions';

class Shell extends React.Component {
  onMenuItemClicked = (path) => () => {
    const { history, setDrawerState } = this.props;
    setDrawerState(false);
    history.push(path);
  };

  render = () => {
    const { title, history, routes, drawerOpen, setDrawerState } = this.props;

    const routesWithLabel = routes && routes.filter((route) => route.label);

    return (
      <Router history={history}>
        <div>
          <AppBar
            title={title}
            iconElementLeft={<span />}
          />
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-u-md4 ms-u-lg3">
                <Nav
                  groups={[
                    {
                      links: routesWithLabel && routesWithLabel.map((route) => {
                        return { key: route.path, name: route.label, onClick: this.onMenuItemClicked(route.path) };
                      })
                    }
                  ]}
                />
              </div>
              <div className="ms-Grid-col ms-u-md8 ms-u-lg19">
                {
                  routes && routes.map((route) =>
                    <Route key={route.path} {...route} />
                  )
                }
              </div>
            </div>
          </div>
          <Drawer
            docked={false}
            open={drawerOpen}
            onRequestChange={setDrawerState}
          >
            {
              routesWithLabel && routesWithLabel.map((route) =>
                <MenuItem key={route.label} primaryText={route.label} onTouchTap={this.onMenuItemClicked(route.path)} />
              )
            }
          </Drawer>
        </div>
      </Router>
    );
  }
}

Shell.propTypes = {
  // component props
  title: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  })),

  // mapStateToProps
  drawerOpen: PropTypes.bool.isRequired,
  // mapDispatchToProps
  setDrawerState: PropTypes.func.isRequired,
};

Shell.defaultProps = {
  routes: null,
};

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.shell.drawerOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDrawerState: (state) => dispatch(actions.drawerActions.setDrawerState(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shell);

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { List, ListItem } from 'material-ui/List';

import { Loader } from '~/client/core';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

class TestPage extends React.Component {
  onItemSelected = (id) => () => {
    const { history } = this.props;
    history.push(`/test/${id}`);
  }

  render = () => {
    const { loaderState: { data } } = this.props;

    return (
      <div>
        <h1>Test Page</h1>
        {
          data ?
            <List>
              {
                data.map((item) =>
                  <ListItem key={item.id} primaryText={item.title} onClick={this.onItemSelected(item.id)} />
                )
              }
            </List> :
            <p>No Data</p>
        }
      </div>
    );
  }
}

TestPage.propTypes = {
  loaderState: PropTypes.shape({
    data: PropTypes.array,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

TestPage.defaultProps = {
  loaderState: { data: null },
};

export default Loader({
  selector: (state) => state.pages.testPage.testPage2Data,
  loadAction: actions.loadTestData,
  handleLoad: testActions.handleLoad,
  loadFailed: testActions.loadFailed,
})(TestPage);

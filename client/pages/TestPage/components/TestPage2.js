import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { List, ListItem } from 'material-ui/List';

import { Loader } from '~/client/core';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

class TestPage2 extends React.Component {
  render = () => {
    const { loaderState: { data } } = this.props;

    return (
      <div>
        <h1>Sub Test Page</h1>
        <Link to="/test">Back</Link>
        {
          data ?
          <List>
            {
              data.map((item) =>
                <ListItem key={item.id} primaryText={item.title} />
              )
            }
          </List> :
          <p>No Data</p>
        }
      </div>
    );
  }
}

TestPage2.propTypes = {
  loaderState: PropTypes.shape({
    data: PropTypes.array,
  }),
};

TestPage2.defaultProps = {
  loaderState: { data: null },
};

export default Loader({
  selector: (state) => state.pages.testPage.testPage2Data,
  loadAction: actions.loadTestData,
  handleLoad: testActions.handleLoad,
  loadFailed: testActions.loadFailed,
})(TestPage2);

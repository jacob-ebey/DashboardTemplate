import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Graph from 'react-graph-vis';

import { Loader } from '~/client/core';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

const graphOptions = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: '#000000',
  },
};

const subStyle = {
  fontSize: '60%',
  color: 'gray',
};

class TestPage2 extends React.Component {
  render = () => {
    const { loaderState: { data } } = this.props;
    const { id } = data;

    return (
      <div>
        <h1>Sub Page <span style={subStyle}>{id}</span></h1>
        <Link to="/test">Back</Link>
        <Graph graph={data} options={graphOptions} />
      </div>
    );
  }
}

TestPage2.propTypes = {
  loaderState: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nodes: PropTypes.array,
      edges: PropTypes.array,
    }),
  }),
};

TestPage2.defaultProps = {
  loaderState: { data: null },
};

export default Loader({
  selector: (state) => state.pages.testPage.testPage2ItemData,
  loadAction: actions.loadTestItem,
  handleLoad: testActions.handleItemLoad,
  clearOnBack: true,
})(TestPage2);

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Graph from 'react-graph-vis';

import { Loader } from '~/client/core';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

const graphOptions = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: '#000000',
  },
};

const subStyle = {
  fontSize: '60%',
  color: 'gray',
};

class DetailPage extends React.Component {
  render = () => {
    const { loaderState: { data } } = this.props;
    const { name, total, cycle, origin, notice, source, nodes, edges } = data;

    return (
      <div>
        <h1>{name} <span style={subStyle}>{cycle} Contributions</span></h1>
        <p>{notice}</p>
        <p>Data from <a href={source}>{origin}</a></p>

        <h2>Donations from top contributors: {total}</h2>
        <Graph graph={{ nodes, edges }} options={graphOptions} />
      </div>
    );
  }
}

DetailPage.propTypes = {
  loaderState: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      total: PropTypes.string.isRequired,
      cycle: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired,
      notice: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      nodes: PropTypes.array.isRequired,
      edges: PropTypes.array.isRequired,
    }),
  }),
};

DetailPage.defaultProps = {
  loaderState: { data: null },
};

export default Loader({
  selector: (state) => state.pages.searchPage.detailData,
  loadAction: actions.loadDetailData,
  handleLoad: testActions.handleDetailLoad,
  clearOnBack: true,
})(DetailPage);

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Graph from 'react-graph-vis';

const graph = {
  nodes: [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ],
};

const options = {
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

export default class TestPage2 extends React.Component {
  render = () => {
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        <h1>Sub Page <span style={subStyle}>{id}</span></h1>
        <Link to="/test">Back</Link>
        <Graph graph={graph} options={options} />
      </div>
    );
  }
}

TestPage2.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

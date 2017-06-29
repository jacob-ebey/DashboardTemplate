import React from 'react';

import { Link } from 'react-router-dom';

export default class TestPage extends React.Component {
  render = () => {
    return (
      <div>
        <h1>Test Page</h1>
        <Link to="/test/sub">Child Page</Link>
      </div>
    );
  }
}

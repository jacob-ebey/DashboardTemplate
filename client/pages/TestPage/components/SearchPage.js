import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import NativeListener from 'react-native-listener';

import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { List, ListItem } from 'material-ui/List';

import { Loader } from '~/client/core';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

const validateZip = (value) => {
  if (!/^\d{5}(-\d{4})?$/.test(value)) {
    return 'Not a valid zipcode';
  }
};

class SearchPage extends React.Component {
  state = {
    query: null,
  };

  onItemSelected = (id) => () => {
    const { history } = this.props;
    history.push(`/detail/${id}`);
  }

  onSearchChanged = (newValue) => {
    this.setState({ query: newValue });
  }

  onKeyDown = (e) => {
    const { loadAction, loaderState: { isLoading } } = this.props;

    if (e.key === 'Enter') {
      if (!isLoading) {
        loadAction({ query: this.state.query });
      }
    }
  }

  render = () => {
    const { loaderState: { data } } = this.props;

    // TODO: Use redux-form instead of storing values in state.
    return (
      <div>
        <h1>Search Page</h1>
        <NativeListener onKeyDown={this.onKeyDown}>
          <TextField
            label="ZipCode"
            iconProps={{ iconName: 'Search' }}
            value={this.state.query}
            onChanged={this.onSearchChanged}
            onGetErrorMessage={validateZip}
          />
        </NativeListener>
        {!data && <p>No results</p>}
        {
          data && (
            <List>
              {
                data.map((item) =>
                  <ListItem key={item.id} primaryText={item.name} onClick={this.onItemSelected(item.id)} />
                )
              }
            </List>
          )
        }
      </div>
    );
  }
}

SearchPage.propTypes = {
  // Loader props
  reset: PropTypes.func.isRequired,
  loaderState: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,

  // Router props
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SearchPage.defaultProps = {
  loaderState: { data: null },
};

export default Loader({
  selector: (state) => state.pages.searchPage.searchResults,
  loadAction: actions.search,
  handleLoad: testActions.handleSearchLoad,
})(SearchPage);

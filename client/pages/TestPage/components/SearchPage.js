import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form, Field, reduxForm } from 'redux-form';

import NativeListener from 'react-native-listener';

import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { List, ListItem } from 'material-ui/List';

import { Loader } from '~/client/core';

import { FabricTextField, Validations } from '~/client/redux-forms-fabric';

import * as actions from '../actions';
import { testActions } from '../actionTypes';

class SearchPage extends React.Component {
  onItemSelected = (id) => () => {
    const { history } = this.props;
    history.push(`/detail/${id}`);
  }

  onSubmit = (values) => {
    const { loadAction } = this.props;

    loadAction({ query: values.search });
  }

  render = () => {
    const { handleSubmit, loaderState: { data } } = this.props;

    return (
      <div>
        <h1>Search Page</h1>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="search"
            component={FabricTextField}
            validate={Validations.validateZip}
            props={{
              label: 'ZipCode',
              iconProps: { iconName: 'Search' },
              autoComplete: 'off',
            }}
          />
        </Form>
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

  // reduxForm props
  handleSubmit: PropTypes.func.isRequired,

  // Router props
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
  }),
};

SearchPage.defaultProps = {
  match: { params: { query: null } },
};

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { query } } } = ownProps;
  return {
    initialValues: { search: query },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'searchPage',
    destroyOnUnmount: false,
  })(Loader({
    selector: (state) => state.pages.searchPage.searchResults,
    loadAction: actions.search,
    handleLoad: testActions.handleSearchLoad,
  })(SearchPage))
);

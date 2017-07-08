import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form, Field, reduxForm, formValueSelector } from 'redux-form';

import NativeListener from 'react-native-listener';

import { CommandButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { List, ListItem } from 'material-ui/List';

import { Loader } from '~/client/core';

import { FabricDateField, FabricSelectField, FabricTextField, Validations } from '~/client/redux-forms-fabric';

import * as actions from '../actions';
import { testActions } from '../actionTypes';


const formName = 'searchPage';
const formSelector = formValueSelector(formName);

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { method, query } } } = ownProps;
  return {
    initialValues: { query: query, method: method || 'zip', date: new Date() },
    formValues: {
      method: formSelector(state, 'method'),
    },
  };
};

class SearchPage extends React.Component {
  onItemSelected = (id) => () => {
    const { history } = this.props;
    history.push(`/detail/${id}`);
  }

  onSubmit = (values) => {
    const { loadAction } = this.props;

    loadAction({ query: values.query, method: values.method });
  }

  render = () => {
    const { handleSubmit, valid, loaderState: { data }, formValues: { method } } = this.props;

    return (
      <div>
        <h1>Search Page</h1>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="method"
            component={FabricSelectField}
            validate={Validations.required}
            props={{
              label: 'Search By',
              options: [
                { key: 'zip', text: 'Zip' },
                { key: 'name', text: 'Name' }
              ]
            }}
          />
          <Field
            name="date"
            component={FabricDateField}
            validate={Validations.required}
            props={{
              label: 'Date',
            }}
          />
          <Field
            name="query"
            component={FabricTextField}
            validate={method === 'zip' ? Validations.validateZip : Validations.required}
            props={{
              label: 'Query',
              iconProps: { iconName: 'Search' },
              autoComplete: 'off',
            }}
          />
          <CommandButton
            data-automation-id='search'
            iconProps={{ iconName: 'Search' }}
            disabled={!valid}
            type="submit"
          >
            Search
        </CommandButton>
        </Form>
        {(!data || data.length === 0) && <p>No results</p>}
        {
          data && data.length > 0 &&
          <List>
            {
              data.map((item) =>
                <ListItem key={item.id} primaryText={item.name} onClick={this.onItemSelected(item.id)} />
              )
            }
          </List>
        }
      </div>
    );
  }
}

SearchPage.propTypes = {
  // component props
  formValues: PropTypes.shape({
    method: PropTypes.string,
  }),

  // Loader props
  reset: PropTypes.func.isRequired,
  loaderState: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,

  // reduxForm props
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,

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
  formValues: { searchMethod: null },

  match: { params: { query: null } },
};

export default connect(mapStateToProps)(
  reduxForm({
    form: formName,
    destroyOnUnmount: false,
  })(Loader({
    selector: (state) => state.pages.searchPage.searchResults,
    loadAction: actions.search,
    handleLoad: testActions.handleSearchLoad,
  })(SearchPage))
);

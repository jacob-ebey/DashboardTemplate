import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

import ErrorMessage from './ErrorMessage';


export default class FabricCheckbox extends React.Component {
  render = () => {
    const { input, meta, ...rest } = this.props;
    const { checked, onChange } = input;
    const { error } = meta;

    return (
      <div>
        <Checkbox
          checked={checked}
          onChange={(event, value) => onChange(value)}
          {...rest}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

FabricCheckbox.propTypes = {
  input: PropTypes.shape({
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
};

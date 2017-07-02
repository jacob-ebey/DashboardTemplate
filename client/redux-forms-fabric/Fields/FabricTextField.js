import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class FabricTextField extends React.Component {
  render = () => {
    const { input, meta, ...rest } = this.props;
    const { value, onBlur, onChange, onFocus } = input;
    const { error } = meta;

    return (
      <TextField
        value={value || ''}
        onChanged={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onGetErrorMessage={() => error}
        {...rest}
      />
    );
  }
}

FabricTextField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }),
  meta: PropTypes.shape({
    dirty: PropTypes.bool,
    error: PropTypes.string,
  }),
  type: PropTypes.string,
};

FabricTextField.defaultProps = {
  type: 'text',
};

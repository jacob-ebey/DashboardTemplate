import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

export default class FabricSelectField extends React.Component {
  render = () => {
    const { input, meta, options, ...rest } = this.props;
    const { value, onBlur, onChange, onFocus } = input;
    const { dirty, error } = meta;

    return (
      <Dropdown
        selectedKey={value || ''}
        onChanged={(value) => onChange(value.key)}
        onBlur={onBlur}
        onFocus={onFocus}
        errorMessage={dirty ? error : null}
        options={options}
        {...rest}
      />
    );
  }
}

FabricSelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    dirty: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.any,
    text: PropTypes.string,
  })),
};

FabricSelectField.defaultProps = {
  options: null,
};

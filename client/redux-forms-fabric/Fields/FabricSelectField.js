import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import ErrorMessage from './ErrorMessage';


export default class FabricSelectField extends React.Component {
  render = () => {
    const { input, meta, options, ...rest } = this.props;
    const { value, onBlur, onChange, onFocus } = input;
    const { error } = meta;

    return (
      <div>
        <Dropdown
          selectedKey={value || ''}
          onChanged={(value) => onChange(value.key)}
          onBlur={onBlur}
          onFocus={onFocus}
          options={options}
          required={false}
          {...rest}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

FabricSelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
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

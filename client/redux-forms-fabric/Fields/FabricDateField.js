import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';

import ErrorMessage from './ErrorMessage';


export default class FabricDateField extends React.Component {
  render = () => {
    const { input, meta, ...rest } = this.props;
    const { value, onBlur, onChange, onFocus } = input;
    const { submitFailed, dirty, error } = meta;

    const date = new Date(value);

    return (
      <div>
        <DatePicker
          value={date}
          onSelectDate={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          errorMessage={error}
          allowTextInput={true}
          {...rest}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

FabricDateField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
};

FabricDateField.defaultProps = {
  type: 'text',
};

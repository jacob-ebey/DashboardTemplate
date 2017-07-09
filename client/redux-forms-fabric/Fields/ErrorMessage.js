import React from 'react';
import PropTypes from 'prop-types';


export default class ErrorMessage extends React.Component {
  render = () => {
    const { error } = this.props;

    return error ?
      <span className="fabricError ms-TextField-errorMessage css-180bpec errorMessage_277345e8">
        <i className="ms-Icon ms-Icon--Info css-liugll errorIcon_277345e8" aria-hidden="true" />
        {error}
      </span>
      : null;
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: null,
};

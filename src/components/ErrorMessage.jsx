import React from 'react';
import PropTypes from 'prop-types';

import '../styles/errorMessage.css';

class ErrorMessage extends React.Component {
  static propTypes = {
    message: PropTypes.string
  };

  render() {
    if (this.props.message) {
      return (
        <div className="error_message">
          <span className="strong">!ERROR!</span>
          <p>{this.props.message}</p>
        </div>
      );
    }

    return false;
  }
}


export default ErrorMessage;

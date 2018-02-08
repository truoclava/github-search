import React from 'react';
import PropTypes from 'prop-types';

import '../styles/paginate.css';

class Paginate extends React.Component {

  static propTypes = {
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    totalCount: PropTypes.number,
    totalPages: PropTypes.number
  }

  handleOnPageChange(page) {
    if (this.props.onPageChange) {
      this.props.onPageChange(page);
    }
  }

  renderPrev() {
    if (this.props.page > 1) {
      return (
        <span className="arrow" onClick={this.handleOnPageChange.bind(this, this.props.page - 1)}>
          &larr;
        </span>
      );
    }
  }

  renderPages() {
    return (
      <span className="pages">
        {this.props.page}/{this.props.totalPages}
      </span>
    );
  }

  renderNext() {
    if (this.props.page < this.props.totalPages)
    return (
      <span className="arrow" onClick={this.handleOnPageChange.bind(this, this.props.page + 1)}>
        &rarr;
      </span>
    );
  }

  render() {
    if (this.props.totalCount <= 1) {
      return (
        <div className="paginate">
        </div>
      );
    }

    return (
      <div className="paginate">
        {this.renderPrev()}
        {this.renderPages()}
        {this.renderNext()}
      </div>
    );
  }
}

export default Paginate;

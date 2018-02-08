import React from 'react';
import PropTypes from 'prop-types';
import '../styles/searchResultsRow.css';

class SearchResultRow extends React.Component {
  static propTypes = {
    result: PropTypes.object,
  };

  render() {
    let result = this.props.result;
    let owner = result.owner;
    return (
      <div className="search_result_row flex_row">
        <div className="owner_info">
          <p className="strong">{owner.login}</p>
          <img src={owner.avatar_url} alt="avatar" />
        </div>
        <div className="repo_details">
          <a href={result.html_url} target="_blank">{result.full_name}</a>
          <p>{result.description}</p>
          <p><span className="strong">Forks Count:</span> {result.forks_count}</p>
          <p><span className="strong">Watchers Count:</span> {result.watchers_count}</p>
        </div>

      </div>
    );
  }
}

export default SearchResultRow;

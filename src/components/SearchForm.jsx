import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../components/ErrorMessage';

class SearchForm extends React.Component {
  static propTypes = {
    perPage: PropTypes.number,
    onSearch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      language: 'ruby',
      errorMessage: null
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // valid() {
  //   if (!this.state.keyword || !this.state.language) {
  //     this.setState({errorMessage: 'Please enter keyword and select a language before proceeding.'});
  //   }
  //
  //   return true;
  // }

  handleInputChange(e) {
    let keyword = e.target.value;
    this.setState({keyword: keyword})
  }

  handleSelect(e) {
    e.preventDefault();
    let language = e.target.value;
    this.setState({language: language})
  }

  handleSearch(e) {
    e.preventDefault();

    let params = {
      keyword: this.state.keyword,
      language: this.state.language,
      page: 1
    }

    if (this.props.onSearch) {
      this.props.onSearch(params);
    }
  }

  render() {
    let languages = ['ruby', 'javascript', 'assembly', 'c', 'java'];
    let options = languages.map((language, index) => {
      return (
        <option key={index} value={language}>{this.capitalize(language)}</option>
      );
    });

    return (
      <form onSubmit={this.handleSearch.bind(this)}>
        <input
          name="keyword"
          type="text"
          placeholder="enter search query"
          onChange={this.handleInputChange.bind(this)}
        />
        <select
          value={this.state.language}
          onChange={this.handleSelect.bind(this)}
          name="language_select"
        >
          {options}
        </select>
        <button type="submit">
          Search
        </button>
        <ErrorMessage
          message={this.state.errorMessage}
        />
      </form>
    );
  }
}

export default SearchForm;

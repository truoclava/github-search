import React from 'react';
import SearchActions from '../actions/SearchActions';
import SearchStore from '../stores/SearchStore';
import connectToStores from 'alt-utils/lib/connectToStores';

import SearchResultRow from '../components/SearchResultRow';
import SearchForm from '../components/SearchForm';
import ErrorMessage from '../components/ErrorMessage';

import Paginate from '../components/Paginate';
// made decision to use connectToStores instead of mixins based on this article:
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      page: 1,
      perPage: 10,
      language: null
    }
  }

  static getStores() {
    return [SearchStore];
  }

  static getPropsFromStores() {
    return SearchStore.getState();
  }

  loadPage(page) {
    let params = {
      q: `${this.state.keyword} language:${this.state.language}`,
      per_page: this.state.perPage || 10,
      page: page
    }

    SearchActions.index(params);
  }

  handleSearch(params) {
    this.setState({page: params.page, keyword: params.keyword, language: params.language}, () => {
      this.loadPage(this.state.page);
    });

    // SearchActions.index(params);
  }

  handlePageChange(page) {
    this.setState({page: page}, () => {
      this.loadPage(this.state.page);
    });
  }

  renderSearchResults() {
    let results = this.props.results;
    // let totalPages = Math.ceil(this.props.totalCount / this.state.perPage);
    // this is how I originally was getting totalPages but
    // doc said it was important to use Link header values so I changed my logic
    let totalPages = this.props.totalPages;

    let renderedResults = results.map((result, index) => {
      return (
        <SearchResultRow
          key={index}
          result={result}
        />
      );
    })

    return (
      <div className="search_results">
        <h3>Search Results</h3>
        <Paginate
          page={this.state.page}
          totalCount={this.props.totalCount}
          totalPages={totalPages}
          onPageChange={this.handlePageChange.bind(this)}
        />
        {renderedResults}
      </div>
    );
  }

  render() {
    return (
      <div className="search_field">
        <SearchForm
          perPage={this.state.perPage}
          onSearch={this.handleSearch.bind(this)}
        />
        <ErrorMessage
          message={this.props.error}
        />
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default connectToStores(Search);

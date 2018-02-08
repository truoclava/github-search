import alt from '../lib/altInstance';
import SearchActions from '../actions/SearchActions';

class SearchStore {
  constructor() {
    this.state = {
      results: [],
      resultsLoading: true,
      totalCount: 0,
      linkHeader: null,
      error: null
    };

    this.bindListeners({
      index: SearchActions.INDEX,
      indexSuccess: SearchActions.INDEX_SUCCESS,
      indexFailed: SearchActions.INDEX_FAILED
    });
  }

  getNextPage() {
    if (this.state.linkHeader) {
      return this.state.linkHeader.split(/\s*,\s*/).reduce((nextUrl, link) => {
        if (link.search(/rel="next"/) !== -1) {
            return (link.match(/<(.*)>/) || [])[1];
        }
        return nextUrl;
      }, undefined);
    }

    return null;
  }

  getTotalPages(linkHeader) {
    // did not download octokit so created own function to get totalPages
    let lastLink = linkHeader.split(/\s*,\s*/).reduce((lastUrl, link) => {
      if (link.search(/rel="last"/) !== -1) {
          return (link.match(/<(.*)>/) || [])[1];
      }
      return lastUrl;
    }, undefined);

    let matchingString = lastLink.match(/&page=(\d+).*$/)[1];
    return parseInt(matchingString, 10);
  }

  index() {
    this.setState({resultsLoading: true});
  }

  indexSuccess(response) {
    let data = response.data
    let totalPages = response.headers.link ? this.getTotalPages(response.headers.link) : 1;
    this.setState({results: data.items, resultsLoading: false, totalCount: data.total_count, totalPages: totalPages, linkHeader: response.headers.link});
  }

  indexFailed(error) {
    this.setState({error: error});
  }
}

export default alt.createStore(SearchStore);

import alt from '../lib/altInstance';
import SearchService from '../services/SearchService';

class SearchActions {
  index(params) {
    SearchService.index(params)
      .then( (response) => {
        this.indexSuccess(response);
      })
      .catch( (error) => {
        this.indexFailed(error.response.data.message);
      });
    return true;
  }

  indexSuccess(response) {
    return response;
  }

  indexFailed(error) {
    return error;
  }
}

export default alt.createActions(SearchActions);

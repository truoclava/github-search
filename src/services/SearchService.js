import axios from 'axios';

let SearchService = {
  // 'https://api.github.com/search/repositories?q=pizza+language:Ruby&per_page=10'
  baseUrl: `https://api.github.com/search/repositories`,
  index(params) {
    return axios.get(`${this.baseUrl}`, {params: params});
  },

  paginate(url) {
    return axios.get(url);
  }
};

export default SearchService;

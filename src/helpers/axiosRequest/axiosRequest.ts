import axios from 'axios';
import { IAxiosRequest } from 'helpers/axiosRequest/axiosRequest.interfaces';
import { stringify } from 'query-string';

const axiosRequest = async ({ endpoint, data, method = 'get', headers, query }: IAxiosRequest) => {
  const basePath = `${process.env.API_HOST}/${endpoint}`;
  let param = '';
  if (query) {
    param = `?${stringify(query)}`;
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json';

  return axios(`${basePath}${param}`, { method, data, headers });
};

export default axiosRequest;

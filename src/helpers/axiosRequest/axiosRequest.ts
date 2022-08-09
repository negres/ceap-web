import axios from 'axios';
import { IAxiosRequest } from 'helpers/axiosRequest/axiosRequest.interfaces';
import { stringify } from 'query-string';

const axiosRequest = async ({ endpoint, data, method = 'get', headers, query, toExpress }: IAxiosRequest) => {
  const basePath = `http://localhost:3000/${endpoint}`;
  let param = '';
  if (query) {
    param = `?${stringify(query)}`;
  }

  return axios(`${basePath}${param}`, { method, data, headers });
};

export default axiosRequest;

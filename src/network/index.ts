import { BASE_URL, TIME_OUT } from './request/config';
import MYRequest from './request';

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor: (config) => {
      return config;
    }
  }
});

export default myRequest;

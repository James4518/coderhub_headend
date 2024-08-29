import hyRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';

const myRequest: hyRequest = new hyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  interceptor: {
    requestInterceptor: (config) => {
      return config;
    },
    responseInterceptorCatch: async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.response.data.message === 'Unauthorized'
      ) {
        if (!myRequest.refreshingToken) {
          myRequest.refreshingToken = true;
          return myRequest
            .post({ url: 'auth/refresh' })
            .then(() => {
              myRequest.refreshingToken = false;
              myRequest.cancelTokenSources.forEach((source) =>
                source.cancel('Request canceled due to token refresh')
              );
              myRequest.cancelTokenSources.clear();
              return myRequest.instance(originalRequest);
            })
            .catch((err) => {
              myRequest.refreshingToken = false;
              myRequest.cancelTokenSources.forEach((source) =>
                source.cancel('Request canceled due to token refresh')
              );
              myRequest.cancelTokenSources.clear();
              return Promise.reject(err);
            });
        } else {
          myRequest.cancelTokenSources.forEach((source) =>
            source.cancel('Request canceled due to token refresh')
          );
          myRequest.cancelTokenSources.clear();
          return new Promise((resolve) => {
            myRequest.instance(originalRequest).then((res) => resolve(res));
          });
        }
      }
      return Promise.reject(error);
    }
  }
});

export default myRequest;

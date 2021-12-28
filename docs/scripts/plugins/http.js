import axios from 'axios';
import { saveErrorLog } from '../../../src';

export default {
  install(Vue) {
    Vue.prototype.$http = axios;

    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        if (error.response) {
          saveErrorLog({
            name: 'http',
            message: 'response error',
            error
          });
        } else if (error.request) {
          saveErrorLog({
            name: 'http',
            message: 'request error',
            error
          });
        } else {
          saveErrorLog({
            name: 'http',
            message: 'unknown error',
            error
          });
        }

        return Promise.reject(error);
      }
    );
  }
};

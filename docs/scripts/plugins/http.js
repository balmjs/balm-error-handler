import axios from 'axios';
import { captureHttpError } from '../../../src';

function errorHandler(error) {
  console.log('http error', error);
}

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
        captureHttpError(() => errorHandler(error));
        return Promise.reject(error);
      }
    );
  }
};

import axios from 'axios'
import store from '@/store'


const service = axios.create({
  baseURL: 'https://overseas.haier.net:8080',
  timeout: 60000,
  headers: {
  }
});

service.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('token');
    const lang = localStorage.getItem('lang') || 'en'
    if (lang == 'en') {
      config.headers.lang = 'en_US'
    } else {
      config.headers.lang = 'ja_JP'
    }
    if (accessToken) {
      config.headers.accessToken = `${accessToken}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  }, error => {
    Promise.reject(error);
  });

service.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          location.reload()
        }, 500)
      })
    }
    return Promise.resolve(response.data);
  }, error => {
    return Promise.reject((error));
  });

export default service;

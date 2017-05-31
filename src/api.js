import xhr from './xhr';
import { md5 } from './crypto';

const API_HOST = 'https://api.madefire.com';
// const API_HOST = 'http://localhost:3000';

export function api(method, path, options) {
  const url = `${API_HOST}/api/${path}`;
  return xhr(method, url, options);
}

export function get(path, options) {
  return api('GET', path, options);
}

export function post(path, options) {
  return api('POST', path, options);
}

export function hashPassword(password) {
  return md5(password);
}

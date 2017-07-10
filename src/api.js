import Madefire from './madefire';
import xhr from './xhr';
import { md5 } from './crypto';

export function api(method, path, options) {
  const { apiHost } = Madefire.getInstance().config;
  const url = `${apiHost}/api/${path}`;
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

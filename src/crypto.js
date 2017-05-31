/* eslint-disable import/prefer-default-export */
import SparkMD5 from 'spark-md5';

export function md5(message) {
  return SparkMD5.hash(message);
}

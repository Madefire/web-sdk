import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import { get, post, hashPassword } from './api';

/**
 * Make XHR GET request to retrieve coupon campaign data.
 * @param  {string} campaignSlug human-readable unique identifier for the coupon campaign
 * @return {Promise} promise which will resolve with campaign data or reject with error containing
 *                           the response's HTTP status code
 */
export function getCampaign(campaignSlug) {
  const path = `coupon/campaign/${campaignSlug}/`;
  return get(path);
}

/**
 * Make an XHR POST request to redeem a coupon code for a specified campaign and register or
 * validate a user.
 * @param  {string} campaignSlug human-readable unique identifier for the coupon campaign
 * @param  {Object} options XHR configuration options, including redemption data
 * @param  {string} options.code coupon redemption code (generated in admin)
 * @param  {string} options.name user's full name, required to register or validate the user
 * @param  {string} options.email user's email address, required to register or validate the user
 * @param  {string} options.password user's password, required to register or validate the user
 * @return {Promise} promise which will resolve with user data or reject with error containing the
 *                           response's HTTP status code
 */
export function postRedemption(campaignSlug, data) {
  const path = `coupon/campaign/${campaignSlug}/redemption/`;
  // Copy redemption data to options configuration.
  const options = { data: Object.assign({}, data) };
  // Password must be hashed using MD5 before submission.
  if (isObject(data) && !isUndefined(data.password)) {
    options.data.password = hashPassword(data.password);
  }
  return post(path, options);
}

export default {
  getCampaign,
  postRedemption,
};

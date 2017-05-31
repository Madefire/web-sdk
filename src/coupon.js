import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import { get, post, hashPassword } from './api';

export function getCampaign(campaignSlug) {
  const path = `coupon/campaign/${campaignSlug}/`;
  return get(path);
}

export function postRedemption(campaignSlug, options) {
  const path = `coupon/campaign/${campaignSlug}/redemption/`;
  const { data } = options;
  if (isObject(data) && !isUndefined(data.password)) {
    data.password = hashPassword(data.password);
  }
  return post(path, options);
}

export default {
  getCampaign,
  postRedemption,
};

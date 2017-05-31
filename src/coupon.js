import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import { get, post, hashPassword } from './api';

export function getCampaign(campaignId) {
  const path = `coupon/campaign/${campaignId}/`;
  return get(path);
}

export function postRedemption(campaignId, options) {
  const path = `coupon/campaign/${campaignId}/redemption/`;
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

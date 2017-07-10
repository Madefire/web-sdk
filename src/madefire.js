import coupon from './coupon';

let instance = null;

export default class Madefire {
  constructor(options = {}) {
    // Return instance if previously instantiated.
    if (instance) {
      return instance;
    }

    // Instantiate singleton.
    instance = {
      coupon,
    };

    // Configure instance.
    instance.config = Object.assign({
      apiHost: 'https://api.madefire.com',
    }, options);

    return instance;
  }

  static getInstance() {
    if (!instance) {
      throw new Error('Madefire SDK has not been instantiated.');
    }
    return instance;
  }
}

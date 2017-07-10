const { expect } = chai;

function isValidDate(value) {
  return !isNaN(Date.parse(value));
}

function isNumberOrNull(value) {
  return value === null || typeof value === 'number';
}

const unrejectedPromise = new Error('Promise was not rejected.');

describe('Madefire', function() {

  const mf = new Madefire({
    apiHost: 'http://localhost:3000',
  });

  describe('coupon', function() {

    // Campaign IDs
    const NON_EXISTENT_CAMPAIGN = 'mf-does-not-exist';
    const PENDING_CAMPAIGN = 'mf-pending';
    const UNGENERATED_CAMPAIGN = 'mf-nx-current-active-ungenerated';
    const UNLIMITED_CAMPAIGN = 'mf-nx-current-active-generated';
    const LIMITED_CAMPAIGN = 'mf-1x-current-active-generated';
    const INACTIVE_CAMPAIGN = 'mf-nx-current-inactive-generated';
    const EXPIRED_CAMPAIGN = 'mf-expired';

    // Error codes.
    const BAD_REQUEST = '400';
    const NOT_FOUND = '404';
    const GONE = '410';


    const MF_ENTITY_IDENTIFIER_REGEXP = /^[a-z]-[0-9a-f]{32}$/;

    describe('#getCampaign', function() {

      it('should return a 404 error for a non-existent campaign', function(done) {
        mf.coupon.getCampaign(NON_EXISTENT_CAMPAIGN)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 404 error for a pending campaign', function(done) {
        mf.coupon.getCampaign(PENDING_CAMPAIGN)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 404 error for a campaign without generated codes', function(done) {
        mf.coupon.getCampaign(UNGENERATED_CAMPAIGN)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return data for a current, active campaign with generated codes', function(done) {

        // {
        //     "activationDate": "1970-01-01T08:00:00Z",
        //     "active": true,
        //     "app": "mf",
        //     "bundle": "e-e55ed5d05eab46c1bdfeb37e331fca17",
        //     "expirationDate": "2070-01-01T08:00:00Z",
        //     "name": "MF Nx Current Active Generated",
        //     "numberOfCharacters": 1,
        //     "redemptionsPerCoupon": null,
        //     "slug": "mf-nx-current-active-generated"
        // }

        mf.coupon.getCampaign(UNLIMITED_CAMPAIGN)
          .then(function(data) {
            // Validate data object.
            expect(data).to.exist;
            expect(data).to.be.an('object');
            expect(data).to.have.keys([
              'activationDate',
              'active',
              'app',
              'bundle',
              'expirationDate',
              'name',
              'numberOfCharacters',
              'redemptionsPerCoupon',
              'slug',
            ]);

            // Validate data.
            const {
              activationDate,
              active,
              app,
              bundle,
              expirationDate,
              name,
              numberOfCharacters,
              redemptionsPerCoupon,
              slug,
            } = data;

            expect(activationDate).to.be.a('string');
            expect(activationDate).not.to.be.empty;
            expect(activationDate).to.satisfy(isValidDate);

            expect(active).to.be.a('boolean');
            expect(active).to.be.true;

            expect(app).to.be.a('string');
            expect(app).not.to.be.empty;

            expect(bundle).to.be.a('string');
            expect(bundle).not.to.be.empty;
            expect(bundle).to.match(MF_ENTITY_IDENTIFIER_REGEXP);

            expect(expirationDate).to.be.a('string');
            expect(expirationDate).not.to.be.empty;
            expect(expirationDate).to.satisfy(isValidDate);

            expect(name).to.be.a('string');
            expect(name).not.to.be.empty;

            expect(numberOfCharacters).to.be.a('number');

            expect(redemptionsPerCoupon).to.satisfy(isNumberOrNull);

            expect(slug).to.be.a('string');
            expect(slug).not.to.be.empty;

            done();
          });
      });

      it('should return a 404 error for an inactive campaign', function(done) {
        mf.coupon.getCampaign(INACTIVE_CAMPAIGN)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 410 error for an expired campaign', function(done) {
        mf.coupon.getCampaign(EXPIRED_CAMPAIGN)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(GONE);
            done();
          });
      });

    });

    describe('#postRedemption', function() {

      const validRedemptionData = {
        code: '0',
        name: 'David Furfero',
        email: 'user@madefire.com',
        password: 'M4d3f1r3',
      };

      it('should return a 404 error for a non-existent campaign', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(NON_EXISTENT_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 404 error for a pending campaign', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(PENDING_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 404 error for a campaign without generated codes', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(UNGENERATED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: missing `code`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        delete data.code;
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: empty `code`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.code = '';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: invalid `code`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.code = 'not a valid code';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: missing `name`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        delete data.name;
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: empty `name`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.name = '';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: missing `email`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        delete data.email;
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: empty `email`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.email = '';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: invalid `email`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.email = 'not a valid email address';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: missing `password`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        delete data.password;
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 400 error for an invalid redemption: empty `password`', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.password = '';
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return data for a valid redemption (existing user)', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function(data) {
            expect(data).to.exist;
            done();
          });
      });

      it('should return data for a valid redemption (new user)', function(done) {
        const data = Object.assign({}, validRedemptionData);
        data.email = `user${Date.now()}@madefire.com`;
        mf.coupon.postRedemption(UNLIMITED_CAMPAIGN, data)
          .then(function(data) {
            expect(data).to.exist;
            done();
          });
      });

      it('should return a 400 error for an exhausted redemption code', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(LIMITED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(BAD_REQUEST);
            done();
          });
      });

      it('should return a 404 error for an inactive campaign', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(INACTIVE_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(NOT_FOUND);
            done();
          });
      });

      it('should return a 410 error for an expired campaign', function(done) {
        const data = Object.assign({}, validRedemptionData);
        mf.coupon.postRedemption(EXPIRED_CAMPAIGN, data)
          .then(function() { done(unrejectedPromise); })
          .catch(function(error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(GONE);
            done();
          });
      });

    });
  });
});

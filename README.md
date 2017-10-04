

# Madefire Web SDK

_This SDK is in the early stages of development. Documentation is still in progress. If you have any questions, email David Furfero (furf@madefire.com) or Max Mautner (max@madefire.com)._

## Installation

Using a package manager:

```bash
yarn add Madefire/web-sdk -S
```

```bash
npm install Madefire/web-sdk.git -S
```

Using git:

```bash
git clone git@github.com:Madefire/web-sdk.git madefire-web-sdk
```

## Usage

1. Include Madefire SDK.

  ```html
  <script src="madefire.js"></script>
  ```

  ```js
  import Madefire from 'madefire-web-sdk';
  ```

2. Instantiate the API.

  ```js
  // For production, use the default configuration.
  const mf = new Madefire();

  // For development, you may use an alternative API host.
  const mf = new Madefire({
    apiHost: 'http://localhost:3000',
  });
  ```

3. Make API requests.

  ```js
  mf.coupon.getCampaign(campaignID)
    .then(campaign => renderCampaign(campaign))
    .catch(error => renderError(error));
  ```

## API Documentation

### Madefire.coupon

`Madefire.coupon` contains methods for accessing Madefire's coupon code redemption APIs.

#### getCampaign(campaignSlug)

Retrieves information about a specified campaign.

```js
const campaignSlug = 'ccisd-2017';

Madefire.coupon.getCampaign(campaignSlug)
  .then(function(campaign) {
    renderCampaign(campaign);
  })
  .catch(function(error) {
    renderError(error);
  });
```

Example response:

```json
{
  "activationDate": "2017-07-20T08:00:00Z",
  "active": true,
  "app": "mf",
  "bundle": "e-e55ed5d05eab46c1bdfeb37e331fca17",
  "expirationDate": "2017-10-20T08:00:00Z",
  "name": "2017 Comic-Con International: San Diego",
  "numberOfCharacters": 5,
  "redemptionsPerCoupon": null,
  "slug": "ccisd-2017"
}
```

Example error:

```json
TBD
```

#### postRedemption(campaignSlug, redemptionData)

Redeems a coupon code for a specified campaign and registers the user (if not previously registered) and retrieves the new (or existing) user's data.

```js
const campaignSlug = 'ccisd-2017';
const redemptionData = {
  code: 'da440',
  name: 'Fizzle Bop',
  email: 'fizzle.bop@hotmail.com',
  password: 'fizz1eB0p',
};

Madefire.coupon.postRedemption(campaignSlug, redemptionData)
  .then(function handleSuccess(user) {
    renderUser(user);
  })
  .catch(function handleError(error) {
    renderError(error);
  });
```

Example response:

```js
{
  "compedApps": "",
  "created": "2017-07-21T23:24:12Z",
  "email": "fizzle.bop@hotmail.com",
  "firstApp": "mf",
  "groups": [],
  "id": "u-fc1a9db2e2c0fc1ba55de5d62d2317ad",
  "isActive": true
  "isAuthor": false,
  "isStaff": false,
  "lastLogin": "2017-07-21T08:21:51.152930Z",
  "name": "Fizzle Bop",
  "okToEmail": true,
  "updated": "2017-07-21T23:24:12Z",
}
```

Example error:

```json
TBD
```

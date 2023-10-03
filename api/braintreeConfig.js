// Import the Braintree library
const braintree = require('braintree');

// Configure your Braintree credentials
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use 'Sandbox' for testing, change to 'Production' for live transactions
  merchantId: '2dp4ts5hx6gfqdrp',
  publicKey: 'v4mwgdm9ptg83vt8',
  privateKey: '001411b75295098b48825aa7ccd19599',
});

module.exports = gateway;

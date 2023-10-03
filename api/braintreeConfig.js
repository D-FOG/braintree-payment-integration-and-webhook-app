// Import the Braintree library
import braintree from 'braintree'

// Configure your Braintree credentials
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use 'Sandbox' for testing, change to 'Production' for live transactions
  merchantId: process.env.MerchantId,
  publicKey: process.env.PublicKey,
  privateKey: process.env.PrivateKey,
});

export default gateway;

// pages/api/process-payment.js

import gateway from './braintreeConfig';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const {
    amount,
    cardholderName,
    cardNumber,
    expirationDate,
    cvv,
    email,
  } = req.body;

  try {
    // Create a transaction using Braintree
    const result = await gateway.transaction.sale({
      amount,
      paymentMethodNonce: cardNumber, // For simplicity; use Braintree.js for secure client-side tokenization
      options: {
        submitForSettlement: true, // Set to true to settle the transaction immediately
      },
    });

    if (result.success) {
      // Payment successful
      // You can update user accounts, send confirmation emails, etc.
      return res.status(200).json({ success: true, message: 'Payment successful' });
    } else {
      // Payment failed
      return res.status(400).json({ success: false, message: 'Payment failed', errors: result.errors.deepErrors() });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

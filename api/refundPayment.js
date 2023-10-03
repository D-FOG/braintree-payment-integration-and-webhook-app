import transporter from '../app/mailerTransporter';

import gateway from './braintreeConfig';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { transactionId, amountToRefund } = req.body;

  try {
    // Refund the transaction using Braintree
    const result = await gateway.transaction.refund(transactionId, amountToRefund);

    if (result.success) {
      // Refund successful
      // Update user accounts or perform other actions as needed
      
      // Inform the user and update them with event information
      const message = `Payment with Transaction ID ${transactionId} has been refunded. Refund Amount: $${amountToRefund}`;
      sendUserNotification(email, message); // Implement this function to notify users
      
      return res.status(200).json({ success: true, message });
    } else {
      // Refund failed
      const message = 'Refund failed, please try again later';
      sendUserNotification(email, message);
      return res.status(400).json({ success: false, message: 'Refund failed', errors: result.errors.deepErrors() });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Function to send user notifications (implement based on your preferred notification method)
function sendUserNotification(email, message) {
  // Implement this function to send notifications to the user via email, SMS, or any other desired method.
  // Define email content
  const mailOptions = {
    from: 'your_email_address',
    to: email,
    subject: 'Notification Subject',
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email notification error:', error);
    } else {
      console.log('Email notification sent:', info.response);
    }
  });
}

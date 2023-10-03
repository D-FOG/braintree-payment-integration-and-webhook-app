// pages/api/cancel-payment.js
import transporter from '../app/mailerTransporter'
import gateway from './braintreeConfig';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { transactionId } = req.body;

  try {
    // Cancel the transaction using Braintree
    const result = await gateway.transaction.void(transactionId);

    if (result.success) {
      // Payment cancellation successful
      // Update user accounts or perform other actions as needed
      const message = `Payment with Transaction ID ${transactionId} has been canceled.`;
      sendUserNotification(email, message); // Implement this function to notify users
      
      return res.status(200).json({ success: true, message });
    } else {
      // Cancellation failed
      const message = 'Cancellation failed, please try again later';
      sendUserNotification(email, message);
      return res.status(400).json({ success: false, message: 'Cancellation failed', errors: result.errors.deepErrors() });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }

  // Function to send user notifications (implement based on your preferred notification method)
  function sendUserNotification(email, message) {
    // Implement this function to send notifications to the user via email, SMS, or any other desired method.
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
}

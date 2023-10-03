import {useState} from react 

export default function payForm() {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [email, setEmail] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
    
        // Send payment data to your server for processing with Braintree
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          body: JSON.stringify({
            amount: paymentAmount,
            cardholderName,
            cardNumber,
            expirationDate,
            cvv,
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          // Payment successful
          console.log('Payment successful');
        } else {
          // Payment failed
          console.error('Payment failed');
        }
      };
    
    return(
        <form id="payment-form" onSubmmit={handlePaymentSubmit}>
            <label for="amount">Amount:</label>
            <input type="text" id="amount" name="amount" required/>

            <label for="cardholder-name">Cardholder's Name:</label>
            <input type="text" id="cardholder-name" name="cardholder-name" required/>

            <label for="card-number">Credit Card Number:</label>
            <input type="text" id="card-number" name="card-number" required/>

            <label for="expiration-date">Expiration Date:</label>
            <input type="text" id="expiration-date" name="expiration-date" placeholder="MM/YYYY" required/>

            <label for="cvv">CVV/CVC:</label>
            <input type="text" id="cvv" name="cvv" required/>

            <label for="billing-address">Billing Address:</label>
            <input type="text" id="billing-address" name="billing-address" required/>

            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required/>

            <label for="terms">I agree to the Terms and Conditions</label>
            <input type="checkbox" id="terms" name="terms" required/>

            <button type="submit">Submit Payment</button>
        </form>

    )
}
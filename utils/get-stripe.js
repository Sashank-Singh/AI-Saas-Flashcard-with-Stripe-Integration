import getStripe from '@/utils/get-stripe';

const handleCheckout = async () => {
  const stripe = await getStripe();
  // You can now use the `stripe` object to interact with Stripe.js
  const { error } = await stripe.redirectToCheckout({ sessionId: 'your-session-id' });

  if (error) {
    console.error('Stripe checkout failed:', error);
  }
};
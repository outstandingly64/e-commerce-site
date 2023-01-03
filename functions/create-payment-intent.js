// access via URL: domain/.netlify/functions/create-payment-intent

require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  // POST request
  if (event.body) {
    const { cart, shipping_fee, total_quantity } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_quantity;
    };

    try{
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
      });

      return {
        statusCode: 200,
        body: JSON.stringify({clientSecret: paymentIntent.client_secret})
      };
    }catch(error){
      return {
        statusCode: 500,
        body: JSON.stringify({errorMsg: error.message}),
      }
    }
  }

  // navigating to this function in the browser is a GET request
  return {
    statusCode: 200,
    body: "payment intent created",
  };
};

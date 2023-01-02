// access via URL: domain/.netlify/functions/create-payment-intent

//TODO: connect to STRIPE, generate client secret token, 
exports.handler = async function (event, context) {
  // POST request
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    console.log(cart);
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  }

  // navigating to this function in the browser is a GET request
  return {
    statusCode: 200,
    body: "payment intent created",
  };
};

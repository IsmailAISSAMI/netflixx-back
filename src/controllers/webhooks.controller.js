const stripe = require('stripe')("sk_test_51IYB3kKHE4A4HHrOUKXd5GZqbWNq1QSmWvqY2al9fB1K2XCKk3vlC7N0e8Ob20IZVLEYrExnMZycwBlTKPuyrnNY001cANctnM");

exports.stripewebhook = (req, res) => {

  let data;
  let eventType;

  const webhookSecret = "whsec_plYdatFhXNSUpPmOozHnkyZAbRp5vS5n";

  if (webhookSecret) {

    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {

    case "payment_intent.succeeded":

      const productIdArray = [];
      
      JSON.parse(data.object.metadata.cart).forEach(element => {
        productIdArray.push(element.id);
      });
      
      // const newOrder = new Order({
      //   amount: data.object.amount / 100,
      //   date: data.object.created,
      //   user: data.object.metadata.userId,
      //   products: productIdArray,
      //   stripeId: data.object.id,
      //   status: data.object.status
      // });

      // newOrder.save().then((data) => console.log(data)).then(err => console.log(err));
    
      break;
    
    default:
      
  }
  res.sendStatus(200);
};
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
("sk_test_51NIWCvJV7xrxUeZRZvx2dfu8ohN3Vq8iiK3M9sIDiHkr84S15yaUksYAr0YdqBmNIUMW8EMKsBp499oR9bOCn3Vi00w7Ng62fI");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
  try {
    const {amount, shipping} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd",
    });
    res.status(200).send({clientSecret: paymentIntent.client_secret});
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("404, Not Found.");
});

exports.api = functions.https.onRequest(app);


// import {getDoc, collection} from "@firebase/firestore";
// import db from "../src/config/firebase.js";
// import functions from "firebase-functions";
// import stripe from "stripe";

// const stripeSecretKey = functions.config().stripe.secret_key;
// const stripeInstance = stripe(stripeSecretKey);

// export const createStripeCheckout =
// functions.https.onCall(async (data, context) => {
//   try {
//     // Retrieve items from Firestore
//     // data should contain the user id and the cart
//     const uid = data.id;
//     const itemsRef = collection(db, "users");
//     const querySnapshot = await getDoc(itemsRef, uid);
//     const items = [];

//     // find the user that corresponds
//     // list the cart items
//     if (querySnapshot.exists()) {
//       const {data} = querySnapshot.data();
//       const cart = data.cart;
//       // data is the user
//       // cart is an array

//       for (const item of cart) {
//         // fetch the actual item from the database
//         const itemData = await fetchListing(item);

//         const populatedItem = {
//           name: itemData.listingTitle,
//           price_data: {
//             currency: "sgd",
//             unit_amount: itemData.listingPrice * 100,
//             product_data: {
//               name: itemData.listingTitle,
//               images: [itemData.filePath],
//             },
//           },
//           quantity: 1,
//         };
//         items.push(populatedItem);
//       }

//       // Create Stripe Checkout session
//       const session = await stripeInstance.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         success_url: "localhost:3000/SUCCESS",
//         cancel_url: "localhost:3000/CANCEL",
//         line_items: items,
//       });

//       return {
//         id: session.id,
//         items,
//       };
//     }
//   } catch (error) {
//     console.error("Error creating Stripe Checkout session:", error);
//   }
// });

// /**
//  * Fetches the actual item data from the database.
//  * @param {Object} item - The item object.
//  * @return {Promise<Object>} The item data.
//  */
// async function fetchListing(item) {
//   try {
//     const listing = await getDoc(item.listingRef);
//     const data = listing.data();
//     if (listing.exists()) {
//       return {...data};
//     } else {
//       throw new Error("Listing does not exist");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// const secretKey = require("secretKey")
// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const stripe =
// require("stripe")();

// const app = express();

// app.get('/secret', async (req, res) => {
//   const intent =  await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'sgd',
//     // Verify your integration in this guide by including this parameter
//     metadata: {integration_check: 'accept_a_payment'},
//   });
//   res.json({client_secret: intent.client_secret});
// });

// app.listen(3000, () => {
//   console.log('Running on port 3000');
// });


// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'sgd',
//   // Verify your integration in this guide by including this parameter
//   metadata: {integration_check: 'accept_a_payment'},
// });

// app.use(cors({
//   origin: true,
// }));
// app.use(express.json());

// app.post("/payments/create", async (req, res) => {
//   try {
//     const {amount, shipping} = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       shipping,
//       amount,
//       currency: "usd",
//     });
//     res
//         .status(200)
//         .send(paymentIntent.client_secret);
//   } catch (err) {
//     res
//         .status(500)
//         .json({
//           statusCode: 500,
//           message: err.message,
//         });
//   }
// });

// app.get("*", (req, res) => {
//   res
//       .status(404)
//       .send("404, Not Found.");
// });

// exports.api = functions.https.onRequest(app);

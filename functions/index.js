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

// create express server 
const functions = require ("firebase-functions")
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: true
}))

app.get('*', (req, res) => {
  res
    .status(404)
    .send('404, Not Found.')
})

app.use(express.json())

exports.api = functions.https.onRequest(app);
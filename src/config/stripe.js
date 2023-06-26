const functions = require("firebase-functions")

exports.createStripeCheckout = functions.https.onCall(async(data, context) => {
    //stripe init
    const stripe = require("stripe")(functions.config().stripe.secret_key)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment", 
        success_url: "",
        cancel_url: "", 
        line_items: [
            {
                quantity: 1, 
                price_data: {
                    currency: "usd", 
                    unit_amount: (100) * 100, 
                    product_data: {
                        name: "New Camera"
                    },
                },
            },
        ],
    });

    return {
        id: session.id,
    };
});
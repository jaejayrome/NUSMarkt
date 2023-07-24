const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
const functions = require("firebase-functions")
app.use(cors())
const Stripe = require("stripe")(process.env.STRIPE_SK)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=> {
    res.send("Hello World")
})


app.post("/pay", async (req, res) => {

    try {
    const charge = await Stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "sgd",
    })

    console.log(charge);
    if (charge.status === "succeeded") {
      
        res.json({ success: true });
    } else {
    
        res.json({ success: false });
    }
    } catch(error) {
        console.log(error)
    res.json({success: false})
    } 
    

})

app.listen(8000, () => {
    console.log(`Server is running on port 8000`)
})

exports.api = functions.https.onRequest(app)
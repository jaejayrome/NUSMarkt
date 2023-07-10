const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
app.use(cors())
const port = process.env.port
const successPage = process.env.success_page
const failedPage = process.env.failed_page
const Stripe = require("stripe")(process.env.stripe_sk)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=> {
    res.send("Hello World")
})


app.post("/pay", async (req, res) => {
    // console.log(req.body.token)

    try {
    const charge = await Stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "sgd",
    })
    // upon succesful confirmation, redirect to the frontend 
    // Handle the charge result based on the actual structure of the charge object
    console.log(charge);
    if (charge.status === "succeeded") {
        // Payment was successful
        res.json({ success: true });
    } else {
        // Payment failed or the status is not available
        res.json({ success: false });
    }
    } catch(error) {
        console.log(error)
    res.json({success: false})
    } 
    

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
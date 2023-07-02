const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()
app.use(cors())
const port = process.env.port
const Stripe = require("stripe")(process.env.stripe_sk)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=> {
    res.send("Hello World")
})

app.post("/pay", async (req, res) => {
    console.log(req.body.token)
    await Stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "sgd",
    }   
    )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
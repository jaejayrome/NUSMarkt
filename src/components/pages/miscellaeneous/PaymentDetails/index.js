import React, { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "../../../compiledData/Navbar";
import { styled } from '@mui/system';
import { apiInstance } from "../../../../utils";

export default function PaymentDetails() {
  const elements = useElements();
  const stripe = useStripe()

  const [receipientName, setReceipientName] = useState("")
  const [shippingAddressLine1, setShippingAddressLine1] = useState("");
  const [shippingAddressLine2, setShippingAddressLine2] = useState("");
  const [shippingAddressCity, setShippingAddressCity] = useState("");
  const [shippingAddressPostalCode, setShippingAddressPostalCode] = useState("");
  const [shippingAddressState, setShippingAddressState] = useState("");
  const [shippingAddressCountry, setShippingAddressCountry] = useState("");

  const [nameOnCard, setNameOnCard] = useState("");
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingAddressCity, setBillingAddressCity] = useState("");
  const [billingAddressPostalCode, setBillingAddressPostalCode] = useState("");
  const [billingAddressState, setBillingAddressState] = useState("");
  const [billingAddressCountry, setBillingAddressCountry] = useState("");

  const shippingAddress = {
    receipientName: receipientName, 
    shippingAddressLine1: shippingAddressLine1, 
    shippingAddressLine2: shippingAddressLine2, 
    shippingAddressCity: shippingAddressCity, 
    shippingAddressCountry: shippingAddressCountry, 
    shippingAddressPostalCode: shippingAddressPostalCode, 
    shippingAddressState: shippingAddressState
  }

  const billingAddress = {
    nameOnCard: nameOnCard, 
    billingAddressLine1: billingAddressLine1, 
    billingAddressLine2: billingAddressLine2, 
    billingAddressCity: billingAddressCity, 
    billingAddressCountry: billingAddressCountry, 
    billingAddressPostalCode: billingAddressPostalCode, 
    billingAddressState: billingAddressState
  }

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const ScrollableCardContainer = styled('div')`
  overflow-y: auto;`;


  const onSubmit = async (evt) => {
    evt.preventDefault()
    const cardElements = elements.getElement("card");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      console.log("stripe or card element hasn't loaded yet ")
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (
        !receipientName || !shippingAddressLine1 ||
        !shippingAddressState || !shippingAddressCity ||
        !shippingAddressCountry || !shippingAddressPostalCode ||
        !nameOnCard  || !billingAddressLine1 ||
        !billingAddressState || !billingAddressCity ||
        !billingAddressCountry || !billingAddressPostalCode
    ){return ;}

    apiInstance.post('/payments/create', {
        amount: 200, 
        shipping: {
            name: receipientName, 
            address: {
                ...shippingAddress
            }
        }
    }).then(({data: clientSecret}) => {
        stripe.createPaymentMethod({
            type: 'card', 
            card: cardElements, 
            billing_details: {
                name: nameOnCard, 
                address: {
                    ...billingAddress
                }
            }
        }).then(({ paymentMethod }) => {
            stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id
            })
            .then(({paymentIntent}) => {
                console.log(paymentIntent)
                console.log("success")
            })
        })
    })

    
    // Perform necessary actions with the card details and billing address
  };

  return (
    <Box display="flex" flexDirection="column" >
      <Navbar />
      <Box sx = {{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}> 
      <Box mt={2} sx = {{flex: 1, display: "flex", flexDirection: "column"}}>
        <Typography variant="h6">SHIPPING ADDRESS</Typography>

        <TextField
          label="Receipient Name"
          variant="outlined"
          value={receipientName}
          onChange={(event) => setReceipientName(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Line 1"
          variant="outlined"
          value={shippingAddressLine1}
          onChange={(event) => setShippingAddressLine1(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Line 2"
          variant="outlined"
          value={shippingAddressLine2}
          onChange={(event) => setShippingAddressLine2(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="City"
          variant="outlined"
          value={shippingAddressCity}
          onChange={(event) => setShippingAddressCity(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="State"
          variant="outlined"
          value={shippingAddressState}
          onChange={(event) => setShippingAddressState(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Postal Code"
          variant="outlined"
          value={shippingAddressPostalCode}
          onChange={(event) => setShippingAddressPostalCode(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <CountryDropdown
          valueType="short"
          value={shippingAddressCountry}
          onChange={(value) => setShippingAddressCountry(value)}
          sx={{ mb: 1 }}
        />
      </Box>

      <Box mt={2} sx = {{flex: 1, display: "flex", flexDirection: "column"}}>
        <Typography variant="h6">BILLING ADDRESS</Typography>

        <TextField
          label="Name On Card"
          variant="outlined"
          value={nameOnCard}
          onChange={(event) => setNameOnCard(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Line 1"
          variant="outlined"
          value={billingAddressLine1}
          onChange={(event) => setBillingAddressLine1(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Line 2"
          variant="outlined"
          value={billingAddressLine2}
          onChange={(event) => setBillingAddressLine2(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="City"
          variant="outlined"
          value={billingAddressCity}
          onChange={(event) => setBillingAddressCity(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="State"
          variant="outlined"
          value={billingAddressState}
          onChange={(event) => setBillingAddressState(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <TextField
          label="Postal Code"
          variant="outlined"
          value={billingAddressPostalCode}
          onChange={(event) => setBillingAddressPostalCode(event.target.value)}
          sx={{ mb: 1 }}
          required
        />

        <CountryDropdown
          valueType="short"
          value={billingAddressCountry}
          onChange={(value) => setBillingAddressCountry(value)}
          sx={{ mb: 1 }}
        />
      </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="h6">CARD DETAILS</Typography>
        <CardElement options={configCardElement} />
      </Box>
     

      <Button variant="contained" onClick={onSubmit} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  width: "100%",mt: 2 }}>
       Pay Now
      </Button>
      
    </Box>
    
  );
  }

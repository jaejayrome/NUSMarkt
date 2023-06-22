import PaymentDetails from "../miscellaeneous/PaymentDetails"
import {Elements} from '@stripe/react-stripe-js'
import { publishableKey } from "../../../config/stripe/config"
import { loadStripe } from "@stripe/stripe-js"



export default function Payment() {
    const stripePromise = loadStripe(publishableKey)
    return (
        <Elements stripe = {stripePromise}>
        <PaymentDetails />
        </Elements>
    )
}
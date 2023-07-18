import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "../../../stylesheets/Cart.css"
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import { useState, useEffect } from 'react';
import CartItemRow from "./Cart/CartItemRow.js"
import { query, collection, where, getDocs,getDoc} from 'firebase/firestore';
import { Table, TableBody, TableRow, TableCell, TableHead, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import PaymentIcon from '@mui/icons-material/Payment';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';

export default function CartItem(props) {
    const navigate = useNavigate()

    const [totalCost, setTotalCost] = useState(0);
    const [cart, setCart] = useState(null)
    const [uid, setUid] = useState(null);
    const [payNow, setPaynow] = useState(false)
  


    // const updateWithdrawAmount = async () => {
    //   try {
    //     // fetch the user and update the person accordingly 
    //     // i need to know the listing owners 
         
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setUid(user.uid)
          }
        });
      });

    useEffect(() => {
        const fetchUser = async () => {
            try {
              if (uid) {
              const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((document) => {
                setCart(document.data().cart)
              })
              }
            } catch (error) {
              console.log('Error fetching listing:', error);
            }
          };

          fetchUser();
    })

    useEffect(() => {
      const calculateTotalCost = async () => {
        if (cart) {
          const promises = cart.map(async (item) => {
            const realItem = await getDoc(item.listingRef);
            const subtotal = realItem.data().listingPrice * item.quantity;
            return subtotal;
          });
  
          const subtotals = await Promise.all(promises);
          const total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
          setTotalCost(total.toFixed(2));
        
        } else {
          setTotalCost("0.00");
        }
      };
  
      calculateTotalCost();
    }, [cart]);

    const paymentHandler = () => {
      setPaynow(true)
    }
    

    const paymentToken = async (token) => {
    try {

    console.log("before")
    console.log(cart)
    const response = await axios.post("https://us-central1-nusmarkt-41131.cloudfunctions.net/api/pay", {
      amount: totalCost * 100, 
      token: token,
    })

    // if no response i can put like a loading page 

    if (response.data.success) {

    console.log("after")
    console.log(cart)
    navigate("/payment/success")
    } else {
      navigate("/payment/failed")
    }

    } catch (error) {
      console.log(error)
    }
    }
    

    const headings = ["Product Name", "Price", "Quantity", 'Size', 'Subtotal', ' ']

    return (
        <div className='total_movement'> 
            <div className='cart_missing_font' style = {{ display: "flex", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',fontWeight: "bold", fontSize: "45px"}}> 
            
            {cart != null? "Shopping Cart" : <ShoppingBagOutlinedIcon sx={{ fontSize: 75}}/>}
            </div> 
            <div style = {{marginTop:  "1%",fontFamily: 'monospace', fontSize: "30px", display: "flex", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
             {props.isLogged ? 
            cart != null ?
            <div style={{width: "80%"}}>
            <Table> <TableHead> <TableRow> {headings.map((head) => <TableCell> {head} </TableCell>)} </TableRow></TableHead>
            <TableBody>
            {cart.map( (item) => <CartItemRow item = {item}/>)}
            <TableRow>  <TableCell align="right" colSpan={6}>
            <b> Total Cost: ${totalCost}</b>
           </TableCell></TableRow>

            </TableBody>
            </Table>

            <div style = {{justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: "5%"}}> 
            <Button disabled = {payNow} onClick = {paymentHandler} startIcon = {<PaymentIcon />} variant = "outlined" sx= {{borderColor: "black", align:"center", position: "relative", color: "black"}}> Checkout </Button>
            </div>

            {payNow && (
              <div style={{marginTop: "3%" ,display: "flex", justifyContent: "center", alignItems: "center"}}> 
                <StripeCheckout 
                stripeKey='pk_test_51NIWCvJV7xrxUeZRngBA3tGIxShEI28dquXmgUGT01sjWOpnx7LQQZMCJNP4HvtfhHgzQe42H5tHnlULb9gDXXvU00zt7XeG7c'
                name = "Payment" 
                // label= "Click to Proceed"
                description= {`Your total amount is ${totalCost} SGD`}
                email = {auth.currentUser.email}
                amount = {totalCost * 100}
                token = {paymentToken}>

                <Button variant = "outlined"  style = {{color: "black", borderColor: "black"}}> Click to Proceed </Button>

                </StripeCheckout>

                {/* <Button> Click To Proceed </Button> */}
              </div>
            )}
            
            </div>
            : "Add Items to you Cart"
            : "Sign in to add items to your Cart"}
            </div>
        </div>
    )
}
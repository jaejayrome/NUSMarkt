import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "../../../stylesheets/Cart.css"
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import { useState, useEffect } from 'react';
import CartItemRow from "./Cart/CartItemRow.js"
import { query, collection, where, getDocs,getDoc} from 'firebase/firestore';
import { Table, TableBody, TableRow, TableCell, TableHead, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

export default function CartItem(props) {

    const [totalCost, setTotalCost] = useState(0);
    const [cart, setCart] = useState(null)
    const [uid, setUid] = useState(null);


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
            <Button variant = "outlined" sx= {{borderColor: "black", align:"center", position: "relative", color: "black"}}> Checkout </Button>
            </div>
            
            </div>
            : "Add Items to you Cart"
            : "Sign in to add items to your Cart"}
            </div>
        </div>
    )
}
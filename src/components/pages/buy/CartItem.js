import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import "../../../stylesheets/Cart.css"
import {db, auth} from "../../../config/firebase.js"
import { useState, useEffect } from 'react';
import CartItemRow from "./Cart/CartItemRow.js"
import { query, collection, where, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

export default function CartItem(props) {

    const [cart, setCart] = useState(null)
    const [uid, setUid] = useState(null);


    // some issue with this code 

    // i cannot remove this then when i refresh there would be an error
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
    

    const headings = ["Product Name", "Price", "Quantity"]

    return (
        <div className='total_movement'> 
            <div className='cart_missing_font' style = {{ display: "flex", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',fontWeight: "bold", fontSize: "45px"}}> 
            
                {cart != null? "Shopping Cart" : <ShoppingBagOutlinedIcon sx={{ fontSize: 75}}/>}
            </div> 
            <div style = {{marginTop:  "1%",fontFamily: 'monospace', fontSize: "30px", display: "flex", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {props.isLogged ? 
            cart != null ? <Table> <TableHead> <TableRow> {headings.map((head) => <TableCell> {head} </TableCell>)} </TableRow></TableHead>
            <TableBody>
            {cart.map( (item) => <CartItemRow item = {item}/>)}
            </TableBody>
            </Table>: "Add Items to you Cart"
            : "Sign in to add items to your Cart"}
            </div>
        </div>
    )
}
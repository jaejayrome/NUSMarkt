import Navbar from "../../compiledData/Navbar"
import { useEffect, useState } from "react"
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import OrderDetails from "./OrderDetails"
import { query, collection, where, getDocs, updateDoc, deleteField} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Box, ImageList } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function SucessPage() {
    const [cart, setCart] = useState(null)
    const [uid, setUid] = useState(null);
    const navigate = useNavigate()

// after the success page i want to delete the cart
// the issue is once i refresh the page it wouldn't show this at all already
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setUid(user.uid)
          }
        });
        console.log("first use effect")
      }, []);

    useEffect(() => {
        const retrieveCart = async () => {
            try {
                if (uid){
                const q = query(collection(db, "users"), where("uid", "==", uid));
                console.log('inside')
                const querySnapshot = await getDocs(q);
                if (querySnapshot){
                querySnapshot.forEach((document) => {
                    setCart(document.data().cart)
                    console.log("done")
                })
                }
                }
            } catch (error){ 
                console.log(error)
            }
        }
        
        retrieveCart()
    
    }, [uid])

    const clearCartHandler = async () => {
        try {
            if (uid){
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot){
            querySnapshot.forEach((document) => {
                updateDoc(document.ref, {cart: deleteField()})
            })
            }
            toast("Back to Home!")
            navigate("/BUY")
            }
        } catch (error){ 
            console.log(error)
        }
    }

    return (
        <div> 
            <Navbar />

            <div style={{flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center"}}> 

                {cart ? 
                <div> 
                <div style={{marginBottom: "3%", textAlign: "center"}}> 
                <div style = {{fontSize: "30px", fontWeight: "bold"}}> 
                <div> 
                <CheckCircleIcon size = "large"/>
                </div>
                Order Confirmed!
                </div>

                <div> 
                Please contact your relevant sellers for more details
                <div> 
                Order Details are displayed below
                </div>
                </div>

                </div>

                </div> 
                : <div> 
                    Error 404 Not Found
                </div> }
                


                <Box sx = {{flexGrow: 1}}> 
                <ImageList sx ={{ overflowX: "hidden", overflowY: "auto", maxHeight: "400px", marginLeft: "2%", marginRight: '2%' }}>
                {cart && cart.map((item) => {
                    return (
                        <OrderDetails cartItem = {item} /> 
                    )
                })}
                </ImageList>
                </Box>


                {cart ? <div> 
                    <Button onClick = {clearCartHandler} startIcon = {<ArrowBackIcon/>} variant = "outlined" sx = {{color: "black", borderColor: "black", textTransform: 'none'}}> 
                    Back to Home 
                    </Button>
                </div>: <div> </div> }
                </div>

           
        </div>
    )
}
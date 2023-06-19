import { getDoc, query, collection, getDocs, where, updateDoc, arrayRemove} from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button, TableRow, TableCell, Tab } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { auth } from "../../../../config/firebase";
import db from "../../../../config/firebase";


export default function CartItemRow(props) {

    const [listing, setListing] = useState(null)
    const userID = auth.currentUser.uid;

    useEffect(() => {

        const fetchListing = async () => {
            try {
                const listing = await getDoc(props.item.listingRef)
                const data = listing.data()
                if (listing.exists()){
                    setListing({...data})
                } else {
                    alert('listing does not exist')
                }} catch(error) {
                console.log(error)
            }
        }
        fetchListing()
       
    }, [props.item]) 

    const deleteButtonClick = () => {
        // delete cart object from the user 

        const fetchUser = async () => {
        const q = query(collection(db, "users"), where("uid", "==", userID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (user) => {
            await updateDoc(user.ref, {cart: arrayRemove(props.item)})
        })
        }

        fetchUser()
    }


    const calculateItemTotal = (price, quantity) => {
        const subTotal = price * quantity
        return subTotal.toFixed(2)
    }

    return (
        <div> 
        {listing && (
        <div>
            <TableRow>
                <TableCell> {listing.listingTitle} </TableCell>
                <TableCell> {listing.listingPrice} </TableCell>
                <TableCell> {props.item.quantity} </TableCell>
                <TableCell> {calculateItemTotal(listing.listingPrice, props.item.quantity)} </TableCell>
                <TableCell> {props.item.size} </TableCell>
                <TableCell> <Button startIcon = {<DeleteIcon />} onClick = {deleteButtonClick}/></TableCell>
            </TableRow>
        </div>
      )}
        </div>
    )

}
import { getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { TableRow, TableCell, Tab } from "@mui/material"

export default function CartItemRow(props) {

    const [listing, setListing] = useState(null)

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
            </TableRow>
        </div>
      )}
        </div>
    )

}
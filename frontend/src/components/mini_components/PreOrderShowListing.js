import { useEffect } from "react"
import { arrayRemove, deleteDoc, getDoc, getDocs, snapshotEqual } from "@firebase/firestore"
import { useState } from "react"
import { IconButton, Card, CardActions, CardContent, CardHeader, ImageListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import db from "../../config/firebase.js"
import {auth} from "../../config/firebase.js"
import {query, where, collection, updateDoc} from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function PreOrderShowListing(props) {

    const [listing, setListing] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        const getListingData = async () => {
            await getDoc(props.listingRef)
            .then((listing) => {
                const data = listing.data()
                setListing({...data})
            })
            .catch((error) => {
                console.log(error)
            })
        }

        getListingData()
    }, [])

    const deleteHandler = async () => {
        // to delete the pre order listing 

        // remove the reference 
        // remove the document 
        try {
            const path = props.listingRef.path
            // go inside the user and retrieve it's array

            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
            const snapshot = await getDocs(q)

            snapshot.forEach((user) => {
                updateDoc(user.ref, {preorder_arr: arrayRemove(props.listingRef)})
            })

            // delete the actualDocument 

            await deleteDoc(props.listingRef)
            toast("You have successfully removed the pre-order listing!")
            navigate("/BUY/PREORDER/")
            

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Card sx = {{border: "1px solid black"}}>

        <CardHeader title = {listing && listing.listingTitle}>


        </CardHeader>
        {listing && listing.json64 &&   
        <img  height = "400px" width = "400px" src={`data:image/jpeg;base64, ${listing.json64}`}  alt = "not found"/>
        }  
        
        <CardContent sx={{ overflowY: 'hidden' }}> 

        {/* <div style = {{textAlign: "left"}}>
        {listing && listing.listingTitle}
        </div> */}
        <div style = {{textAlign: 'right'}}> 
        ${listing && listing.listingPrice}
        </div>

        <CardActions> 

        <IconButton onClick = {deleteHandler} sx = {{}} aria-label="add to favorites">
          <DeleteIcon />
        </IconButton>
            
  
        </CardActions>
        </CardContent>
        </Card>
    )
}
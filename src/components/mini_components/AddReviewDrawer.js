import { Button, Drawer} from "@mui/material";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box'
import {TextField} from "@mui/material"
import {getDoc, doc, updateDoc, arrayUnion, collection, addDoc} from 'firebase/firestore'
import db from "../../config/firebase.js"
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";

export default function AddReviewDrawer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [messageContent, setContent] = useState("");
    const navigate = useNavigate()

    const uploadReview = async () => {
        // for this listing i would upload to the message database 
        try {

            const messageCollectionRef = collection(db, "message")
            const addedMessage = await addDoc(messageCollectionRef, {content: messageContent, listedBy: auth.currentUser.displayName})

            const listingRef = doc(db, 'listing', props.listingRef);
            const listing = await getDoc(listingRef)

            if (listing.exists()) {
                updateDoc(listing.ref, {messagesArr: arrayUnion(addedMessage)})
                await props.callback()
                
            }
            // need to add the message to the actual 

            toast("Successfully submitted the review!")
            navigate("/BUY")
        } catch (error) {
            console.log(error)
        }
    }

    const messageContentHandler = (event) => {
        setContent(event.target.value)
    }
  

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button sx = {{right: "-85%",color: "black"}} onClick = {toggleDrawer}> Add A Review </Button>
            <Drawer PaperProps={{
            sx: { width: "45%" },
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <div style = {{fontWeight: "black", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontFamily: "monospace",fontWeight: "bold",marginBottom: "3%", fontSize: "30px"}}> 
            Your Feedback Matters
            </div>

            {/* <ListItem alignItems = "flex-start"> 
                Listing Description: 
            </ListItem>

            <Box sx = {{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}> 
                <ListItem sx = {{border: "1px solid black", width: "50%"}}> 
                    {props.listingDescription}
                </ListItem>
            </Box>

            <ListItem alignItems = "flex-start"> 
                Listed By:
                {props.listedBy}
            </ListItem> */}

            <div style = {{flexDirection: "column",display: "flex", justifyContent: "center", alignItems: "center"}}> 
               <TextField onChange = {messageContentHandler} label = "Leave Your Review " sx  = {{width: "50%"}} multiline = {true}> Add a comment </TextField>
    
                <Button onClick = {uploadReview} sx = {{font: "black", textTransform: "none"}}> Leave Review </Button>
            </div>


      </Drawer>
        </div>
    )
}
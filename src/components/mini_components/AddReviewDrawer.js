import { Button, Drawer, Box} from "@mui/material";
import { useState } from "react";
import {TextField} from "@mui/material"
import {getDoc, doc, updateDoc, arrayUnion, collection, addDoc} from 'firebase/firestore'
import db from "../../config/firebase.js"
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function AddReviewDrawer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewStatus, setReviewStatus] = useState("")
    const [messageContent, setContent] = useState("");
    const [loading, setLoading] = useState(true)
    const [click, setClick] = useState(false)
    const navigate = useNavigate()

    // api call 
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/siebert/sentiment-roberta-large-english",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    const uploadReview = async () => {
        // for this listing i would upload to the message database 
        try {          
            const checkModelLoading = async () => {
                setClick(true)
                const response = await query({ "inputs": messageContent });
                if (response.error === "Model siebert/sentiment-roberta-large-english is currently loading") {
                    setTimeout(checkModelLoading, 10000); 
                  } else {
                    setLoading(false);
                    console.log(JSON.stringify(response));
                  
                    const updateReviewStatus = response[0][0].label;
                    setReviewStatus(updateReviewStatus);
                  
                    const messageCollectionRef = collection(db, "message");
                    const addedMessage = await addDoc(messageCollectionRef, {
                      content: messageContent,
                      listedBy: auth.currentUser.displayName,
                      reviewStatus: updateReviewStatus,
                    });
                  
                    const listingRef = doc(db, "listing", props.listingRef);
                    const listing = await getDoc(listingRef);
                  
                    if (listing.exists()) {
                      await updateDoc(listing.ref, { messagesArr: arrayUnion(addedMessage) });
                      await props.callback();
                    }
                  
                    toast("Successfully submitted the review!");
                    navigate("/BUY");
                  }
                  
                }
          
              await checkModelLoading();
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
            <Button variant = "outlined" startIcon = {<AddCommentIcon />} sx = {{borderColor: "black", right: "-85%",color: "black"}} onClick = {toggleDrawer}> Add A Review </Button>
            <Drawer PaperProps={{
            sx: { width: "45%" },
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <div style = {{fontWeight: "black", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",fontWeight: "bolder",marginBottom: "3%", fontSize: "30px", marginTop: "10%"}}> 
            Your Feedback Matters
            </div>
            <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom: "3%", fontSize: "20px"}}> 
            How did you find the item? 
            </div>
            <div style = {{flexDirection: "column",display: "flex", justifyContent: "center", alignItems: "center"}}> 
               <TextField onChange = {messageContentHandler} label = "Leave Your Review " sx  = {{width: "50%"}} multiline = {true}> Add a comment </TextField>
    
                <Button variant = "contained" disabled = {click} onClick = {uploadReview} sx = {{backgroundColor: "black", marginTop: "5%", color: "white", font: "black", textTransform: "none"}}> Leave Review </Button>

                {click && loading && (
                    <div style = {{fontSize: "20px"}}>
                        Uploading Comment...
                        <CircularProgress color="inherit" />
                    </div>
                )}
            </div>

   

      </Drawer>
        </div>
    )
}
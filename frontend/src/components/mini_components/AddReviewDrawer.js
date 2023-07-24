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
import { useFormik } from "formik";
import * as Yup from 'yup'

export default function AddReviewDrawer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewStatus, setReviewStatus] = useState("")
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
        
        try {          
            const checkModelLoading = async () => {
                setClick(true)
                const response = await query({ "inputs": formik.values.messageContent });
                if (response.error === "Model siebert/sentiment-roberta-large-english is currently loading") {
                    setTimeout(checkModelLoading, 10000); 
                  } else {
                    setLoading(false);
                    console.log(JSON.stringify(response));
                

                    const updateReviewStatus = response[0][0].label;
                    setReviewStatus(updateReviewStatus);
                    const messageCollectionRef = collection(db, "message");
                    console.log(response[0][0].score)
                    const addedMessage = await addDoc(messageCollectionRef, {
                      content: formik.values.messageContent,
                      listedBy: auth.currentUser.displayName,
                      reviewStatus: response[0][0].score != 0 ? response[0][0].label : "NEUTRAL",
                      messageOwnerUID: auth.currentUser.uid,
                      replies_arr: []
                    });
                  
                    const listingRef = doc(db, "listing", props.listingRef);
                    const listing = await getDoc(listingRef);
                  
                    if (listing.exists()) {
                      await updateDoc(listing.ref, { messagesArr: arrayUnion(addedMessage) });
                      await props.callback();
                    }
                  
                    toast("Successfully submitted the review!");
                    navigate(`/BUY`);
                  }
                  
                }
          
              await checkModelLoading();
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const schema = Yup.object({
        messageContent: Yup.string().required("Reply must not be empty!")
    })

    const formik = useFormik({
        initialValues: {
            messageContent:''
        }, 
        validationSchema: schema, 
        onSubmit: values => uploadReview(values)
    })

    return (
        <div>
            <Button disabled = {props.myListing} variant = "outlined" startIcon = {<AddCommentIcon />} sx = {{borderColor: "black", right: "-85%",color: "black"}} onClick = {toggleDrawer}> Add A Review </Button>
            <Drawer PaperProps={{
            sx: { width: "45%", borderRadius: "25px"},
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <div style = {{fontWeight: "black", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",fontWeight: "bolder",marginBottom: "3%", fontSize: "30px", marginTop: "10%"}}> 
            Your Feedback Matters
            </div>
            <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom: "3%", fontSize: "20px"}}> 
            How did you find the item? 
            </div>

            <form onSubmit={formik.handleSubmit}> 
            <div style = {{flexDirection: "column",display: "flex", justifyContent: "center", alignItems: "center"}}> 
               <TextField name = "messageContent"
               onBlur = {formik.handleBlur} required
               error = {formik.touched.messageContent && formik.errors.messageContent} 
               helperText={formik.touched.messageContent && formik.errors.messageContent}
               onChange = {formik.handleChange} 
               label = "Leave Your Review " 
               sx  = {{width: "50%"}} multiline = {true} > Add a comment </TextField>
    
                <Button type = "submit" variant = "contained" sx = {{backgroundColor: "black", marginTop: "5%", color: "white", font: "black", textTransform: "none"}}> Leave Review </Button>
          
                {click && loading && (
                    <div style = {{fontSize: "20px", display: 'flex', flexDirection: 'column', marginTop: "5%", justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress color="inherit" />
                        <div style={{marginTop: "10%"}}> 
                        Uploading Comment...
                        </div>
                    </div>
                )}
            </div>
            </form>

   

      </Drawer>
        </div>
    )
}
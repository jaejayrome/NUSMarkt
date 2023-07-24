import { Button, Drawer, Box,Avatar, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import {TextField} from "@mui/material"
import {getDoc, doc, updateDoc, arrayUnion, collection, addDoc} from 'firebase/firestore'
import db from "../../config/firebase.js"
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReplyIcon from '@mui/icons-material/Reply';
import { useFormik } from "formik";
import * as Yup from 'yup'

export default function AddReplyDrawer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [messageContent, setContent] = useState("");
    const [loading, setLoading] = useState(true)
    const [click, setClick] = useState(false)
    const navigate = useNavigate()

    const message = props?.message
    
   
    const uploadReview = async () => {
        try {
            await updateDoc(props.messageRef, {replies_arr: arrayUnion({content: formik.values.messageContent, listedBy: auth.currentUser.displayName})})
            toast.success("successfully replied")
            navigate(`/BUY/${props.id}`
            
            )
        } catch(error) {
            console.log(error)
        }
    }

    const messageContentHandler = (event) => {
        setContent(event.target.value)
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
            <IconButton sx = {{color: 'black'}} disabled = {!props.myListing} onClick = {toggleDrawer}> 
                <ReplyIcon />
            </IconButton>
        
            <Drawer PaperProps={{
            sx: { width: "45%", borderRadius: "25px"},
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <form onSubmit={formik.handleSubmit}>

            <div style = {{fontWeight: "black", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",fontWeight: "bolder",marginBottom: "3%", fontSize: "30px", marginTop: "10%"}}> 
            Send Reply
            </div>

            <div style = {{display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', paddingLeft:"10%"}}> 
            <Avatar sx={{bgcolor: "black" }} aria-label="recipe">
            </Avatar>
            <div style={{display: "flex", flexDirection: 'column', marginLeft: '2%'}}> 
                {message.listedBy}
                <div> mentioned </div>
             </div>
            </div>

            <div style={{ marginTop:"4%", marginLeft: "16%", display: 'inline-block',fontSize: "22px", border: "1px solid black", borderRadius: "16px", padding: "1rem", wordWrap: "break-word", overflowWrap: "break-word", minWidth: "30%",maxHeight: "30%", maxWidth: "40%" }}>
            {message.content}
            </div>





            <div style = {{marginTop: "5%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",marginBottom: "3%", fontSize: "20px"}}> 
            Do remember to respond graciously to feedbacks!
            </div>
            <div style = {{flexDirection: "column",display: "flex", justifyContent: "center", alignItems: "center"}}> 
               <TextField name = "messageContent" 
               onBlur = {formik.handleBlur} required
               error = {formik.touched.messageContent && formik.errors.messageContent} 
               helperText={formik.touched.messageContent && formik.errors.messageContent}
               onChange = {formik.handleChange} 
               label = "Enter Reply " sx  = {{width: "50%"}} 
               multiline = {true}> Add a comment </TextField>
    
                <Button variant = "contained" disabled = {click} type = "submit" sx = {{backgroundColor: "black", marginTop: "5%", color: "white", font: "black", textTransform: "none"}}> Send Reply </Button>

                {click && loading && (
                    <div style = {{fontSize: "20px"}}>
                        Uploading Comment...
                        <CircularProgress color="inherit" />
                    </div>
                )}
            </div>
            </form> 

   

      </Drawer>
        </div>
    )
}
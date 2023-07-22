import Navbar from "../../compiledData/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import { Divider, TextField, InputLabel, Button, InputAdornment, OutlinedInput, FormControl} from "@mui/material";
import { addDoc, arrayUnion, collection, getDocs, updateDoc, where, query } from "@firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';


// NOTE THAT THE NAME OF THE FUNCTION IS NOT THE SAME AS THAT OF THE FILE NAME

// i need to createa a pre-order listing that would then link to another pre-order marketplace

// hence buy would split into listing marketplace, pre-order marketplace, orders placed
export default function Sell_KickStartIt() {

    const location = useLocation()
    const navigate = useNavigate()

    const url = location.state?.url    
    const storage = getStorage(); 

    const uploadOrder = async () => {
        const preOrder = {
            listingTitle: formik.values.title, 
            listingPrice: formik.values.price, 
            listingDescription: formik.values.description,
            pledgeTarget: formik.values.target, 
            pledgeCounter: 0,
            listedBy: auth.currentUser.displayName,
            json64: url
        }


        const collectionRef = collection(db, "preOrders")
        addDoc(collectionRef, preOrder)
        .then(async (docRef) => {

            const collection2Ref = collection(db, "users")
            const q = query(collection2Ref, where("uid", "==", auth.currentUser.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((user) => {
                updateDoc(user.ref, {preorder_arr: arrayUnion(docRef)})
            })
       
        })
        .catch((error) => {
        console.log(error);
        });
        
        toast("You have successfully uploaded your pre-order listing!")
        navigate("/BUY/PREORDER/")
        
       
    }


    const validationSchema = Yup.object({
        title: Yup.string().required("Listing Title is required!"),
        price: Yup.number().required("Listing Price is required!")
        .min(0.01, "Your item must cost at least $0.01")
        .positive("Price Must be a Positive Number")
        .test("decimal-places", "Price must have up to 2 decimal places", (value) => {
            return value.toString().split(".")[1]?.length <= 2 })
        ,
        description: Yup.string().required("Listing Description is required!"),
        target: Yup.number().required("Pledge Target is required!")
        .min(1, "Pledge Target Must be Minimally 1")
    })

    const formik = useFormik({
        initialValues: {
            title: '', 
            price: '',
            description: '',
            target: ''
        }, 
        validationSchema: validationSchema, 
        onSubmit: (values) => uploadOrder(values)
    })

    return (
        <div> 
            <Navbar />

            <div> 
                <div> 
                <div style={{marginBottom: "3%", textAlign: "center"}}> 
                <div style = {{fontSize: "30px", fontWeight: "bold"}}> 
                <div> 
                {/* <CheckCircleIcon size = "large"/> */}
                </div>
                Kick Start It
                </div>

                <div> 
                Create Your Pre-order Listing by filling the necessary details as follows:
                </div>

                </div>

                </div> 

                <form onSubmit={formik.handleSubmit}>
                <Divider sx = {{border: "1px solid black", mb: "5%"}}/>
                <div style={{display: "flex", flexDirection: 'row'}}> 

                <div style={{marginLeft: "10%" , flex: 1}}> 
                {url && <img height = "400px" width = "400px" src={`data:image/jpeg;base64, ${url}`}  alt = "image not found"/>}
                </div>



                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}> 
                <TextField  sx = {{width:  '80%', marginBottom: "5%" }}
                 multiline = {false}
                 label = "Listing Title" 
                 name = "title"
                 value={formik.values.title}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={formik.touched.title && formik.errors.title}
                 helperText={formik.touched.title && formik.errors.title}
                 required
                > </TextField>
{/* 
                <InputLabel htmlFor = "pricing" sx = {{marginTop:"5%"}}> Proposed Pricing</InputLabel> */}
                <TextField

                value={formik.values.price}
                name = "price"
                label = "Listing Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && formik.errors.price}
                required
                helperText={formik.touched.price && formik.errors.price} startAdornment = {<InputAdornment position="start"> $</InputAdornment>} sx = {{width:  '80%' }} id = "pricing" multiline = {false}
                InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }} 
                >
                </TextField>

                <TextField 
                name = "description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
              
                required
                sx = {{width:  '80%', marginTop: "5%" }} label = "Listing Description" multiline = {true}> </TextField>

                <TextField  
                name = "target"
                value={formik.values.target}
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.target && formik.errors.target}
                helperText={formik.touched.target && formik.errors.target} sx = {{width:  '80%', marginTop: "5%" }} label = "Pledge Target" multiline = {false}> </TextField>
                </div>
                </div>
                

                <div  style = {{alignItems: "flex-start", justifyContent: 'center', display: 'flex', marginTop: "2%"}}> 
                <Button type = "submit" variant = "outlined" sx = {{borderColor: "black", color: "black"}}> Enter </Button>
                </div>
                </form>

             
            </div>

            
        </div>
    )
}
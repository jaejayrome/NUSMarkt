import Navbar from "../../compiledData/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import db from "../../../config/firebase.js"
import {auth} from "../../../config/firebase.js"
import { Divider, TextField, InputLabel, Button, InputAdornment, OutlinedInput, FormControl} from "@mui/material";
import { addDoc, collection } from "@firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


// NOTE THAT THE NAME OF THE FUNCTION IS NOT THE SAME AS THAT OF THE FILE NAME

// i need to createa a pre-order listing that would then link to another pre-order marketplace

// hence buy would split into listing marketplace, pre-order marketplace, orders placed
export default function Sell_KickStartIt() {

    const location = useLocation()

    const url = location.state?.url
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [target, setTarget] = useState(0)

    // Function to upload image to storage 
    
    const storage = getStorage(); // Initialize Firebase storage

    const uploadImageToStorage = async (base64Data, fileName) => {
        try {
          const decodedData = atob(base64Data);
          const arrayBuffer = new ArrayBuffer(decodedData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
      
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
      
          const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      
          const storagePath = `preOrder/${fileName}.jpg`;
          const fileRef = ref(storage, storagePath);
          await uploadBytes(fileRef, blob);
        } catch (error) {
          console.log(error);
        }
      };



    const titleHandler = (event) => {
        setTitle(event.target.value)
    } 

    const priceHandler = (event) => {
        setPrice(event.target.value)
    } 

    const descriptionHandler = (event) => {
        setDescription(event.target.value)
    } 

    const targetHandler = (event) => {
        setTarget(event.target.value)
    } 
    const uploadOrder = async () => {
        const preOrder = {
            listingTitle: title, 
            listingPrice: price, 
            listingDescription: description,
            pledgeTarget: target, 
            pledgeCounter: 0,
            listedBy: auth.currentUser.displayName,
            json64: url
        }


        const collectionRef = collection(db, "preOrders")
        addDoc(collectionRef, preOrder)
        // .then((docRef) => {
        // const uid = docRef.id;
        // return uploadImageToStorage(url, uid);
        // })
        // .catch((error) => {
        // console.log(error);
        // });
       
    }

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

                <Divider sx = {{border: "1px solid black", mb: "5%"}}/>
                <div style={{display: "flex", flexDirection: 'row'}}> 

                <div style={{marginLeft: "10%" , flex: 1}}> 
                {url && <img height = "400px" width = "400px" src={`data:image/jpeg;base64, ${url}`}  alt = "image not found"/>}
                </div>

                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}> 

                <TextField onChange = {titleHandler} sx = {{width:  '80%' }} label = "Listing Title" multiline = {false}> </TextField>

                <InputLabel htmlFor = "pricing" sx = {{marginTop:"5%"}}> Proposed Pricing</InputLabel>
                <OutlinedInput onChange = {priceHandler} startAdornment = {<InputAdornment position="start"> $</InputAdornment>} sx = {{width:  '80%' }} id = "pricing" multiline = {false}> 
    
                </OutlinedInput>

                <TextField onChange = {descriptionHandler}  sx = {{width:  '80%', marginTop: "5%" }} label = "Listing Description" multiline = {true}> </TextField>

                <TextField onChange = {targetHandler}  helperText = "Please key in the number of pledges that you think you need to attain before converting it to an actual listing " sx = {{width:  '80%', marginTop: "5%" }} label = "Pledge Target" multiline = {false}> </TextField>


                </div>


                </div>

                <div  style = {{alignItems: "center", justifyContent: 'center', display: 'flex', marginTop: "3%"}}> 
                <Button onClick = {uploadOrder} variant = "outlined" sx = {{borderColor: "black", color: "black"}}> Enter </Button>
                </div>

             
            </div>

            
        </div>
    )
}
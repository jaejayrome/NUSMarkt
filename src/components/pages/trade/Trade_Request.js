import Navbar from "../../compiledData/Navbar";
import { Box, TextField, InputLabel, FormHelperText, Button} from "@mui/material";
import { useState } from "react";
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import { collection, arrayUnion, updateDoc, query, getDocs, where, addDoc} from "@firebase/firestore";
import {toast} from 'react-toastify';

export default function Trade_Request() {

    const [selectedSizes, setSelectedSizes] = useState([]);
    const [listingTitle, setListingTitle] = useState("");
    const [listingDescription, setListingDescription] = useState("")

    // callback function
    const handleSelectedSizes = (sizes) => {
        setSelectedSizes(sizes);
    };

    const listing_title_handler = (event) => {
        setListingTitle(event.target.value)
    }

    const listing_description_handler = (event) => {
        setListingDescription(event.target.value)
    }

    const newListing = {
        listingTitle: listingTitle,
        selectedSizes: selectedSizes, 
        listingDescription: listingDescription
    }

    const userID = auth.currentUser.uid;

    // updates the tradeListing database
    // updates the user database 

    
    const submitHandler = async () => {
        try {
            // this is correect because i myself is trying to upload this 
            const q = query(collection(db, "users"), where("uid", "==", userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
            const userRef = user.ref

            const tradeListingCollectionsRef = collection(db, "tradeListing")
            const tradeListing = await addDoc(tradeListingCollectionsRef, {...newListing, listedBy: user.data().userName})

            updateDoc(userRef, {Trade_ListingArr: arrayUnion(tradeListing) });
            
        })
        toast("You have successfuly uploaded a trade listing!")
        } catch(error) {
            console.log(error)
        }
    }




    // this to create a trade listing
    return (
        <div> 
            <Navbar />

            <Box sx = {{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", margin: "0 auto"}}>

                <div style={{fontWeight: "bold",color: "black", fontSize: "30px", fontFamily: "monospace"}}> 
                    Fill In the Following Details
                </div>

                <div>
                    <InputLabel htmlFor= "listing-title" sx = {{color: "black"}}> Looking For:</InputLabel>
                    <FormHelperText> This would appear in your trade listing title!</FormHelperText>
                    <TextField onChange = {listing_title_handler} id = "listing-title" multiline maxRows={2} fullWidth margin = "dense"> </TextField>
                </div>

                <div>
                    <div style={{margin: "2%"}}> 
                    Sizes Looking For:
                    </div>


                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>

                    <div> 
                        Selected Sizes: {selectedSizes.map(size => size + " ")}
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor= "product-description"> Trade Description </InputLabel>
                    <TextField onChange = {listing_description_handler} id = "product-description" multiline maxRows={4} fullWidth margin = "dense"> </TextField>
                </div>

                <Button onClick = {submitHandler}> Submit </Button>

            </Box>
        </div>
    )
}
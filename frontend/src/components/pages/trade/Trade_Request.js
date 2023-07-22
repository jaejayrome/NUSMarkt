import Navbar from "../../compiledData/Navbar";
import { Box, TextField, InputLabel, FormHelperText, Button, selectClasses} from "@mui/material";
import { useState } from "react";
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import { collection, arrayUnion, updateDoc, query, getDocs, where, addDoc} from "@firebase/firestore";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import TradeStepper from "../../mini_components/TradeStepper";
import CheckIcon from '@mui/icons-material/Check';
import UploadIcon from '@mui/icons-material/Upload';

export default function Trade_Request() {
    // yet to include the trade listings that u have made so far 

    const [selectedSizes, setSelectedSizes] = useState([]);
    const [listingTitle, setListingTitle] = useState("");
    const [listingDescription, setListingDescription] = useState("")
    const [stepper, setStepper] = useState(0)
    const [submit, setSubmit] = useState(false)

    const navigate = useNavigate()
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

    const disableLogoNow = () => {
        if (stepper == 2){
            setSubmit(true)
            return
        }
        setStepper(stepper + 1)      
      }

    const newListing = {
        listingTitle: listingTitle,
        selectedSizes: selectedSizes, 
        listingDescription: listingDescription
    }

    const userID = auth.currentUser.uid;

    // updates the tradeListing database
    // updates the user database 

    const isInput = listingTitle.trim("")
    const isInput1 = listingDescription.trim("")
    const isInput2 = selectedSizes.length > 0

    
    const submitHandler = async () => {
        try {
            // this is correct because i myself is trying to upload this 
            const q = query(collection(db, "users"), where("uid", "==", userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
            const userRef = user.ref

            const tradeListingCollectionsRef = collection(db, "tradeListing")
            const tradeListing = await addDoc(tradeListingCollectionsRef, {...newListing, listedBy: user.data().userName})

            updateDoc(userRef, {Trade_ListingArr: arrayUnion(tradeListing) });
            
        })
        toast("You have successfuly uploaded a trade listing!")
        navigate("/TRADE/MARKETPLACE")
        
        } catch(error) {
            console.log(error)
        }
    }




    // this to create a trade listing
    return (
        <div> 
            <Navbar />

            <Box sx = {{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", margin: "0 auto"}}>

            <div style={{ flex: 1, fontSize: "20px", textAlign: "center"}}>
            <div style={{ fontWeight: "bolder", fontSize: "40px", marginBottom: "5%" }}>
                Add Your Trade Listing
                <div style={{ fontWeight: "normal", fontSize: "25px" }}>
                customise and denote what other shirts are you willing to trade for
                </div>

            </div>
            </div>

            <TradeStepper stage = {stepper}/>
                {stepper == 0 && (<div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "7%"}}>
                    {/* <InputLabel htmlFor= "listing-title" sx = {{color: "black"}}> Looking For:</InputLabel> */}
                    
                    <TextField label= "Enter here" onChange = {listing_title_handler} id = "listing-title" multiline maxRows={2} sx ={{width: "100%", marginBottom: "1%"}} margin = "dense"> </TextField>
                    <FormHelperText sx = {{fontSize: "18px"}}> this would appear in your trade listing title!</FormHelperText>
                    <Button disabled = {!isInput} variant = "outlined" startIcon = {<CheckIcon />}  onClick={disableLogoNow} sx = {{borderColor: "black" ,color: "black", marginTop: "10%"}}> Confirm Input </Button>
                </div>)}

                

                {stepper == 1 &&(<div>
                    <div style={{marginBottom: "5%", marginTop: "20%"}}> 
                    Select Your Size:
                    </div>


                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>

                    <div style = {{marginTop: "5%"}}> 
                        Current Selection: {selectedSizes.map(size => size + " ")}
                    </div>
                    <Button variant = "outlined" startIcon = {<CheckIcon />}  disabled = {selectedSizes.length === 0} onClick={disableLogoNow} sx = {{marginTop: "5%",borderColor: "black" ,color: "black"}}> Confirm Input </Button>
                </div>)}

                {
                        stepper === 2 && (
                    
                            <div style={{ marginTop: "5%" }}>
                            <InputLabel htmlFor="product-description">Trade Description</InputLabel>
                            <TextField
                                onChange={listing_description_handler}
                                id="product-description"
                                multiline
                                maxRows={4}
                                // error = {!isInput1}
                                // helperText = {"Trade Listing Description is required!"}
                                fullWidth
                                margin="dense"
                                disabled = {submit}
                                sx={{ flex: 1, marginBottom: "1%" }} // Set flex: 1 to make the TextField expand to fill the available space
                            />
                            <Button
                                disabled={submit || !isInput1}
                                variant="outlined"
                                startIcon={<CheckIcon />}
                                onClick={disableLogoNow}
                                
                                sx={{ borderColor: "black", color: "black", marginTop: "5%" }}
                            >
                                Confirm Input
                            </Button>
                            </div>
                        )}


                {stepper == 2 && (<div style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "4%"}}> 
                    <Button  startIcon={<UploadIcon />} sx = {{color: "black", borderColor: "black"}}variant = "outlined" disabled = {!submit} onClick = {submitHandler}> Upload Listing </Button>
                </div>)}
                
            </Box>
        </div>
    )
}
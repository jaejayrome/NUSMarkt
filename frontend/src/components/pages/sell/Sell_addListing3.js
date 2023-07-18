import { query, where, getDocs,  collection, addDoc, updateDoc, setDocumentRef, arrayUnion} from '@firebase/firestore'
import db from '../../../config/firebase.js'
import {auth} from '../../../config/firebase.js'
import Navbar from '../../compiledData/Navbar.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import "../../../stylesheets/Listing.css"
import ImageHandler from '../../../config/ImageHandler.js';
import UploadIcon from '@mui/icons-material/Upload';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import SizingGuideTable from '../../mini_components/SizingGuideTable.js';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {toast} from 'react-toastify'

export default function Sell_addListing3() {

    const location = useLocation()

    // const [listingDocumentRef, setListingDocumentRef] = useState(null);
    const LargeAccountCircleSharpIcon = styled(AccountCircleSharpIcon)`
    font-size: 30px;`;

    const navigate = useNavigate()
    const json64 = location.state?.json64


    const newListing = {
        listingTitle: location.state.listingTitle, 
        listingPrice: location.state.listingPrice, 
        productDescription: location.state.productDescription, 
        sizesAvailable: location.state.sizesAvailable, 
        filePath: location.state.listingTitle,
        listedBy: location.state.listedBy,
        sizingGuide: location.state.sizingGuide
    }

    // onClickHandler when user adds listing 
    const addListingHandler = async () => {
        // need to add in the portion where it would upload the image
        
        try {
        const listingDocumentRef = await addDoc(collection(db, "listing"), newListing);


        const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const documentRef =  doc.ref;
        updateDoc(documentRef, {
            Sell_ListingArr: arrayUnion(listingDocumentRef)
        })
        navigate('/SELL/LISTINGS')
        toast("Your Listing has been successfully updated!")
      });
        } catch(error) {
            console.log(error)
            console.log(newListing)
        }
    }

    return (

        <div> 
            <Navbar />

            <div style = {{display: 'flex', flexDirection: 'column'}}> 

                <div style = {{flex: 1, fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "1%", marginLeft: "3%"}}> 
                    Step 3: Preview Listing
                </div>

                <Box sx = {{flex: 1, border: "2px dashed black", ml : "3%", mr: "3%", padding: '0 auto'}}>
                {newListing && (
                <div style = {{display: 'flex',
                    margin: '1%',
                    alignItems: 'flex-start'}}>

                <div style = {{flex: 1, marginLeft: '2%'}}> 
                {!!json64 ?  <img height = "400px" width = "400px" alt = {newListing.listingTitle} src={`data:image/jpeg;base64, ${json64}`} />
                    : <ImageHandler height = "400px" width = "400px" alt = {newListing.listingTitle} filePath= {newListing.filePath}/>}
                </div>

                <div style = {{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style = {{fontFamily: "monospace",  fontSize: "20px", marginBottom: "15px"}}> 
                {newListing.listingTitle}
                </div>
                <div style = {{fontFamily: "monospace", fontSize: "15px", marginBottom: "15px"}}>
                ${newListing.listingPrice}
                </div>
                <div style = {{fontFamily: "monospace", fontSize: "10px", marginBottom: "10%"}}> 
                {newListing.productDescription != null ? newListing.productDescription : "NA"}
                </div>

                <div style = {{display: "flex", marginBottom: "5%"}}>
                <div style= {{flex: "1"}}>
                <LargeAccountCircleSharpIcon  sx = {{marginRight: "3%"}}/>
                </div>

                <div style= {{flex: "8", fontSize: "10px", fontFamily: "monospace"}}>
                    Listed By: 
                    <div style = {{fontSize: "15px"}}> 
                    {newListing.listedBy}
                    </div>
                </div>
                </div>

            <div style = {{fontFamily: 'monospace', fontSize: "15px", display: "flex"}}>
                <div style={{flex: 4}}>
                Unsure Of Your Sizing?
                </div>

                <div style={{flex: 6}}>
                <Button variant = "outlined" size = "small" startIcon = {<CheckroomRoundedIcon />} sx = {{borderColor: "black", backgroundColor: 'white', color: "black", textTransform: "none"}}> SizeMeUp </Button>
                </div>
            </div> 

            <div style = {{fontSize: "15px",fontFamily: "monospace", textDecoration: "underline"}}>
            Size Guide:
            </div>

            {newListing.sizingGuide && (
                <SizingGuideTable inputMeasurements = {newListing.sizingGuide} selectedSizes = {newListing.sizesAvailable} dimensions = {newListing.sizingGuide.map((element) => element.name)} />
            )}
                </div> 
                </div>
                )}
                </Box>
            </div>

            <div style = {{position: "relative", left: "45%", marginTop: '1%'}}>
                        <Button
                        size = 'large'
                        startIcon={<UploadIcon />}
                        variant="outlined"
                        onClick = {addListingHandler}
                        sx={{
                        fontWeight: "bold",
                        borderColor: "black",
                        color: "black",
                        textTransform: "none",
                        '&:hover': {
                            backgroundColor: '#D3D3D3',
                            borderColor: 'black'
                        },
                        }}>
                        Upload Listing
                    </Button>
            </div> 
        </div>
    )
}



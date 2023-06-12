
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, TextField } from '@mui/material';
import Navbar from '../../compiledData/Navbar.js';
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import {auth} from '../../../config/firebase.js'
import SizingGuide from '../../mini_components/SizingGuide.js';
import TransitionModal from '../../mini_components/TransitionModal.js';

// this component is for the user to add any listings up to sell

export default function Sell_addListing() {
    const [listingTitle, setListingTitle] = useState("")
    const [listingPrice, setListingPrice] = useState("")
    const [productDescription, setProductDescription] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sizingGuide, setSizingGuide] = useState([]);
    const [cSizingGuide, setCSizingGuide] = useState([]);

    const [isSizeGuideConfirmed, setIsSizeGuideConfirmed] = useState(false);


    const preBuiltSizes = ["Chest Width", 'Shoulder Width', "Chest Length"]

    const handleSizingGuide = (sizingGuide) => {
        setSizingGuide(sizingGuide);
    };

    const confirmSizeGuide = (sizingGuide) => {
        setCSizingGuide(sizingGuide)
    }
    
    const handleConfirmSizeGuide = () => {
        confirmSizeGuide(sizingGuide);
        setIsSizeGuideConfirmed(true);
    };

    // state handlers
    const listingTitleHandler = (event) => {
        setListingTitle(event.target.value)
    }
    const listingPriceHandler = (event) => {
        setListingPrice(event.target.value)
    }
    const productDescriptionHandler = (event) => {
        setProductDescription(event.target.value)
    }

    // callback function
    const handleSelectedSizes = (sizes) => {
        setSelectedSizes(sizes);
    };
    
    // retrieves the currentUser username 
    const listedBy = auth.currentUser.displayName;

    // new Listing object
    const newListing = {
        listingTitle: listingTitle, 
        listingPrice: listingPrice, 
        productDescription: productDescription, 
        sizesAvailable: selectedSizes, 
        filePath: listingTitle,
        listedBy: listedBy,
        sizingGuide: cSizingGuide
    }

    const navigate = useNavigate()

    const navigationHandler = () => {
        navigate('STEP2', {state: newListing})
    }

    
    return (
        <div>
            <Navbar />

            <div style = {{display: "flex", flexDirection: 'row', alignItems: "center"}}> 
                <div style = {{flex: 1, marginLeft: "10%", display: "flex", flexDirection: 'column'}}>
                    <div style = {{fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                    Step 1: Fill in the Listing Details
                    </div>

                    <InputLabel htmlFor = "listingTitle"> Product Name </InputLabel>
                    <TextField id = "listingTitle"
                    variant = "outlined"
                    value = {listingTitle}
                    onChange = {listingTitleHandler}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <InputLabel htmlFor = "listingPrice"> Product Price </InputLabel>
                    <TextField id = "listingPrice"
                    variant = "outlined"
                    value = {listingPrice}
                    onChange = {listingPriceHandler}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <InputLabel htmlFor = "productDescription"> Product Description </InputLabel>
                    <TextField id = "productDescription"
                    variant = "outlined"
                    value = {productDescription}
                    onChange = {productDescriptionHandler}
                    sx = {{width: 500, mb: '1%'}}
                    required
                    />

                    <div style={{marginBottom: '1%'}}> 
                    Select Sizes
                    </div>
                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>
                    
                </div>
                {selectedSizes.length != 0 ?
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        Configure Sizing Guide 
                        <SizingGuide disabled={isSizeGuideConfirmed} dimensions = {preBuiltSizes} callback = {handleSizingGuide} selectedSizes = {selectedSizes}/>

                        <Button sx = {{color: "black", borderColor: "black", mt : '2%'}} disabled= {isSizeGuideConfirmed} variant = "outlined" onClick = {handleConfirmSizeGuide}> Confirm Size Guide </Button>
                    </div> : <div style = {{flex: 1}}> </div>
                }
            </div>

            <div style = {{marginTop: "3%" ,position: 'relative', left: "42%"}}>
            <TransitionModal navigation = {navigationHandler}/>
            </div>

            
        </div>
    )
}
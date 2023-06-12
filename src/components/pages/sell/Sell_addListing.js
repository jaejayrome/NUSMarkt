
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, TextField } from '@mui/material';
import Navbar from '../../compiledData/Navbar.js';
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import {auth} from '../../../config/firebase.js'
import SizingGuide from '../../mini_components/SizingGuide.js';
import TransitionModal from '../../mini_components/TransitionModal.js';

// this component is for the user to add any listings up to sell
// need to create a modal that lets u upload images to the datbase

// confirm the details of the listing before proceeding

// things to do 
// 1. add the image locally 
// 2. add the image onto the firestore
// 3. link the current user logged in with that of the new listing doc (done)
// 4. update the listing collection (done)

// 5. think of how to implement size guide 
// 6. think of implementing what sizes are available (done)

// after we add the listing it should bring me to a refreshed page 
// this page would show the current listings that the users has 


// need to make the sizing guide the textfield be disabled once 

export default function Sell_addListing() {
    const [listingTitle, setListingTitle] = useState("")
    const [listingPrice, setListingPrice] = useState("")
    const [productDescription, setProductDescription] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sizingGuide, setSizingGuide] = useState([]);
    const [cSizingGuide, setCSizingGuide] = useState([]);

    const [isSizeGuideConfirmed, setIsSizeGuideConfirmed] = useState(false);
    const [isSizingGuideDisabled, setIsSizingGuideDisabled] = useState(false);


    const preBuiltSizes = ["Chest Width", 'Shoulder Width', "Chest Length"]

    const handleSizingGuide = (sizingGuide) => {
        // const filteredSizingGuide = sizingGuide.reduce((acc, obj) => {
        //   const existingEntry = acc.find(
        //     (entry) =>
        //       entry.dimension === obj.dimension &&
        //       entry.inputMeasurementArr.some(
        //         (existingObj) => existingObj.size === obj.inputMeasurementArr[0].size
        //       )
        //   );
      
        //   if (!existingEntry) {
        //     acc.push(obj);
        //   }
      
        //   return acc;
        // }, []);
      
        setSizingGuide(sizingGuide);
    };

    const confirmSizeGuide = (sizingGuide) => {
        setCSizingGuide(sizingGuide)
    }
    
    const handleConfirmSizeGuide = () => {
    confirmSizeGuide(sizingGuide);
    setIsSizeGuideConfirmed(true);
    // setIsSizingGuideDisabled(true);
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

            <div style = {{display: "flex", flexDirection: 'row'}}> 
                <div style = {{flex: 1, marginLeft: "10%"}}>
                    <div style = {{fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                    Step 1: Fill in the Listing Details
                    </div>

                    <InputLabel htmlFor = "listingTitle"> Product Name </InputLabel>
                    <TextField id = "listingTitle"
                    variant = "outlined"
                    value = {listingTitle}
                    onChange = {listingTitleHandler}
                    required
                    />

                    <InputLabel htmlFor = "listingPrice"> Product Price </InputLabel>
                    <TextField id = "listingPrice"
                    variant = "outlined"
                    value = {listingPrice}
                    onChange = {listingPriceHandler}
                    required
                    />

                    <InputLabel htmlFor = "productDescription"> Product Description </InputLabel>
                    <TextField id = "productDescription"
                    variant = "outlined"
                    value = {productDescription}
                    onChange = {productDescriptionHandler}
                    required
                    />

                    <div>
                    Select Sizes
                    </div>
                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>
                    
                </div>
                {selectedSizes.length != 0 ?
                    <div style={{flex: 1}}>
                        Configure Sizing Guide 
                        <SizingGuide disabled={isSizeGuideConfirmed} dimensions = {preBuiltSizes} callback = {handleSizingGuide} selectedSizes = {selectedSizes}/>

                        <Button sx = {{color: "black", borderColor: "black"}} disabled= {isSizeGuideConfirmed} variant = "outlined" onClick = {handleConfirmSizeGuide}> Confirm Size Guide </Button>
                    </div> : <div style = {{flex: 1}}> </div>
                }
            </div>

            <div style = {{marginTop: "3%" ,position: 'relative', left: "42%"}}>
            <TransitionModal navigation = {navigationHandler}/>
            </div>

            
        </div>
    )
}
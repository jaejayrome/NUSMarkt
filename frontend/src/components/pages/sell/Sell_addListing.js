
import {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, InputLabel, TextField, FormControl, Select, MenuItem } from '@mui/material';
import Navbar from '../../compiledData/Navbar.js';
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';
import {auth} from '../../../config/firebase.js'
import SizingGuide from '../../mini_components/SizingGuide.js';
import TransitionModal from '../../mini_components/TransitionModal.js';
import {query, collection, where, getDocs, updateDoc} from "@firebase/firestore"
import { ref, getStorage, uploadBytes } from 'firebase/storage';
import db from "../../../config/firebase.js"

// this component is for the user to add any listings up to sell

// need to think of what else we can skip so we need to ensure that the image is being uploaded in accordance ot it's listing title also 

export default function Sell_addListing() {
    const [listingTitle, setListingTitle] = useState("")
    const [listingPrice, setListingPrice] = useState("")
    const [productDescription, setProductDescription] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sizingGuide, setSizingGuide] = useState([]);
    const [cSizingGuide, setCSizingGuide] = useState([]);
    const [bankAccountNumber, setBankAccountNumber] = useState("")
    const [bank, setBank] = useState("");
    const [bankDetailsUploaded, setBankDetailsUploaded] = useState(false)
    const [isSizeGuideConfirmed, setIsSizeGuideConfirmed] = useState(false);

    const location = useLocation()
    const storage = getStorage(); 

    const uploadImageToStorage = async (base64Data, fileName) => {
        try {
          const decodedData = atob(base64Data);
          const arrayBuffer = new ArrayBuffer(decodedData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
      
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
      
          const blob = new Blob([uint8Array], { type: 'image/jpeg' });
      
          const storagePath = `images/${fileName}.jpg`;
          const fileRef = ref(storage, storagePath);
          await uploadBytes(fileRef, blob);
        } catch (error) {
          console.log(error);
        }
      };



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

    const bankAccountNumberHandler = (event) => {
        setBankAccountNumber(event.target.value)
    }

    const handleBankChange = (event) => {
        setBank(event.target.value);
    };

    const handleSetBankUpload = () => {
        setBankDetailsUploaded(true)
    }
    
    // retrieves the currentUser username 
    const listedBy = auth.currentUser.displayName;
    const userID = auth.currentUser.uid;

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



    // check this part again
    const navigationHandler = () => {

        
        const updateDB = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
            await updateDoc(user.ref, {bankAccount: {
                bankAccountNumber: bankAccountNumber, 
                bank: bank
            }});
        })
        }
        updateDB()

        const checkPreOrder = location.state?.json64;

        if (checkPreOrder != null) {
            uploadImageToStorage(checkPreOrder, newListing.listingTitle);
            navigate('STEP3', { state: { ...newListing, json64: checkPreOrder } });
        } else {
            navigate('STEP2', { state: newListing });
        }
    }


    useEffect(() => {
        const receiveDB = async () => {
            const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (user) => {
            if (user.data().bankAccount != null) {
                handleSetBankUpload();
            }
        })
        }
        receiveDB()
    }, [])
    
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

            {bankDetailsUploaded ? <div> </div> : <div style={{marginTop: "5%", flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'left', marginLeft: "10%"}}>
            {/* <InputLabel htmlFor = "bankAccountNumber"> Bank Account Number </InputLabel> */}
                <TextField id = "bankAccountNumber"
                variant = "outlined"
                label = "Bank Account Number"
                value = {bankAccountNumber}
                onChange = {bankAccountNumberHandler}
                sx = {{width: 500, marginRight: "3%"}}
                required
                />
            
            <FormControl sx={{ }}>
            <Select
            labelId="quantity-label"
            id="quantity-select"
            value={bank}
            onChange={handleBankChange}
            >
            <MenuItem value={'POSB/DBS'}>POSB/DBS</MenuItem>
            <MenuItem value={'OCBC'}>OCBC</MenuItem>
            <MenuItem value={'UOB'}>UOB</MenuItem>
        </Select>
        </FormControl>


        </div>}
            
           

            <div style = {{marginTop: "3%" ,position: 'relative', left: "42%"}}>
            <TransitionModal navigation = {navigationHandler}/>
            </div>

            
        </div>
    )
}
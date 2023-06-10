import { collection, addDoc } from '@firebase/firestore'
import {db, auth} from '../../../config/firebase.js'
import {useState} from 'react'
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { Box, Button, InputLabel, TextField } from '@mui/material';
import Navbar from '../../compiledData/Navbar.js';
import SizeButtonGroup from '../../mini_components/SizeButtonGroup.js';

// this component is for the user to add any listings up to sell
// need to create a modal that lets u upload images to the datbase


// things to do 
// 1. add the image locally 
// 2. add the image onto the firestore
// 3. link the current user logged in with that of the new listing doc
// 4. update the listing collection

// 5. think of how to implement size guide 
// 6. think of implementing what sizes are available

// use of toggle switch
// XXS XS S M L XL XXL
export default function Sell_addListing() {
    const [listingTitle, setListingTitle] = useState("")
    const [listingPrice, setListingPrice] = useState("")
    const [productDescription, setProductDescription] = useState('')
    const [selectedSizes, setSelectedSizes] = useState([]);

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

    // haven't implement the size guide and the quantity
    // this should update the 'users' collection
    // const listedBy = auth.currentUser.displayName;

    // creating a reference to the storage
    const storage = getStorage()

    // creating a filePathReference to the database 
    const listingImagesRef = ref(storage, `images/${listingTitle}.jpg`);

    // upload image file locally
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    // // uploading of the image to firestore
    // uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   });


    // new Listing object
    const newListing = {
        listingTitle: listingTitle, 
        listingPrice: listingPrice, 
        productDescription: productDescription, 
        sizesAvailable: selectedSizes, 
        filePath: listingTitle,
    }

    // onClickHandler when user adds listing 
    const addListingHandler = async () => {
        // need to add in the portion where it would upload the image

        const listingDocumentRef = collection(db, "listing")
        await addDoc(listingDocumentRef, newListing)
    }

    return (
        <div>
            <Navbar />
            <div style = {{display: "flex"}}>
                <div style = {{flex: 1, marginLeft: "2%"}}> 
                    <Box  sx = {{display: "flex",
                                flexDirection: "column", justifyContent: 'center', 
                                alignItems: 'center',border: '1px dashed black',
                                backgroundColor: "#E5E4E2", width: "90%", height: "100%" , 
                                '&:hover': {
                                backgroundColor: '#D3D3D3',
                                opacity: [0.9, 0.8, 0.7]}
                    }}>
                    <Button variant = "outlined" sx = {{fontWeight: 'bold', borderColor: 'black', color: 'black', textTransform: "none", '&:hover': {
                                backgroundColor: '#D3D3D3',
                                borderColor: 'black'
                                }}}> Upload Image Here </Button>
                    </Box>
                </div>

                <div style = {{flex: 1.5}}>
                    <div style = {{fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                    Listing Details
                    </div>

                    <InputLabel htmlFor = "listingTitle"> Product Name </InputLabel>
                    <TextField id = "listingTitle"
                    variant = "outlined"
                    value = {listingTitle}
                    onChange = {listingTitleHandler}
                    />

                    <InputLabel htmlFor = "listingPrice"> Product Price </InputLabel>
                    <TextField id = "listingPrice"
                    variant = "outlined"
                    value = {listingPrice}
                    onChange = {listingPriceHandler}
                    />

                    <InputLabel htmlFor = "productDescription"> Product Description </InputLabel>
                    <TextField id = "productDescription"
                    variant = "outlined"
                    value = {productDescription}
                    onChange = {productDescriptionHandler}
                    />

                    <div>
                    Select Sizes
                    </div>
                    <SizeButtonGroup selectedSizes={selectedSizes}
                    onSelectedSizes={handleSelectedSizes}/>
                    Selected Sizes: {selectedSizes}
                    <div>
                    <Button onClick = {addListingHandler}> Add Listing </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { collection, addDoc } from '@firebase/firestore'
import {db} from '../../../config/firebase.js'
import Navbar from '../../compiledData/Navbar.js';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Sell_addListing3() {

    const location = useLocation()

    const newListing = {
        listingTitle: location.state.listingTitle, 
        listingPrice: location.state.listingPrice, 
        productDescription: location.state.productDescription, 
        sizesAvailable: location.state.selectedSizes, 
        filePath: location.state.listingTitle,
        listedBy: location.state.listedBy
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

            <div style = {{flex: 1, fontFamily: 'serif', fontWeight: 'bolder', fontSize: "30px", marginBottom: "5%"}}> 
                Step 3: Review and Confirm
            </div>

            <div>
                <Button onClick={addListingHandler}>
                    Confirm
                </Button>
            </div> 
            
        </div>
    )


}
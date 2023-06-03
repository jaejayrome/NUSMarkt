import homePageIcon from '../../images/logo.jpg';
import Navbar from '../compiledData/Navbar.js';
import {useParams} from 'react-router-dom';
import ListingReader from '../../config/ListingReader';

export default function ListingPage() {

    const {listingID} = useParams();

    // listing here contains the listing without the image
    // haven't put in the product description yet because CRUD operations for 
    // user upload haven't been done yet 
    return (
        <div>
            <img src = {homePageIcon} alt = "NUS MARKT" style = {{
                position: "fixed",
                left: "35px",
                top: "-35px",
                maxWidth: "25%",
                maxHeight: "25%",
                cursor: "pointer"
            }}/>

            <Navbar />
            <ListingReader listingID={listingID}/>



        </div>
    )
}

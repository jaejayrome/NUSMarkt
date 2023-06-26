import homePageIcon from '../../images/logo.jpg';
import Navbar from '../compiledData/Navbar.js';
import {useParams} from 'react-router-dom';
import ListingReader from '../../config/ListingReader';

export default function ListingPage() {

    const {listingID} = useParams();

    return (
        <div>
            <Navbar />
            <ListingReader listingID={listingID}/>
        </div>
    )
}

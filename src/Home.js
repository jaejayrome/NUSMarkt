import './Home.css';
import Navbar from './components/compiledData/Navbar.js'
import MasonryImageList from './components/compiledData/MasonryImageList';
import {useState, useEffect} from 'react';
import {db} from './config/firebase.js';
import {collection, getDocs} from "@firebase/firestore";

// ListingContext is a global context that wraps the state listing
// ListingContext.Provider provides this context to it's wrapper tags
// am unsure how do i pass the Listing over tothe ListingPage
function Home() {
    // listings: state that's an array holding listing instances
    const [listings, setListing] = useState([]);

    // pointer to the "listing collection" in the NOSQL db
    const listingCollectionsRef = collection(db, "listing")
    
    useEffect(() => {
        // getListings would read the array of listing instance
        const getListings = async () => {
            const data = await getDocs(listingCollectionsRef)
            setListing(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getListings();
    }, [])
    
    return (
    
    <div>
        <Navbar />
        <div className = 'masonry'> 
        <MasonryImageList listings = {listings}/>
        </div>

    </div>
    
    );
}

export default Home;






























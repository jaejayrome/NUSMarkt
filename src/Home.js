import './Home.css';
import Navbar from './components/compiledData/Navbar.js'
import MasonryImageList from './components/compiledData/MasonryImageList';
import {useState, useEffect} from 'react';
import db from './config/firebase.js';
import {collection, getDocs} from "@firebase/firestore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {withErrorBoundary} from "./ErrorBoundary,js"

function Home() {
    // listings: state that's an array holding listing instances
    const [listings, setListing] = useState([]);

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
        <MasonryImageList datatestid = "masonry-image-list" listings = {listings}/>
        </div>
        <ToastContainer /> 
    </div>
    
    );
}

// const Home = withErrorBoundary(Home);
export default Home






























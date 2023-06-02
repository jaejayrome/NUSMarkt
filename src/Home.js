import './Home.css';
import Navbar from './components/compiledData/Navbar.js'
import MasonryImageList from './components/compiledData/MasonryImageList';
import {ListingContext} from "./helper/Context.js";
import {useState, useEffect} from 'react';
import {db} from './config/firebase.js';
import {collection, getDocs} from "@firebase/firestore";

// ListingContext is a global context that wraps the state listing
// ListingContext.Provider provides this context to it's wrapper tags
function Home() {
    // listings: state that's an array holding listing instances
    const [listings, setListing] = useState([]);

    // pointer to the "listing collection" in the NOSQL db
    const listingCollectionsRef = collection(db, "testListing")

    useEffect(() => {
        // getListings would read the array of listing instance
        const getListings = async () => {
            const data = await getDocs(listingCollectionsRef)
            setListing(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getListings();
    }, [])
    
    return (
    // <ListingContext.Provider value = {}>
    <div>
        <Navbar />
        <div className = 'masonry'> 
        <MasonryImageList listings = {listings}/>
        </div>

    </div>
    // </ListingContext.Provider>
    );
}

export default Home;

































// const imagesList = [
        
    //     {id: 1, src: "/images/Pictures/capt_capt10_front.jpg", title: "capt_dragon_a_front"},
    //     {id: 2, src: "/images/Pictures/capt_capt10_back.jpg", title: "capt_dragon_a_back"}, 
    //     {id: 3, src: "/images/Pictures/capt_captcoffee_front.jpeg", title: "capt_dragon_a_back"},
    //     {id: 4, src: "/images/Pictures/capt_captcoffee_back.jpg", title: "capt_dragon_a_back"},
    //     {id: 5, src: "/images/Pictures/capt_dragon_designA_front.png", title: "capt_dragon_a_back"},
    //     {id: 6, src: "/images/Pictures/capt_dragon_designA_back.png", title: "capt_dragon_a_back"},
    //     {id: 7, src: "/images/Pictures/capt_dragon_designB_front.png", title: "capt_dragon_a_back"},
    //     {id: 8, src: "/images/Pictures/capt_dragon_designB_back.png", title: "capt_dragon_a_back"},
    //     {id: 9, src: "/images/Pictures/capt_dragon_designC_front.png", title: "capt_dragon_a_back"},
    //     {id: 10, src: "/images/Pictures/capt_dragon_designC_back.png", title: "capt_dragon_a_back"},
    //     {id: 11, src: "/images/Pictures/capt_garu_ducksonduty_front.png", title: "capt_dragon_a_back"},
    //     {id: 12, src: "/images/Pictures/capt_garu_ducksonduty_back.png", title: "capt_dragon_a_back"},
    //     {id: 13, src: "/images/Pictures/capt_garu_looktothelight_front.png", title: "capt_dragon_a_back"},
    //     {id: 14, src: "/images/Pictures/capt_garu_looktothelight_back.png", title: "capt_dragon_a_back"},
    //     {id: 15, src: "/images/Pictures/capt_roc_1_front.png", title: "capt_dragon_a_back"}, 
    //     {id: 16, src: "/images/Pictures/capt_roc_1_back.png", title: "capt_dragon_a_back"},
    //     {id: 17, src: "/images/Pictures/interrc_r4dxcis_front.jpg", title: "capt_dragon_a_back"},
    //     {id: 18, src: "/images/Pictures/interrc_r4dxcis_back.jpg", title: "capt_dragon_a_back"},
    //     {id: 19, src: "/images/Pictures/interrc_rchn_boo_front.png", title: "capt_dragon_a_back"},
    //     {id: 20, src: "/images/Pictures/interrc_rchn_boo_back.png", title: "capt_dragon_a_back"},
    //     {id: 21, src: "/images/Pictures/interrc_rchn_ghosted_front.png", title: "capt_dragon_a_back"},
    //     {id: 22, src: "/images/Pictures/interrc_rchn_ghosted_back.png", title: "capt_dragon_a_back"},
    //     {id: 23, src: "/images/Pictures/projkura_front.jpg", title: "capt_dragon_a_back"},
    //     {id: 24, src: "/images/Pictures/projkura_back.jpg", title: "capt_dragon_a_back"},
    //     {id: 25, src: "/images/Pictures/rc4_flag_a_charcoal_front.png", title: "capt_dragon_a_back"}, 
    //     {id: 26, src: "/images/Pictures/rc4_flag_a_charcoal_back.png", title: "capt_dragon_a_back"},
    //     {id: 27, src: "/images/Pictures/rc4_flag_b_beige_front.png", title: "capt_dragon_a_back"},
    //     {id: 28, src: "/images/Pictures/rc4_flag_b_beige_back.png", title: "capt_dragon_a_back"},
    //     {id: 29, src: "/images/Pictures/rc4_flag_b_blue_front.png", title: "capt_dragon_a_back"},
    //     {id: 30, src: "/images/Pictures/rc4_flag_b_blue_back.png", title: "capt_dragon_a_back"},
    //     {id: 31, src: "/images/Pictures/rc4_flag_c_front.png", title: "capt_dragon_a_back"},
    //     {id: 32, src: "/images/Pictures/rc4_flag_c_back.png", title: "capt_dragon_a_back"}
    // ]
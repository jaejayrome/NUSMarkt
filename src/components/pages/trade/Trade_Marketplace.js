import Navbar from "../../compiledData/Navbar";
import { useEffect, useState } from "react";
import db from "../../../config/firebase.js"
import { collection, getDocs } from "@firebase/firestore";

export default function Trade_Marketplace() {
    const [listings, setListing] = useState([]);
    const tradeListingCollectionsRef = collection(db, "tradeListing")

    useEffect(() => {
        // getListings would read the array of listing instance
        const getListings = async () => {
            const data = await getDocs(tradeListingCollectionsRef)
            setListing(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getListings();
    }, [])
    
    return (
        <div> 
            <Navbar />

            {listings.length != 0 && (
                <div> 
                    {listings.map((listing) => 
                    <div>
                     {listing.listingTitle}
                     </div>
                    )
                    
                    }
                </div>
            )}

        </div>
    )

}
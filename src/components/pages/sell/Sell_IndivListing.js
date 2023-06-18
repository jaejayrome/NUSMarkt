import { useEffect, useState } from "react";
import { getDoc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import ImageHandler from "../../../config/ImageHandler.js";

export default function Sell_IndivListing(props) {

    const [listing, setListing] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            console.log(props.itemRef)
            try {
            const listing = await getDoc(props.itemRef)
            if (listing.exists()){
                setListing({...listing.data()})
                console.log(listing.data().listingTitle)
            } else {
                alert ('listing does not exist')
            }
            
            } catch(error) {
                console.log(error)
            }
        }

        fetchListing()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user !== null);
          });
      
      
        return () => unsubscribe();
    }, [])

    return (
        <div> 
            {listing && (
                <div> 
                Listing Title: 
                {listing.listingTitle}

                <div> 
                Listing Price: 
                {listing.listingPrice}
                </div>
                </div>
            )}
        </div>
    )
}
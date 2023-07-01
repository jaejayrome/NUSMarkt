import Navbar from "../../compiledData/Navbar";
import { useEffect, useState } from "react";
import db from "../../../config/firebase.js"
import { collection, getDocs } from "@firebase/firestore";
import Trade_IndivListing from "./Trade_IndivListing.js"
import { Box } from "@mui/material"
import {Divider} from '@mui/material';

export default function Trade_Marketplace() {
    const [listings, setListing] = useState([]);
    const tradeListingCollectionsRef = collection(db, "tradeListing")

    useEffect(() => {
        // getListings would read the array of listing instance
        const getListings = async () => {
            const data = await getDocs(tradeListingCollectionsRef)
            setListing(data.docs.map((doc) => ({...doc.data(), id: doc.id, reference: doc.ref})))
        }
        getListings();
    }, [])
    
    return (
        <div>
            <Navbar />

            <div style={{flex: 1, fontSize: "20px", textAlign: "center"}}>
            <div style={{ fontWeight: "bolder", fontSize: "40px", marginBottom: "5%" }}>
                Welcome to the marketplace
                <div style={{ fontWeight: "normal", fontSize: "25px" }}>
                view trade listings made by NUS peers within the NUSMarkt community
                </div>
            </div>
            </div>
            {listings.length != 0 && (
                <div style={{ height: "60vh", overflow: "auto" }}> 
                <Box sx = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}> 
                    {listings.map((listing) => 
                    <Trade_IndivListing listing = {listing}/>
                    )
                    
                    }
                </Box>
                </div>
            )}

        </div>
    )

}
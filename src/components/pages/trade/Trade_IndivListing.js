import { useEffect, useState} from "react"
import TradeListingDrawer from "../../mini_components/TradeListingDrawer"
import TradeRequestDrawer from "../../mini_components/TradeRequestDrawer"
import { auth } from "../../../config/firebase"

export default function Trade_IndivListing(props) {

    // on click this would update the trade listing with a reference to the trade requests
    const listing = props.listing
    const [isSame, setSame] = useState(false)

    useEffect(() => {
        if (listing.listedBy == auth.currentUser.displayName) {
            setSame(true)
        }
    }, [auth.currentUser.displayName])
    return (
        <div style = {{width: "80%",flex: 1, border: "1px solid black", padding: "2%", marginBottom: "2%"}}>
            <div style = {{fontSize: "20px", fontWeight: "bold"}}>
            {listing.listingTitle}
            </div>

            <div style={{fontSize: "20px"}}> 
                Listed By: 
                {listing.listedBy}
                <TradeListingDrawer listedBy = {listing.listedBy} listingDescription = {listing.listingDescription} selectedSizes = {listing.selectedSizes}/>
            </div>
            
            <TradeRequestDrawer disabled = {isSame} originalListingReference = {listing.reference}/>
            
        </div>
    )
}
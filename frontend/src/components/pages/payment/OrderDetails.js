import { useEffect, useState } from "react"
import db from "../../../config/firebase.js"
import { getDoc, query, collection, where, getDocs} from 'firebase/firestore';
import { Card, CardContent, CardHeader } from "@mui/material";
import ImageHandler from  "../../../config/ImageHandler.js"
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BadgeIcon from '@mui/icons-material/Badge';

export default function OrderDetails(props) {
    const [item, setItem] = useState(null)
    const cartItem = props.cartItem
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        const retrieveListing = async () => {
            try {
            const listing  = await getDoc(cartItem.listingRef)
            if (listing.exists()){
                setItem({...listing.data()})
            }
            } catch(error) {
                console.log(error)
            }
        }
        
        
        retrieveListing()
        
    }, [])


    useEffect(()=> {

        const retrieveListingOwner = async () => {
            try {
                console.log('retreive read called')
                const listingOwnerUserName = item.listedBy
                const q = query(collection(db, "users"), where("userName", "==", listingOwnerUserName));
                const querySnapshot = await getDocs(q);
                if (querySnapshot){
                    querySnapshot.forEach((document) => {
                        const listings = document.data().Sell_ListingArr
            
                        listings.forEach((listing) => {
                            if (listing.path === cartItem.listingRef.path) {
                                setOwner({...document.data()})
                            }
                        })
                        
                    })
                }

                
            } catch (error) {
                console.log(error)
                console.log("Listing Not Found")
            }
        }

        retrieveListingOwner()

    }, [item])


    return (
        <Card elevation = {5} sx = {{width: "100%" , height: "100%"}}>

            <CardHeader title= {item && item.listingTitle} subheader = {item && item.listedBy} /> 

            <CardContent sx = {{display: "flex", flexDirection: "column"}}>  

            <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: 'center'}}>
            {item && (<ImageHandler alt =  {item.listingTitle} filePath = {item.listingTitle} width = '600px' height = '600px'/>)}
            </div>

            <div style={{flex: 1 , display: "flex", flexDirection: "row"}}> 

            <div style={{flex: 1}}> 
            <div> 
                Order Details
            </div>

            <div> 
                <AttachMoneyIcon />
                {/* <span style={{position: "absolute", top: "55%", marginLeft: '5%'}}> */}
                {item && item.listingPrice}
                {/* </span> */}
            </div>

            <div> 
                <ConfirmationNumberIcon /> 
                {/* <span style={{position: "absolute", top: "58%", marginLeft: '5%'}}> */}
                {cartItem.quantity}
                {/* </span> */}
            </div>

            <div> 
                    <CheckroomIcon />
                    {/* <span style={{position: "absolute", top: "61.5%",marginLeft: '5%'}}> */}
                    {cartItem.size}
                    {/* </span> */}
            </div>

            </div>

           
            <div style = {{flex: 1}}> 

            <div> 
                Seller Details
            </div>

                <div> 
                <BadgeIcon />
                {owner && owner.firstName}
                {owner && owner.lastName}
                </div>

                <div> 
                <PhoneIcon />
                {owner && owner.phoneNumber}
                </div>
                
                <div> 
                <TelegramIcon />
                {owner && owner.telegramHandle}
                </div>
            </div>

            </div>

            
          
            </CardContent>
        </Card>
    )
}
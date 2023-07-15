import { useEffect, useState } from "react"
import db, { auth } from "../../../config/firebase.js"
import { getDoc, query, collection, where, getDocs, addDoc, updateDoc, arrayUnion} from 'firebase/firestore';
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
    // const [prevState, setPrevState] = useState(0.00)

    // useEffect here should update the withdraw amount

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
            // update the amount mof money that the listing owner earns here 
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
                                // this one double checked already
                                setOwner({...document.data()})
                                // setPrevState(...document.data().withdrawAmount)
                                const subtotal = item.listingPrice * cartItem.quantity
                                updateDoc(document.ref, {withdrawAmount: document.data().withdrawAmount + subtotal})
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
        // props.callback(sendBack)

    }, [item])



    useEffect(() => {
        
        const uploadListing = async () => {

            try {
            if (item && owner) {
            const listingPrice = item.listingPrice
            const listingTitle = item.listingTitle
            const listedBy = item.listedBy
            const firstName = owner.firstName
            const lastName = owner.lastName
            const telegramHandle = owner.telegramHandle
            const phoneNumber = owner.phoneNumber

            if (listedBy && listingPrice && listingTitle && firstName && lastName && telegramHandle && phoneNumber) {
                const sendHere = {
                    listingPrice: listingPrice,
                    listingTitle: listingTitle,
                    listedBy: listedBy,
                    firstName: firstName, 
                    lastName: lastName, 
                    telegramHandle: telegramHandle, 
                    phoneNumber: phoneNumber
                }

                const order = {...sendHere, qty: cartItem.quantity, size: cartItem.size}
                await addDoc(collection(db, "orders"), order).then(async (orderDoc) => {

                    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
                    const snapshot = await getDocs(q)
                    if (snapshot) {
                        snapshot.forEach((user) => {
                            updateDoc(user.ref, {"order_arr" : arrayUnion(orderDoc)})
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })

                // need to add a reference to this 
                

            }

            }

        } catch (error) {
            console.log(error)
        }
        
    }

    uploadListing()


    }, [owner])



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
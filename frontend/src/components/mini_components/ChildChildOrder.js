import { useEffect, useState } from "react"
import { getDoc, query, where, collection, getDocs } from "@firebase/firestore"
import db from "../../config/firebase.js"
import ImageHandler from "../../config/ImageHandler.js"


export default function ChildChildOrder (props) {

    const [entry, setEntry] = useState(null)
    const [owner, setOwner] = useState(null)
    useEffect(() => {

        const fetchListing = async () => {
            try {
                await getDoc(props.listingRef).then((promise) => {
                    setEntry({...promise.data(), quantity: props.quantity, size: props.size})
                })
                console.log(entry.listingTitle)
                console.log(entry.size)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListing()
    }, [])


    useEffect(()=> {

        const retrieveListingOwner = async () => {
            // update the amount mof money that the listing owner earns here 
            try {
                const listingOwnerUserName = entry.listedBy
                console.log(listingOwnerUserName)
                const q = query(collection(db, "users"), where("userName", "==", listingOwnerUserName));
                const querySnapshot = await getDocs(q);
                if (querySnapshot){
                    querySnapshot.forEach((document) => {
                        const listings = document.data().Sell_ListingArr
            
                        listings.forEach((listing) => {
                            if (listing.path === props.listingRef.path) {
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

    }, [entry])
    return (
        <div style={{marginRight: "5%", display: "flex", justifyContent: 'center', alignItems: 'center'}}> 
            
            <div style={{flex: 1, display: "flex", flexDirection: "row"}}> 

                <div style={{flex: 1, alignSelf: 'center', paddingLeft: "5%"}}>
                {entry && entry.listingTitle && <ImageHandler width = "300px" height = "300px"filePath = {entry && entry.listingTitle} alt = {entry && entry.listingTitle} />}
                </div>

                <div style={{flex: 1, display: "flex", flexDirection: 'column'}}> 
                    <div style={{flex: 1, alignSelf: "center"}}> 

                    <div style = {{fontWeight: 'bold', fontSize: "20px"}}> 
                    {entry && entry.listingTitle}
                    </div>
                    <div style = {{textDecoration: 'italic'}}> 
                    by {entry && entry.listedBy}
                    </div>
                    </div>

                    <div style={{flex: 1, alignSelf: "center"}}> 
                    Size: {entry && entry.size}
                    </div>
                </div> 
            </div>

         

            <div style={{flex: 1, display: 'flex'}}> 

                <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}> 

                <div style={{flex: 1, alignSelf: "center"}}> 
                Quantity: 
                </div>

                <div style={{flex: 1,  alignSelf: "center"}}> 
                x{entry && entry.quantity}
                </div>
              
                </div>


                <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}> 

                    <div style={{flex: 1, alignSelf: "center"}}> 
                    Listing Price:
                    </div>

                    <div style={{flex: 1,  alignSelf: "center"}}> 
                    SGD {entry && (entry.listingPrice * 1).toFixed(2)}
                </div>

                </div>



                <div style={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center'}}> 

                    <div style={{flex: 1, alignSelf: "center"}}> 
                    Amount Paid:
                    </div>

                    <div style={{flex: 1,  alignSelf: "center"}}> 
                    SGD {entry && entry.quantity && entry.listingPrice && (entry.quantity *entry.listingPrice).toFixed(2)}
                    </div>

                </div>

            </div>
             
        </div>
    
    )
}
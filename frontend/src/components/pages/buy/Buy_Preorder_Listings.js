import Navbar from "../../compiledData/Navbar"
import { useEffect } from "react"
import db from "../../../config/firebase.js"
import {where, collection, query, getDocs} from "firebase/firestore"
import {auth} from "../../../config/firebase.js"
import PreOrderShowListing from "../../mini_components/PreOrderShowListing"
import { useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Box, ImageList, ImageListItem, CardContent } from "@mui/material"



// this would show the pre-order listings that a user has pledged to

export default function Buy_Preorder_Listings() {

    const [preOrderArr, setPreOrderArr] = useState([])
    const [uid, setUid] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setUid(user.uid)
          }
        });
        console.log("first use effect")
      }, []);


    useEffect((() => {
        // pull pre order lisitngs according to the listing array
        if (uid) {
        const getListings = async () => {
           
            try {
            const q = query(collection(db, "users"), where("uid", "==", uid))
            const snapShot = await getDocs(q)

            snapShot.forEach((user) => {
                // there's only one user 
                // check whether the id matches that of the path
                const data = user.data()
                setPreOrderArr([...data.preorder_arr])
                console.log ("inside")
                // console.log(preOrderArr.length)
            })

            } catch(error) {
                console.log(error)
            } 
        }
        getListings()
    }

        
    })
    ,[uid])

    return (
        <div> 
            <Navbar />

            <div style = {{fontSize: "30px"}}> 
                Your Pre-Order Listings
            </div>

            <Box  sx={{  width: "100%", height: "500px", overflow: "auto"  }}> 
            <ImageList cols = {3} gap = {100} sx = {{marginLeft: "2%"}}>
                    
                {preOrderArr.length > 0 &&
                preOrderArr.map((listing) => (
                <PreOrderShowListing listingRef = {listing}/>
                ))}
        
            </ImageList>
            </Box>

        </div>
    )
}
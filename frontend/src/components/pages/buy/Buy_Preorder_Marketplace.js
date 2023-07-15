import Navbar from "../../compiledData/Navbar";
import { useEffect, useState } from "react";
import db from "../../../config/firebase.js";
import { auth } from "../../../config/firebase.js";
import { collection, getDocs } from "@firebase/firestore";
import { Box, CardContent, ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";

// this component would display all the preorders that are currently available

export default function Buy_Preorder_Marketplace() {
  const [listingArr, setListing] = useState([]);
  const collectionRef = collection(db, "preOrders");

  // retrieve the pre-order listings from the db
  useEffect(() => {
    const getListings = async () => {
      const responses = await getDocs(collectionRef);
      if (responses.empty) {
        console.log("true");
      }
      setListing(
        responses.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getListings();
  }, []);

  return (
    <div>
      <Navbar />


       <Box  sx={{  width: "100%", height: "500px", overflow: "auto"  }}> 
       <ImageList cols = {3} gap = {100}>
            
        {listingArr.length > 0 &&
        listingArr.map((listing) => (
          <ImageListItem rows = {1} cols={1} key={listing.id}>

          {listing.json64 &&  
          <Link to = {{pathname: listing.id, state: {listing}}}> 
          <img  height = "400px" width = "400px" src={`data:image/jpeg;base64, ${listing.json64}`}  alt = "not found"/>
          </Link>
          }  
         
          <CardContent sx={{ overflowY: 'hidden' }}> 

          <div style = {{textAlign: "left"}}>
          {listing.listingTitle}
          </div>
          <div style = {{textAlign: 'right'}}> 
          ${listing.listingPrice}
          </div>
          </CardContent>
          </ImageListItem>
        ))}
   
       </ImageList>
       </Box>
    </div>
  );
}

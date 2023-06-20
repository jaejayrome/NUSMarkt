import Navbar from "../../compiledData/Navbar";
import { useState, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import db from "../../../config/firebase.js";
import { styled } from '@mui/material/styles';
import {collection, query, getDocs, where} from "firebase/firestore";
import Sell_IndivListing from "./Sell_IndivListing";
import {Box, ImageListItem, ImageList} from '@mui/material';

// bug the Sell Indiv listing doesn't render when refreshed 
export default function Sell_Listings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [arr, setArr] = useState([]);
  const userID = auth.currentUser?.uid;

  const fetchUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
   
        querySnapshot.forEach((user) => {
            const data = user.data().Sell_ListingArr
            setArr(data)
        })

  }

  const ScrollableCardContainer = styled('div')`
        max-height: 500px; 
        overflow-y: auto;`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user !== null);
    });

    if (auth.currentUser) {
      fetchUser();
    }

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar />


      <div style = {{fontSize: "30px", fontFamily: "monospace", marginLeft: "4%"}}> 
      Your Listings
      </div>

      <ScrollableCardContainer>
      <Box sx= {{flexGrow: 1}}> 
      <ImageList>
      {arr.map((item) => {
        console.log(item)
        return (
        <ImageListItem key = {item}>
        <Sell_IndivListing itemRef = {item}/>
        </ImageListItem> 
        )
      })}
     </ImageList> 
      </Box>
      </ScrollableCardContainer>
    </div>
  )
}

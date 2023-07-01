import Navbar from "../../compiledData/Navbar";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase.js";
import db from "../../../config/firebase.js";
import { styled } from '@mui/material/styles';
import { deleteDoc, arrayRemove, collection, getDoc, updateDoc, getDocs, query, where } from "@firebase/firestore";
import Sell_IndivListing from "./Sell_IndivListing";
import {Box, ImageListItem, ImageList, Divider} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function Sell_Listings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [arr, setArr] = useState([]);
  const userID = auth.currentUser?.uid;
  const BigIcon = styled(SentimentVeryDissatisfiedIcon)({
    fontSize: '5rem', // Adjust the size as per your requirement
  });

  const handleDeletion = () => {
    fetchUser();
  };

  const fetchUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((user) => {
      const data = user.data().Sell_ListingArr || [];
      setArr(data);
    });
  };

  const ScrollableCardContainer = styled('div')`
    max-height: 500px; 
    overflow-y: auto;
  `;

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
      <div style={{ fontSize: "30px", marginLeft: "4%" }}> 
        View Your Listings
      </div>

      {/* <Divider> </Divider> */}
      <ScrollableCardContainer>
        <Box sx={{ flexGrow: 1 }}> 
          <ImageList>
            {arr.length !== 0 && arr.map((item) => (
              <ImageListItem key={item}>
                <Sell_IndivListing onDelete={handleDeletion} itemRef={item} />
              </ImageListItem>
            ))}
          </ImageList> 
          {arr.length === 0 && (
            <div style={{marginTop: "10%",display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: "center"}}> 
              <BigIcon />
              <div style={{fontWeight: "bolder", fontSize: "30px"}}> 
                Nothing to Show
                <div style = {{fontWeight: "normal", fontSize: "20px"}}> 
                  You have not listed anything so far
                </div>
              </div>
            </div>
          )}
        </Box>
      </ScrollableCardContainer>
    </div>
  );
}

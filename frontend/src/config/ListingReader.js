// this component reads individuial listings from the DB
// this component aims to return everything that needs to be displayed within an individual listing

import { useEffect, useState, useCallback } from 'react';
import db from './firebase.js'
import { auth } from './firebase.js';
import { collection, query, where, getDoc, doc, getDocs, updateDoc, arrayUnion} from '@firebase/firestore';
import ImageHandler from './ImageHandler.js';
import "../stylesheets/Listing.css";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { styled } from '@mui/system';
import { Button,Box, Typography, TextField } from '@mui/material';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import SizingGuideTable from '../components/mini_components/SizingGuideTable.js';
import CartTransitionModal from '../components/mini_components/CartTransitionModal.js';
import Divider from '@mui/material/Divider';
import AddReviewDrawer from '../components/mini_components/AddReviewDrawer.js';
import ListingMessage from './ListingMessage.js';
import LockIcon from '@mui/icons-material/Lock';

// things learnt we cannot retrieve the data before rendering the component in case if it is null 
// create a transition modal that would allow the user to add to cart? 
// alternative is to create  an add button thtat would allow us to increment the quantity but when it is 0 we disable the button
export default function ListingReader({ listingID }) {
  const [listingData, setListingData] = useState(null);
  const [listingMessages, setListingMessages] = useState([])
  const [myListing, setMyOwnListing] = useState(false)
  const [uid, setUID] = useState(null)

  const listingRef = doc(db, 'listing', listingID)

  const ScrollableCardContainer = styled('div')`
  max-height: 500px; 
  overflow-y: auto;`;

  const LargeAccountCircleSharpIcon = styled(AccountCircleSharpIcon)`
  font-size: 60px;`;


  const StyledLockIcon = () => {
    return (
      <Box sx={{borderTop: "2px solid black", pt: "10%", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column"}}>
        <LockIcon sx={{ fontSize: '72px' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Feature Locked
        </Typography>
      </Box>
    );
  };

  const userID = auth.currentUser?.uid;

  const fetchListing = useCallback(async () => {
    try {
      const listingRef = doc(db, 'listing', listingID);
      const listingSnapshot = await getDoc(listingRef);
      if (listingSnapshot.exists()) {
        const data = listingSnapshot.data();
        setListingData({...data, uid: listingSnapshot.id});
      } else {
        console.log('listing does not exist');
      }
    } catch (error) {
      console.log('Error fetching listing:', error);
    }
  }, [listingID] )

  const checkUser = async (uid) => {
    try {
      const userDocRef = doc(collection(db, "users"), uid);
      const q = query(collection(db, "users"), where("uid", "==", uid))
      const userDocSnapshot = await getDocs(q)
  
     
        userDocSnapshot.forEach((user) => {
          const userData = user.data();
          console.log('call')
          const sellListingArr = userData.Sell_ListingArr || [];
          console.log(sellListingArr)
          sellListingArr.forEach((element) => {
            const listingPath = doc(db, "listing", listingID)
            if (element.path === listingPath.path) {
              console.log("true");
              setMyOwnListing(true);
            }
          });
        })
        
    } catch (error) {
      console.log(error);
    }
  };
  

  const fetchMessages = async () => {
    try {
      //loop through the listing
      const listingRef = doc(db, 'listing', listingID)
      const listingSnapshot = await getDoc(listingRef);
      if (listingSnapshot.exists()) {
        const listingMessages = listingSnapshot.data().messagesArr
        if (listingMessages.length > 0){
        setListingMessages(listingMessages)
        } else{
          console.log("no messages im this listing")
        }
      } else {
        // listing does not exist
        
      }
    } catch (error) {
      console.log('listing does not exists')
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchListing();
        fetchMessages();
        setUID(user.uid)
      }
    });

    return () => unsubscribe()
  }, []);
  
  useEffect(() => {
    if (uid) {
      checkUser(uid);
    }
  }, [uid]);
  


  

  return (
    <ScrollableCardContainer>
      {listingData && (
        <div> 
        <div className = 'listing-container'>

          <div className='imageHandler'> 
            <ImageHandler height = "600px" width = "600px" alt = {listingData.listingTitle} filePath= {listingData.filePath}/>
          </div>

          <div className='indiv_listing'>
            <div style = {{fontFamily: "monospace",  fontSize: "40px", marginBottom: "15px"}}> 
              {listingData.listingTitle}
            </div>
            <div style = {{fontFamily: "monospace", fontSize: "25px", marginBottom: "15px"}}>
            ${listingData.listingPrice}
            </div>
            <div style = {{fontFamily: "monospace", fontSize: "20px", marginBottom: "10%"}}> 
              {listingData.productDescription != null ? listingData.productDescription : "NA"}
            </div>

            <div style = {{display: "flex", marginBottom: "5%"}}>
              <div style= {{flex: "1"}}>
              <LargeAccountCircleSharpIcon  sx = {{marginRight: "3%"}}/>
              </div>

              <div style= {{flex: "4", fontSize: "15px", fontFamily: "monospace"}}>
                Listed By:
                <div style = {{fontSize: "18px"}}> 
                  {listingData.listedBy}
                </div>
              </div>

              <div style= {{flex: "4"}}> 
              </div>
              <CartTransitionModal selectedSizes = {listingData.sizesAvailable} uid = {userID} listingRef = {doc(collection(db, "listing"), listingID)}/>
            </div>

          <div style = {{fontFamily: 'monospace', fontSize: "20px", display: "flex"}}>
              <div style={{flex: 4}}>
              Unsure Of Your Sizing?
              </div>

              <div style={{flex: 6}}>
              {/* <Button variant = "outlined" size = "medium" startIcon = {<CheckroomRoundedIcon />} sx = {{borderColor: "black", backgroundColor: 'white', color: "black", textTransform: "none"}}> SizeMeUp </Button> */}
              </div>
          </div> 

           <div style = {{fontSize: "20px",fontFamily: "monospace", textDecoration: "underline"}}>
           Size Guide:
           </div>

           {listingData.sizingGuide && (
            <SizingGuideTable inputMeasurements = {listingData.sizingGuide} selectedSizes = {listingData.sizesAvailable} dimensions = {listingData.sizingGuide.map((element) => element.name)} />
           )}
          </div> 
        </div>

        <div style = {{fontWeight: "bold",font: "monospace", fontSize: "22px", marginLeft: "5%"}}>
          Already Purchased & Received Item? 
          <AddReviewDrawer myListing = {myListing} callback = {fetchListing} listingRef = {listingID}/>
          <div> 
            Reviews
          </div>
        </div>

        <div> 
          {listingMessages.length > 0 && (
            <div style = {{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>{listingMessages.map((indivMessageRef) => {
              return (<ListingMessage myListing = {myListing} listingRef = {listingRef} messageInstance = {indivMessageRef} listingID = {listingID}/>)
            })}
            </div>
          )}
        </div>

        </div>
      )}

      {!listingData &&(
        <div style = {{fontSize: "20px", textAlign: "center"}}> 
        <StyledLockIcon />
        Sign In To Unlock Feature
        </div>
      )}
    </ScrollableCardContainer>
  );
}

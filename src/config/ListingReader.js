// this component reads individuial listings from the DB
// this component aims to return everything that needs to be displayed within an individual listing

import { useEffect, useState } from 'react';
import { auth, db } from './firebase.js';
import { collection, query, where, getDoc, doc, getDocs, updateDoc, arrayUnion} from '@firebase/firestore';
import ImageHandler from './ImageHandler.js';
import "../stylesheets/Listing.css";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded';
import SizingGuideTable from '../components/mini_components/SizingGuideTable.js';
import CartTransitionModal from '../components/mini_components/CartTransitionModal.js';

// things learnt we cannot retrieve the data before rendering the component in case if it is null 
// create a transition modal that would allow the user to add to cart? 
// alternative is to create  an add button thtat would allow us to increment the quantity but when it is 0 we disable the button
export default function ListingReader({ listingID }) {
  const [listingData, setListingData] = useState(null);

  const LargeAccountCircleSharpIcon = styled(AccountCircleSharpIcon)`
  font-size: 60px;`;

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        const listingRef = doc(db, 'listing', listingID);
        const listingSnapshot = await getDoc(listingRef);
        if (listingSnapshot.exists()) {
          const data = listingSnapshot.data();
          setListingData({...data, uid: listingSnapshot.id});
        } else {
          // listing does not exist
          console.log('listing does not exist');
        }
      } catch (error) {
        console.log('Error fetching listing:', error);
      }
    };

    fetchlisting();
  }, [listingID]);


  const userID = auth.currentUser.uid;

  // const addToCartHandler = async (userID, Item) => {
  //   try {

  //     const q = query(collection(db, "users"), where("uid", "==", userID));

  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       const documentRef =  doc.ref;
  //       updateDoc(documentRef, {
  //         cart: arrayUnion(Item)
  //       })

  //     });

  //   }  catch (error) {
  //     console.log(error)
  //   }
  // }

  // Render your component using the fetched listingData
  return (
    <div>
      {listingData && (
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
              <CartTransitionModal uid = {userID} listingRef = {doc(collection(db, "listing"), listingID)}/>
            </div>

          <div style = {{fontFamily: 'monospace', fontSize: "20px", display: "flex"}}>
              <div style={{flex: 4}}>
              Unsure Of Your Sizing?
              </div>

              <div style={{flex: 6}}>
              <Button variant = "outlined" size = "medium" startIcon = {<CheckroomRoundedIcon />} sx = {{borderColor: "black", backgroundColor: 'white', color: "black", textTransform: "none"}}> SizeMeUp </Button>
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
      )}
    </div>
  );
}

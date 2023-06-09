// this component reads individuial listings from the DB
// this component aims to return everything that needs to be displayed within an individual listing

import { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { doc, getDoc } from '@firebase/firestore';
import ImageHandler from './ImageHandler.js';
import "../stylesheets/Listing.css";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { styled } from '@mui/system';


export default function ListingReader({ listingID }) {
  const [listingData, setListingData] = useState(null);

  const LargeAccountCircleSharpIcon = styled(AccountCircleSharpIcon)`
  font-size: 60px;
`;

  // // iterate through sizes
  // const iterateSizes = (listingArr) => {
  //   listingArr.forEach(x => <SizeBox />)
  // }

  // want this side-effect to render whenever the listingID changes
  // listingData returns the individual listing from the database

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        const listingRef = doc(db, 'listing', listingID);
        const listingSnapshot = await getDoc(listingRef);

        if (listingSnapshot.exists()) {
          const data = listingSnapshot.data();
          setListingData(data);
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

              <div style= {{flex: "8", fontSize: "15px", fontFamily: "monospace"}}>
                Listed By: 
                <div style = {{fontSize: "18px"}}> 
                  {listingData.listedBy}
                </div>
              </div>
            </div>

            Unsure Of Your Sizing?
           
          </div> 
        </div>
      )}
    </div>
  );
}

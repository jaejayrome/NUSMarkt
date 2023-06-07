// this component reads individuial listings from the DB
// this component aims to return everything that needs to be displayed within an individual listing

import { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { doc, getDoc } from '@firebase/firestore';
import ImageHandler from './ImageHandler.js';
import "../stylesheets/Listing.css";


export default function ListingReader({ listingID }) {
  const [listingData, setListingData] = useState(null);

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
            <div style = {{fontFamily: "serif", fontStyle: "italic", fontWeight: "bolder", fontSize: "40px", marginBottom: "15px"}}> 
              {listingData.listingTitle}
            </div>
            <div style = {{fontFamily: "monospace", fontSize: "25px", marginBottom: "15px"}}>
            {listingData.listingPrice}
            </div>
            <div style = {{fontFamily: "monospace", fontSize: "20px"}}> 
              {listingData.productDescription != null ? listingData.productDescription : "NA"}
            </div>
           
          </div> 
        </div>
      )}
    </div>
  );
}

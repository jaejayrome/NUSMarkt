// this component reads individuial listings from the DB
// this component aims to return everything that needs to be displayed within an individual listing

import { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { doc, getDoc } from '@firebase/firestore';
import ImageHandler from './ImageHandler.js';

export default function ListingReader({ listingID }) {
  const [listingData, setListingData] = useState(null);

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
        <div>
          <h2>{listingData.listingTitle}</h2>
          <h2>{listingData.listingPrice}</h2>
          <ImageHandler alt = {listingData.listingTitle} filePath= {listingData.filePath}/>

          <p> Product Description: </p>
          <p> Sizing: </p>
          <p> Size Guide Not Implemented: </p>

        </div>


      )}
    </div>
  );
}

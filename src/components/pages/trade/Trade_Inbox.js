import { useEffect, useState } from "react";
import Navbar from "../../compiledData/Navbar";
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import { query, where, collection, getDocs, getDoc, arrayRemove, deleteDoc, updateDoc } from "@firebase/firestore";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"

// trade inbox would also allow user to remove their trade request 
// removing trade listing should be done where trade listing

export default function Trade_Inbox() {
  const [reqPerListing, setReq] = useState([]);
  const [someoneWant, setSomeoneWant] = useState(false);
  const [sentTradeRequestArr, setSentTradeRequestArr] = useState([]);

  const userName = auth.currentUser.displayName;

  // create a new field in tradeRequest that would reference it back to the listing
  // need to include the trade requests thtat would display the telegram handle and the contact details to faciliate the trade 
  const deleteHandler = () => {
    const deleteRequest = async () => {
      // delete trade request in the tradeRequest
      const q = query(collection(db, "tradeRequest"), where("madeBy", "==", userName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (tradeRequest) => {
        // delete the trade request
        const allTradeList =  await getDocs(collection(db, "tradeListing"));

        // allTradeList.forEach((tradeListing) => {
        //   await updateDoc(tradeListing.ref, )
        // })

        // delete the trade request in the tradeListing 
        await deleteDoc(tradeRequest.ref)
      })
    }

    deleteRequest()
  }

  useEffect(() => {
    const getRequests = async () => {
      const q = query(collection(db, "tradeListing"), where("listedBy", "==", userName));
      const querySnapshot = await getDocs(q);

      const tradeListings = [];

      for (const tradeListing of querySnapshot.docs) {
        const tradeListingData = tradeListing.data();
        if (tradeListingData && tradeListingData.tradeRequestArr && tradeListingData.tradeRequestArr.length > 0) {
          const tradeRequests = [];
          for (const tradeRequestRef of tradeListingData.tradeRequestArr) {
            const tradeRequestSnapshot = await getDoc(tradeRequestRef);
            const tradeRequest = tradeRequestSnapshot.data();
            tradeRequests.push(tradeRequest);
          }
          tradeListings.push({
            tradeListingTitle: tradeListingData.listingTitle,
            tradeRequests: tradeRequests,
          });
        }
      }

      setReq(tradeListings);
      setSomeoneWant(tradeListings.length > 0);
    };

    const getSentRequests = async () => {
      const q = query(collection(db, "tradeRequest"), where("madeBy", "==", userName));
      const querySnapshot = await getDocs(q);
      const tradeRequestArr = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((tradeRequest) => {
          tradeRequestArr.push(tradeRequest.data());
        });
      }

      setSentTradeRequestArr(tradeRequestArr);
    };

    getRequests();
    getSentRequests();
  }, []);

  return (
    <div>
      <Navbar />

      <div style = {{flexDirection: "row", display: "flex"}}> 
      <div style={{ flex: 1, marginBottom: "4%", fontSize: "20px", border: "2px solid black" }}>Sent Requests:
      {sentTradeRequestArr.length === 0 ? (
        "You have not uploaded any trade listings"
      ) : (
        <div style={{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center"}}>
          {sentTradeRequestArr.map((tradeRequest) => (
            <div style = {{marginBottom: "5%"}}>
              Request Title: {tradeRequest.requestTitle}
              <div> 
              Sent By: you

              <IconButton onClick = {deleteHandler}>
               <DeleteIcon />
               </IconButton>


              </div> 
            </div>
          ))}
        </div>
      )}
      </div> 

  

      
      <div style={{flex: 1, marginTop: "4%", fontSize: "20px" }}>
        Received Requests:
        {someoneWant ? (
          <div>
            {reqPerListing.length > 0 ? (
              reqPerListing.map((listing) => (
                <div key={listing.tradeListingTitle}>
                  <div>Trade Listing Title: {listing.tradeListingTitle}</div>

                  {listing.tradeRequests && listing.tradeRequests.length > 0 ? (
                    listing.tradeRequests.map((tradeRequest) => (
                      <div key={tradeRequest.requestTitle}>
                        Received Request from: {tradeRequest.madeBy}
                        <div>Trade Request Title: {tradeRequest.requestTitle}</div>
                      </div>
                    ))
                  ) : (
                    <div>No trade requests for this listing</div>
                  )}
                </div>
              ))
            ) : (
              <div>No requests for any of your listings</div>
            )}
          </div>
        ) : (
          "You have not received any requests for any of your listings"
        )}
      </div>
      </div>
    </div>
  );
}

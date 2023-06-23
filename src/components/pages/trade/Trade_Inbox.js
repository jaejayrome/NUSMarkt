import { useEffect, useState } from "react";
import Navbar from "../../compiledData/Navbar";
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import { query, where, collection, getDocs, getDoc, arrayRemove, deleteDoc, updateDoc } from "@firebase/firestore";
import { CardActions, Button, Divider, Card, Typography, IconButton, Box, CardContent, ImageList, CardHeader} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import TradeRequestListingModal from "../../mini_components/TradeRequestListingDrawer.js";
import DeleteTLTransitionModal from "../../mini_components/DeleteTLTransitionModal";

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
        const tradeListingData = {...tradeListing.data(), ref: tradeListing.ref};
        if (tradeListingData && tradeListingData.tradeRequestArr && tradeListingData.tradeRequestArr.length > 0) {
          const tradeRequests = [];
          for (const tradeRequestRef of tradeListingData.tradeRequestArr) {
            const tradeRequestSnapshot = await getDoc(tradeRequestRef);
            const tradeRequest = tradeRequestSnapshot.data();
            tradeRequests.push(tradeRequest);
          }
          tradeListings.push({
            tradeListingTitle: tradeListingData.listingTitle,
            tradeListingRef : tradeListingData.ref,
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
      {/* <div style={{ flex: 1, marginBottom: "4%", fontSize: "20px", border: "2px solid black" }}>Sent Requests:
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
      </div>  */}

  

      
<div style={{ flex: 1, fontSize: "20px", textAlign: "center", maxHeight: "70vh", overflow: "auto"}}>
  <div style={{ fontWeight: "bolder", fontSize: "40px", marginBottom: "5%" }}>
    Received Requests:
    <div style={{ fontWeight: "normal", fontSize: "25px" }}>
      View individual trade requests for each of your trade listings
    </div>
  </div>
  {someoneWant ? (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {reqPerListing.length > 0 ? (
        reqPerListing.map((listing) => (
          <div key={listing.tradeListingTitle} style={{ width: "50%", margin: "2%" }}>
            <Card style={{ padding: "-2%" }} elevation="5">
              <CardHeader action={
          <DeleteTLTransitionModal tradeListing = {listing} /> 
        }>

              </CardHeader>

              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Requests Received ({listing.tradeRequests.length})
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant="h6" component="div">
                  {listing.tradeListingTitle}
                </Typography>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {listing.tradeRequests && listing.tradeRequests.length > 0 ? (
                    listing.tradeRequests.map((tradeRequest) => (
                      <Card elevation="10" sx={{ width: "80%", margin: "2%" }}>
                        <CardContent sx={{ fontSize: "15px" }}>
                          <div>Request #{listing.tradeRequests.indexOf(tradeRequest) + 1} - {tradeRequest.requestTitle}</div>
                          <div>From: {tradeRequest.madeBy}</div>
                        </CardContent>
                        <CardActions
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TradeRequestListingModal tradeRequest = {tradeRequest}/>
                        </CardActions>
                      </Card>
                    ))
                  ) : (
                    <div>No trade requests for this listing</div>
                  )}
                </div>
              </CardContent>
            </Card>
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

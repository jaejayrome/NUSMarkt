import { useEffect, useState } from "react";
import Navbar from "../../compiledData/Navbar";
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import { query, where, collection, getDocs, getDoc } from "@firebase/firestore";
import { Divider } from "@mui/material";


export default function Trade_Inbox() {
  const [reqPerListing, setReq] = useState([]);
  const [someoneWant, setSomeoneWant] = useState(false);
  const [sentTradeRequestArr, setSentTradeRequestArr] = useState([])

  const userID = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;

  useEffect(() => {
    const getRequests = async () => {
      const q = query(collection(db, "users"), where("uid", "==", userID));
      const querySnapshot = await getDocs(q);

      const tradeListingPromises = querySnapshot.docs.map(async (user) => {
        const tradeListingArr = user.data().Trade_ListingArr;
    

        const tradeListingRequests = await Promise.all(
          tradeListingArr.map(async (tradeListingRef) => {
            const tradeListingSnapshot = await getDoc(tradeListingRef);
            const tradeListing = tradeListingSnapshot.data();
            const tradeRequestArr = tradeListing.tradeRequestArr;

            const tradeRequests = await Promise.all(
              tradeRequestArr.map(async (tradeRequestRef) => {
                const tradeRequestSnapshot = await getDoc(tradeRequestRef);
                const tradeRequest = tradeRequestSnapshot.data();
                return tradeRequest;
              })
            );

            return {
              ...tradeListing,
              tradeRequests: tradeRequests,
            };
          })
        );

        return tradeListingRequests;
      });

      const tradeListings = await Promise.all(tradeListingPromises);
      const flattenedTradeListings = tradeListings.flat();

      setReq(flattenedTradeListings);
      setSomeoneWant(flattenedTradeListings.length > 0);
    };


    const getSentRequests = async () => {
        // complex because need to chekc through all the trade requests then 
        const q = query(collection(db, "tradeRequest"), where("madeBy", "==", userName));
        const querySnapshot = await getDocs(q);
        const tradeRequestArr = [];

        querySnapshot.forEach((tradeRequest) => {
            tradeRequestArr.push(tradeRequest.data());
        });

        setSentTradeRequestArr(tradeRequestArr);
    }

    getRequests();
    getSentRequests();
  }, []);

  return (
    <div>
      <Navbar />

      <div style = {{marginBottom: "4%", fontSize: "20px"}} >Sent Requests:</div>
      {sentTradeRequestArr.length ==  0 ? "You have not uploaded any trade listings" : (
        <div> 
            {sentTradeRequestArr.map((tradeRequest) => {
                return (<div> 
                {tradeRequest.requestTitle}
                {tradeRequest.madeBy}
                 </div> )
            })}
        </div>
      )}

      <Divider sx = {{border: "2px solid black"}}/>

      <div style = {{marginTop: "4%", fontSize: "20px"}}>
        Received Requests:
        {someoneWant ? (
          <div>
            {reqPerListing.map((listing) => (
              <div>
                <div>Trade Listing Title {listing.listingTitle}</div>
            
                  {listing.tradeRequests.map((tradeRequest) => (
                    <div>
                      Received Request from: {tradeRequest.madeBy} 
                      <div> 
                      Trade Request Title: {tradeRequest.requestTitle}
                      </div> 
                    </div>
                  ))}
            
              </div>
            ))}
          </div>
        ) : (
          "You have not received any requests for any of your listings"
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "../../compiledData/Navbar";
import { auth } from "../../../config/firebase";
import db from "../../../config/firebase";
import DeleteIcon from "@mui/icons-material/Delete"
import LockIcon from '@mui/icons-material/Lock';
import { query, where, collection, getDocs, getDoc, arrayRemove, deleteDoc, updateDoc } from "@firebase/firestore";
import { CardActions, Button, Divider, Card, Typography, IconButton, Box, CardContent, ImageList, CardHeader} from "@mui/material";
import DeleteTRTransitionModal from "../../mini_components/DeleteTRTransitionModal";

export default function Trade_Outgoing() {
    const [sentTradeRequestArr, setSentTradeRequestArr] = useState([]);

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

    const userName = auth.currentUser.displayName;
    useEffect(()=> {
        const getSentRequests = async () => {
            const q = query(collection(db, "tradeRequest"), where("madeBy", "==", userName));
            const querySnapshot = await getDocs(q);
            const tradeRequestArr = [];
      
            if (!querySnapshot.empty) {
              querySnapshot.forEach((tradeRequest) => {
                tradeRequestArr.push({...tradeRequest.data(), ref: tradeRequest.ref});
              });
            }
      
            setSentTradeRequestArr(tradeRequestArr);
          };

          getSentRequests()
  
    },[])


    return (
        <div> 
            <Navbar />

            <div style={{ flex: 1, fontSize: "20px", textAlign: "center"}}>
            <div style={{ fontWeight: "bolder", fontSize: "40px", marginBottom: "5%" }}>
                Outgoing Requests:
                <div style={{ fontWeight: "normal", fontSize: "25px" }}>
                view trade requests that you have sent
                </div>
            </div>
            </div>
            <div style={{ flex: 1, marginBottom: "4i%", fontSize: "20px",  maxHeight: "55vh", overflow: "auto"}}>
            {sentTradeRequestArr.length === 0 ? (
                <div style = {{fontSize: "20px", textAlign: "center"}}> 
                <StyledLockIcon />
                You have not sent any trade requests so far
                 </div>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {sentTradeRequestArr.map((tradeRequest) => (
                    <div key={tradeRequest.requestTitle} style={{ width: "50%", margin: "2%" }}>
                    <Card style={{ padding: "-2%", position:"relative" }} elevation="10">
                        <CardContent>
                        <Typography sx={{ fontWeight: "bold" }} variant="h6" component="div">
                            Request #{sentTradeRequestArr.indexOf(tradeRequest) + 1} {tradeRequest.requestTitle}
                        </Typography>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <DeleteTRTransitionModal refer = {tradeRequest.ref}/>
                           
                            <div> 
                                Request Description: {tradeRequest.requestDescription}
                            </div>

                            <div> 
                                Offered Size : {tradeRequest.offeredSize}
                            </div>

                            <div>Sent By: {tradeRequest.madeBy}
                            </div>

                           
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                ))}
                </div>
  )}
</div>

        </div>
    )
}
import { collection, doc } from "@firebase/firestore";
import Navbar from "../../compiledData/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../../config/firebase.js"
import { getDoc } from "@firebase/firestore";
import { useState } from "react";
import { Button, LinearProgress } from "@mui/material";
import HandshakeIcon from '@mui/icons-material/Handshake';

// this component would be the individual preorder listings 
// showcase the metadata of the individual preorder listings 
export default function Buy_Preorder_Indiv() {

    const {listingID} = useParams()

    const [pledged, setPledge] = useState(false)

    const [listing, setListing] = useState(null)

    const [progress, setProgress] = useState(0)

    const [pledgeTarget, setPledgeTarget] = useState(0)

    useEffect(() => {
        const getListing = async () => {

          const documentRef = doc(collection(db, "preOrders"), listingID)
          const response = await getDoc(documentRef);
          if (response.exists()) {
            setListing({...response.data()})
            setProgress(response.data().pledgeCounter)
            setPledgeTarget(response.data().pledgeTarget)
          }
        }
        getListing()
    }, []);

    const addPledge = () => {
        setPledge((prevState) => !prevState);
        setProgress((prevProgress) => (pledged ? prevProgress - 1 : prevProgress + 1));
    }

    const progressPercentage = ((progress / pledgeTarget) * 100).toFixed(2);
      
    return (
        <div> 
        <Navbar/>

        <div style = {{display: "flex", flexDirection: 'row'}}> 

        <div style={{flex: 1, marginLeft: '5%'}}> 
        {listing && listing.json64 && <img height = "600px" width = "600px" src={`data:image/jpeg;base64, ${listing.json64}`}  alt = "not found"/>} 
        </div>

        <div style={{flex: 1}}>

        <div style = {{fontWeight: 'bold', fontSize: "40px", fontFamily: 'monospace'}}> 
        {listing && listing.listingTitle}
        </div> 

        <div style = {{fontSize: "20px", fontFamily: 'monospace'}}> 
        {listing && listing.listedBy}
        </div>

        {/* <div style={{fontFamily: 'monospace'}}>
        {listing && listing.listingDescription}
        </div> */}

        <div> 
        Current Pledges: {progress} / Pledge Target: {pledgeTarget}
        </div>

        {/* <div> 
        {listing && listing.listingPrice}
        </div> */}

        {/* Add in logic that when the number of pledges >= pledge target progress bar turns to green */}
        <LinearProgress variant="determinate" value={progressPercentage} sx = {{width: "80%"}}/>

        

        <div> 
        Milestone Completed: {progressPercentage}%
        </div>

        <div> 
            <Button startIcon = {<HandshakeIcon/>} onClick = {addPledge} variant = "outlined" sx = {{textTransform: "none" , borderColor: "black", color: "black"}}> Pledge </Button>
        </div>


        </div>


        </div>
        </div>
    )
}
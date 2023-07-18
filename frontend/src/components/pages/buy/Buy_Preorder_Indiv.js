import { collection, doc, documentId, updateDoc } from "@firebase/firestore";
import Navbar from "../../compiledData/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../../config/firebase.js"
import { getDoc } from "@firebase/firestore";
import { useState } from "react";
import { Button, LinearProgress } from "@mui/material";
import HandshakeIcon from '@mui/icons-material/Handshake';
import { toast } from "react-toastify";

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

    // using local storage would prevent the user to refrehs the pledge button after he has done it 
    useEffect(() => {
        const storedPledge = localStorage.getItem("pledged");
        if (storedPledge) {
          setPledge(JSON.parse(storedPledge));
        }
      }, []);

    const addPledge = async () => {
        try {
        setPledge(true);
        localStorage.setItem("pledged", JSON.stringify(true));
        setProgress((prevProgress) => (pledged ? prevProgress - 1 : prevProgress + 1));
        // set the pledge to 1 
        const documentRef = doc(db, `/preOrders/${listingID}`)
        const actualDoc = await getDoc(documentRef)
        await updateDoc(documentRef, {pledgeCounter: actualDoc.data().pledgeCounter + 1})
        toast.success("You have successfully pledged for this current listing!")

        } catch (error) {
            console.log(error)
        }
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


        <div style={{fontSize: "20px", marginTop: "5%"}}>
        <div> 
        Price: ${listing && listing.listingPrice}
        </div>

        <div> 
        Description: {listing && listing.listingDescription}
        </div>
        </div>


        <div style={{marginTop: "5%", marginBottom: "1%"}}> 


        <div style={{fontSize: "50px"}}> 
        {progress} <span style={{fontSize: "20px"}}> pledges </span>
        </div>
        out of 
        </div>

        <div style={{fontSize: "50px"}}> 
        {pledgeTarget} <span style={{fontSize: "20px"}}> pledge target </span>
        
        </div>
        which means
        <div style={{fontSize: "50px", marginBottom: "5%"}}> 
        {pledgeTarget - progress} <span style={{fontSize: "20px"}}> pledges to go </span>
        </div>

        {/* <div> 
        {listing && listing.listingPrice}
        </div> */}

        {/* Add in logic that when the number of pledges >= pledge target progress bar turns to green */}
        <LinearProgress variant="determinate" value={progressPercentage} sx = {{width: "80%"}}/>

        

        <div> 
        Milestone Progress: {progressPercentage}%
        </div>

        <div style={{marginTop: '5%'}}> 
            <Button disabled = {pledged} startIcon = {<HandshakeIcon/>} onClick = {addPledge} variant = "outlined" sx = {{textTransform: "none" , borderColor: "black", color: "black"}}> Pledge </Button>
        </div>


        </div>


        </div>
        </div>
    )
}
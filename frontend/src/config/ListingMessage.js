import { getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { Box, Card, Avatar, CardContent, CardHeader, CardActions, Button} from "@mui/material"
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DeleteReviewTransitionModal from "../components/mini_components/DeleteReviewTransitionModal";
import Replies from "../components/mini_components/Replies";
import AddReplyDrawer from "../components/mini_components/AddReplyDrawer";

export default function ListingMessage(props) {
    const [message, setMessage] = useState(null)
    const messageRef = props.messageInstance
    const [showDropdown, setDropdown] = useState(false)

    const buttonHandler = () => {
      setDropdown(prevState => !prevState)
    }
    
    useEffect(() => {
        const openMessage = async () => {
          try {
            const messageMaybe = await getDoc(messageRef);
            setMessage({ ...messageMaybe.data()});
          } catch (error) {
            console.log(error);
          }
        };
        openMessage();
      
      
      
      }, [message, messageRef]);
      

    return (
        <Card sx = {{width: "50%", marginBottom: "2%"}} elevation={5}>
            {message &&( 
         <div>
            <CardHeader 
            avatar={
                <Avatar sx={{bgcolor: "black" }} aria-label="recipe">
                </Avatar>}
                 title = {message.listedBy}
                 subheader = "commented"
            action={
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <DeleteReviewTransitionModal id = {props.listingID} ownerUID = {message.messageOwnerUID} listingRef = {props.listingRef} messageRef = {messageRef} onDelete = {props.onDelete}itemRef = {props.itemRef}/> 
            <AddReplyDrawer myListing = {props.myListing} id = {props.listingID} messageRef = {messageRef} message = {message}/>
            </div>
            }
            /> 
           <CardContent>

            {message.content}
        <CardActions disableSpacing> 
            {message.reviewStatus == 'POSITIVE' ? <SentimentVerySatisfiedIcon /> :
              message.reviewStatus == 'NEGATIVE' ? <SentimentVeryDissatisfiedIcon /> :
              <SentimentNeutralIcon />
            }
        </CardActions>
          
            </CardContent>
            </div>)
            }
             
             <div style = {{display:"flex", alignItems: "center", justifyContent: 'center', flexDirection: 'column'}}> 
             
             {message && message.replies_arr && <Replies message = {message}> </Replies>}
            {/* {showDropdown && message &&   <Replies message = {message}> </Replies>} */}
            </div>
        </Card>
    )
}
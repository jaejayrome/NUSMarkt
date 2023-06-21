import { getDoc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { Box, Card, Avatar, CardContent, CardHeader, CardActions} from "@mui/material"
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteReviewTransitionModal from "../components/mini_components/DeleteReviewTransitionModal";

export default function ListingMessage(props) {
    const [message, setMessage] = useState(null)
    const messageRef = props.messageInstance
    
    useEffect(() => {
        const openMessage = async () => {
          try {
            const messageMaybe = await getDoc(messageRef);
            setMessage({ ...messageMaybe.data() });
          } catch (error) {
            console.log(error);
          }
        };
        openMessage();
      
      
      
      }, [message, messageRef]);
      

    return (
        <Card>
            {message &&( 
         <div>
            <CardHeader 
            avatar={
                <Avatar sx={{bgcolor: "black" }} aria-label="recipe">
                </Avatar>}
                 title = {message.listedBy}
                 subheader = "commented"
            action={
            <DeleteReviewTransitionModal listingRef = {props.listingRef} messageRef = {messageRef} onDelete = {props.onDelete}itemRef = {props.itemRef}/> 
            }
            /> 
           <CardContent>

            {message.content}
        <CardActions disableSpacing> 
            {message.reviewStatus == 'POSITIVE' ? <ThumbUpOffAltIcon /> :<ThumbDownOffAltIcon />}
        </CardActions>
          
            </CardContent>
            </div>)
            }
        </Card>
    )
}
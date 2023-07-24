import { useEffect, useState } from "react";
import db from "../../config/firebase.js"
import { auth } from "../../config/firebase.js";
import { IconButton, Divider, Drawer, Button, Avatar} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';


export default function Replies(props) {

    const message = props.message
    const replies = message.replies_arr
    const [isOpen, setIsOpen] = useState(false);

    useEffect(
        () => {
        const retrieveReplies = async () => {

        }

        retrieveReplies()}
    , [])


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div> 

    <Button sx = {{color: 'black'}} onClick = {toggleDrawer}> View Replies </Button>
        
           
        <Drawer PaperProps={{
            sx: { width: "45%", borderRadius: "25px"},
            }}
            anchor="right" open={isOpen} onClose={toggleDrawer}>

            <div style = {{flexDirection: 'column', display: 'flex'}}> 

            <div style = {{display: "flex", justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: "30px", marginTop: "5%"}}>
            Conversation
            </div>

            <div> 
                <div style = {{display: "flex", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', paddingLeft:"10%", marginTop:"5%"}}> 
                    <Avatar sx={{bgcolor: "black" }} aria-label="recipe">
                    </Avatar>
                    <div style={{display: "flex", flexDirection: 'column', marginLeft: '2%'}}> 
                        {message.listedBy} 
                        <div> commented </div>
                    </div>
                </div>

                <div style={{ marginTop:"4%", marginLeft: "16%", display: 'inline-block',fontSize: "22px", border: "1px solid black", borderRadius: "16px", padding: "1rem", wordWrap: "break-word", overflowWrap: "break-word", minWidth: "30%",maxHeight: "30%", maxWidth: "40%" }}>
                {message.content}
                </div>
            </div>
            {replies && replies.length > 0 ?  <div style = {{overflow: "auto", maxHeight: '500px'}}> 
            {message.replies_arr.map((reply) => {
                return (
                    <div style = {{display: "flex", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: "3%"}}> 
                        <div style = {{display: "flex", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight:"10%"}}> 
                            <Avatar sx={{bgcolor: "blue" }} aria-label="recipe">
                            </Avatar>
                            <div style={{display: "flex", flexDirection: 'column', marginLeft: '10%'}}> 
                                {reply.listedBy}
                                <div> replied </div>
                            </div>


                            
                        </div>

                        <div style={{ marginTop:"4%", marginRight: "10%", display: 'inline-block',fontSize: "22px", border: "1px solid black", borderRadius: "16px", padding: "1rem", wordWrap: "break-word", overflowWrap: "break-word", minWidth: "30%",maxHeight: "30%", maxWidth: "40%" }}>
                            {reply.content}
                        </div>

                        
                    </div>
                )
            })}
            </div>
            : 
            <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%', fontSize: "20px"}}> 
            {/* <Divider sx = {{border: '1px solid black'}}> </Divider> */}
            There are no replies to this review so far </div>}
           
           </div>


        </Drawer>
        </div>
    )
}


import DeleteIcon from "@mui/icons-material/Delete"
import {Button, Modal, Box, Backdrop, Fade, IconButton, Typography, Select, FormControl, MenuItem} from '@mui/material'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { query, where, collection, getDocs, getDoc, arrayRemove, deleteDoc, updateDoc } from "@firebase/firestore";
import db from "../../config/firebase.js";
// import { auth } from "../../config/firebase.js";


export default function DeleteTRTransitionModal(props) {

    const deleteHandler = async  () => {
        //deleting the actual request

        try{
        await deleteDoc(props.refer)
        // loop through all the listings
        const listings = await getDocs(collection(db, "tradeListing"))
        listings.forEach(async (listing) => {
            const tradeReqArr = listing.data().tradeRequestArr;
      
            // Filter out the specific trade request reference
            const updatedTradeReqArr = tradeReqArr.filter((tradeReqRef) => {
              // Compare the trade request references for equality
              return tradeReqRef.path !== props.refer.path;
            });
      
            // Update the trade listing with the modified tradeRequestArr
            await updateDoc(listing.ref, { tradeRequestArr: updatedTradeReqArr });
          });
        } catch(error) {
            console.log(error)
        }
           
    }


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <div style={{ position: "absolute", top: 0, right: 0 }}> 
             <IconButton onClick={handleOpen}>
                            <DeleteIcon />
            </IconButton>

            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                        timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <Typography sx = {{fontWeight: 'bold'}}id="transition-modal-title" variant="h6" component="h2">
                        Delete Trade Request
                        </Typography>

                        <div style = {{}}> 
                        <Typography id="transition-modal-description" sx={{flex: 1, mt: 2 }}>
                        Ensure that you have made a decision on whether to trade with the user before deleting
                        </Typography>

                        <Typography sx={{ flex: 1, mt: 2 }}>
                        </Typography>
                        </div>

                        <div style={{display: "flex", alignItems: "center", justifyContent:"center", marginTop: "5%"}}>
                        <Button sx = {{mr: "2%"}}variant = "outlined" onClick = {handleClose}> Cancel </Button>

                        <Link to = "/TRADE/INTERMEDIATE" onClick = {deleteHandler}>
                            <Button variant = "outlined"sx = {{font: "black"}}> Confirm Delete </Button>
                        </Link>
                        </div>
                    </Box>
                    </Fade>
                </Modal>
        </div>
    )
}
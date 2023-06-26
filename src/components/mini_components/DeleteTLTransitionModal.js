import {Button, Modal, Box, Backdrop, Fade, IconButton, Typography, Select, FormControl, MenuItem} from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteDoc, arrayRemove, collection, getDoc,doc, deleteField, updateDoc, getDocs, query, where } from "@firebase/firestore";
import db from "../../config/firebase.js";
import { auth } from '../../config/firebase.js';
import {toast} from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteTLTransitionModal(props) {


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


      const deleteHandler = async () => {
        try {
          console.log("hello world");
    
          const tradeListingRef = props.tradeListing.tradeListingRef
          const toDeleteArr = props.tradeListing.tradeRequests
          
          // deleeting the actual listings
          await deleteDoc(tradeListingRef)
      
          // delete the actual trade listing
          const allTradeRequest = await getDocs(collection(db, "tradeRequest"));
          allTradeRequest.forEach(async (tr) => {
            toDeleteArr.forEach(async (trL) => {
                if (trL.path === tr.path) {
                    await deleteDoc(tr.ref)
                }
            })
          });
      
          console.log("success");
        } catch (error) {
          console.log(error);
        }
      };
      
      
      

    return (
        <div>
            <IconButton onClick = {handleOpen} sx = {{position: "relative", right: "-45%", borderColor: 'black', color: 'black'}} >
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
                        Delete Trade Listing
                        </Typography>

                        <div style = {{}}> 
                        <Typography id="transition-modal-description" sx={{flex: 1, mt: 2 }}>
                        This processs cannot be reverted once it is confirmed. 
                        </Typography>

                        <Typography sx={{ flex: 1, mt: 2 }}>
                        </Typography>
                        </div>

                        <div style={{display: "flex", alignItems: "center", justifyContent:"center", marginTop: "5%"}}>
                        <Button sx = {{color: "black", borderColor: "black", mr: "2%"}}variant = "outlined" onClick = {handleClose}> Cancel </Button>

                        <Link to = "/TRADE/INTERMEDIATE" onClick = {deleteHandler}>
                            <Button variant = "outlined"sx = {{color: "black", borderColor: "black"}}> Confirm Delete </Button>
                        </Link>
                        </div>
                    </Box>
                    </Fade>
                </Modal>
        </div> 
    )
} 
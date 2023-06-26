import {Button, Modal, Box, Backdrop, Fade, IconButton, Typography, Select, FormControl, MenuItem} from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteDoc, arrayRemove, collection, getDoc,doc, deleteField, updateDoc, getDocs, query, where } from "@firebase/firestore";
import db from "../../config/firebase.js";
import { auth } from '../../config/firebase.js';
import {toast} from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTLTransitionModal from './DeleteTLTransitionModal.js';

export default function DeleteTransitionModal(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const userID = auth.currentUser.uid;

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

      const deleteHandler =  () => {
        const toDelete = async () => {
        try {
         
          

         // delete the actual listing
         deleteDoc(props.itemRef)

          // deleting the refernce in all potential sellers 
         const allUsers = await getDocs(collection(db, "users"))
          allUsers.forEach(async (user) => {
            const cart = user.data().cart;
            const updatedCart = cart.filter((item) => item.listingRef.path !== props.itemRef.path);
            await updateDoc(user.ref, { cart: updatedCart });
          })

         // delete the refernce of the seller
         const q = query(collection(db, "users"), where("uid", "==", userID));
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach(async (user) => {
         await updateDoc(user.ref, {Sell_ListingArr: arrayRemove(props.itemRef)})
        
         props.onDelete();
         toast("successfully deleted")
         })
         
         } catch(error) {
           console.log(error)
         }
       }
       toDelete()
     }

    return (
        <div>



<IconButton onClick = {handleOpen} sx = {{borderColor: 'black', color: 'black'}} >
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Are You Sure?
            </Typography>

            <div style = {{display: "flex", flexDirection:"row"}}> 
            <Typography id="transition-modal-description" sx={{flex: 1, mt: 2 }}>
            Confirm Now:
            </Typography>

            <Typography sx={{ flex: 1, mt: 2 }}>
            
            </Typography>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent:"center", marginTop: "5%"}}>
            <Button sx = {{mr: "2%"}}variant = "outlined" onClick = {handleClose}> Cancel </Button>

            <Link to = "/SELL" onClick = {deleteHandler}>
                <Button variant = "outlined"sx = {{font: "black"}}> Confirm Delete </Button>
            </Link>
            </div>
          </Box>
        </Fade>
      </Modal>
        </div> 
    )
}
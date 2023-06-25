import { Button, Modal, Box, Backdrop, Fade, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocs, query, where, collection, updateDoc, arrayRemove, deleteDoc } from "@firebase/firestore";
import db, { auth } from "../../config/firebase.js";
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TradeRequestListingModal(props) {
  const [teleHandle, setTeleHandle] = useState("");
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
    bgcolor: 'white',
    color: 'black',
    border: '2px solid black',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getUserTele = async () => {
      try {
        const q = query(collection(db, "users"), where("userName", "==", props?.tradeRequest.madeBy));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((user) => {
          setTeleHandle(user.data().telegramHandle);
        });
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    };

    getUserTele();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>View Request</Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2" >
              Request Title: {props.tradeRequest?.requestTitle}
            </Typography>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography id="transition-modal-description" sx={{ flex: 1, mt: 2 }}>
                made by: {props.tradeRequest?.madeBy}
              </Typography>
            </div>

            <div>
              <Typography sx={{ flex: 1, mt: 2 }} color="black">
                Request Description: {props.tradeRequest?.requestDescription}
                
              </Typography>

              <div> 
              Telegram Handle: {teleHandle}
              </div>
            </div>

            {/* <div style={{fontSize: "10px", textAlign: 'center'}}> 
            Click Anywhere to Cancel 
            </div> */}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5%" }}>
              <Button sx={{ mr: "2%" }} variant="outlined" onClick={handleClose} >
                Cancel
              </Button>

              {/* <Link to = "/SELL" >
                <Button variant = "outlined"sx = {{font: "black"}}> A </Button>
              </Link> */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

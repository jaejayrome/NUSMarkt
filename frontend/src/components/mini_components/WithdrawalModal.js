
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {Button, Modal, Box, Backdrop, Fade, IconButton, Typography, Select, FormControl, MenuItem, TextField} from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteDoc, arrayRemove, collection, getDoc,doc, deleteField, updateDoc, getDocs, query, where, addDoc } from "@firebase/firestore";
import db from "../../config/firebase.js";
import { auth } from '../../config/firebase.js';
import {toast} from 'react-toastify'
import { useEffect } from 'react';
import {InputAdornment, InputLabel, OutlinedInput} from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function WithdrawalModal(props) {

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [price, setPrice] = useState(0.00)

const navigate = useNavigate()



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    alignItems: 'center', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center'
  };

  const deleteHandler = async () => {

    try {

        if (props.bank && props.bankAccountNumber && props.userName) {
            
        const toSend = {
            amount: price,
            bank: props.bank, 
            bankAccountNumber: props.bankAccountNumber,
            userName: props.userName, 
            completed: false
        }

        const collectionRef = collection(db, "withdrawalRequests")
        await addDoc(collectionRef, toSend)

        const q = query(collection(db, "users"), where("uid", "==", props.uuid))
        const snapshot = await getDocs(q)
        if (snapshot) {
            snapshot.forEach((user) => {
                updateDoc(user.ref, {withdrawAmount: props.withdrawAmount - price})
            })
        }

        toast.success("You have submitted a withdrawal request!")
        
        }

    } catch (error) {
        console.log(error)
    }

  }

  const priceHandler = (event) => {
    setPrice(event.target.value)
    console.log('ajhjaa')
  } 


return (
    <div> 
        <Button disabled = {props.withdrawAmount == 0} onClick={handleOpen} startIcon = {<RequestQuoteIcon />} variant="outlined" sx = {{color: 'black', borderColor: 'black', backgroundColor: 'white', textTransform: 'none'}}> Withdraw Amount </Button>

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
                Enter Withdrawal Amount
                </Typography>

                <div style = {{display: "flex", flexDirection:"row"}}> 
                <Typography id="transition-modal-description" sx={{flex: 1, mt: 2 }}>
                Available Amount: ${props.withdrawAmount}
                </Typography>

                </div>

                <div> 
                
                <InputLabel htmlFor = "pricing" sx = {{marginTop:"5%"}}> </InputLabel>
                <OutlinedInput  type= "number" onChange = {priceHandler} startAdornment = {<InputAdornment position="start"> $</InputAdornment>} sx = {{width:  '80%' }} id = "pricing" multiline = {false}> 
                </OutlinedInput>
                </div>

                <div style={{display: "flex", alignItems: "center", justifyContent:"center", marginTop: "5%"}}>
                <Button sx = {{mr: "2%"}} color = "error"variant = "outlined" onClick = {handleClose}> Cancel </Button>

                <Link to = "/SELL">
                    <Button  onClick = {deleteHandler} color = "success" variant = "outlined"sx = {{font: "black"}}> Confirm </Button>
                </Link>
                </div>
            </Box>
            </Fade>
        </Modal>
    </div>
)

}
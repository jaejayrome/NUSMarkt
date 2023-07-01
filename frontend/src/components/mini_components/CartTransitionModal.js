import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, arrayUnion} from '@firebase/firestore';
import db from "../../config/firebase.js"
import {Select, MenuItem, FormControl} from "@mui/material"
import {toast} from 'react-toastify';

export default function CartTransitionModal(props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("M")

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

  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value)
  }


  const addToCartHandler = async (userID, listingRef) => {
    try {

      const q = query(collection(db, "users"), where("uid", "==", userID));

      const item = {
        quantity: count, 
        listingRef: listingRef, 
        size: size
      }

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const documentRef =  doc.ref;
        updateDoc(documentRef, {
          cart: arrayUnion(item)
        })

      });

      toast(`You have successfully added the item to cart!`)

    }  catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
   <Button onClick = {handleOpen} startIcon = {<AddShoppingCartSharpIcon/>} sx = {{borderColor: 'black', color: 'black'}} variant = 'outlined'> Add To Cart </Button>
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
            Select Your Quantity & Size
            </Typography>

            <div style = {{display: "flex", flexDirection:"row"}}> 
            <Typography id="transition-modal-description" sx={{flex: 1, mt: 2 }}>
            Current Quantity: {count}
            </Typography>

            <Typography sx={{ flex: 1, mt: 2 }}>
            Current Size: {size}
            </Typography>
            </div>

            <div style = {{display: "flex", flexDirection:"row"}}> 
            <FormControl sx={{ mt: 2 }}>
            <Select
                labelId="quantity-label"
                id="quantity-select"
                value={count}
                onChange={handleCountChange}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
            </Select>
            </FormControl>


            <FormControl sx={{marginLeft: "40%", mt: 2 }}>
            <Select
                labelId="quantity-label"
                id="quantity-select"
                value={size}
                onChange={handleSizeChange}
            >
              {props.selectedSizes.map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}

                
                {/* <MenuItem value={"XS"}>XS</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
                <MenuItem value={"XXL"}>XXL</MenuItem> */}
            </Select>
            </FormControl>

            </div>


            <div style={{display: "flex", alignItems: "center", justifyContent:"center", marginTop: "5%"}}>
            <Button sx = {{mr: "2%"}}variant = "outlined" onClick = {handleClose}> Cancel </Button>

            <Link to = "/BUY/CART" onClick = {() => addToCartHandler(props.uid, props.listingRef)}>
                <Button variant = "outlined"sx = {{font: "black"}} startIcon = {<AddShoppingCartSharpIcon/>} > Add To Cart </Button>
            </Link>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
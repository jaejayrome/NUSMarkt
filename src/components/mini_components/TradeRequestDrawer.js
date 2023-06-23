import { useState } from 'react';
import { Drawer, Button, TextField, InputLabel } from '@mui/material';
import {Divider} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { auth } from '../../config/firebase';
import db from '../../config/firebase';
import {addDoc, arrayUnion, collection, updateDoc} from "@firebase/firestore"
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

export default function TradeRequestDrawer(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M")
  const [title, setTitle] = useState("")
  const [requestDescription, setRequestDescription] = useState("")

  const navigate = useNavigate()

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const clickHandler = (event) => {
    setSelectedSize(event.target.value)
  }

  const titleHandler = (event) => {
    setTitle(event.target.value)
  }

  const requestDescriptionHandler = (event) => {
    setRequestDescription(event.target.value)
  }

  const newRequest = {
    requestTitle: title, 
    requestDescription: requestDescription, 
    offeredSize: selectedSize
  }


  const submitHandler = () => {
    const addRequest = async () => {
      try {
      const collectionRef = collection(db, "tradeRequest")
      const tradeRequestDocument = await addDoc(collectionRef, {...newRequest, madeBy: auth.currentUser.displayName})
    
      await updateDoc(props.originalListingReference, {tradeRequestArr: arrayUnion(tradeRequestDocument)})

      toast("You have successfully sent a trade request!")

      navigate("/TRADE/OUTGOING")
      } catch(error) {
        console.log(error)
      }
    }

    addRequest()
  }

  return (
    <div>
      {props.disabled ? <Button disabled sx = {{right: "-85%", color: "black", borderColor: "black"}}onClick={toggleDrawer}> Send Trade Request </Button>: <Button sx = {{right: "-85%", color: "black", borderColor: "black"}}onClick={toggleDrawer}> Send Trade Request </Button>}
      <Drawer PaperProps={{
            sx: { width: "45%" },
          }}
      anchor="left" open={isOpen} onClose={toggleDrawer}
      >

      <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", fontFamily: "monospace",fontWeight: "bold",marginBottom: "3%", fontSize: "30px"}}> 
        Add Trade Request
      </div>

      <Divider />

      <div style = {{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}> 
      <InputLabel htmlFor = "title"> Trade Request Title</InputLabel>
      <TextField onChange = {titleHandler} id = "title"/>

      <InputLabel htmlFor = "title"> Trade Request Description</InputLabel>
      <TextField onChange = {requestDescriptionHandler}  id = "title"/>

      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">What size are you offering?</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue= "M"
        onChange= {clickHandler}
      >

        <FormControlLabel value="XXS" control={<Radio />} label="XXS" />
        <FormControlLabel value="XS" control={<Radio />} label="XS" />
        <FormControlLabel value="S" control={<Radio />} label="S" />
        <FormControlLabel value="M" control={<Radio />} label="M" />
        <FormControlLabel value="L" control={<Radio />} label="L" />
        <FormControlLabel value="XL" control={<Radio />} label="XL" />
        <FormControlLabel value="XXL" control={<Radio />} label="XXL" />
      </RadioGroup>
    </FormControl>

    <Button onClick = {submitHandler} sx = {{color: "black"}}> Submit Request </Button>
    </div>

   </Drawer>
    </div>
  );
}
